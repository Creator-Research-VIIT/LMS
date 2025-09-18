import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEmailVerification, sendVerificationEmail } from '@/lib/email';

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']),
  referralCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Referral code logic
    let referredBy = null;
    if (validatedData.referralCode?.trim()) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: validatedData.referralCode.trim() },
      });
      if (referrer) referredBy = referrer.id;
    }

    const newReferralCode = randomUUID();

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        referralCode: newReferralCode,
        referredBy: referredBy,
        emailVerified: null, // User needs to verify email
        approvalStatus: validatedData.role === "TEACHER" ? "pending" : "approved"
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        approvalStatus: true,
        createdAt: true,
      },
    });

    // Send verification email
    try {
      const otp = await createEmailVerification(newUser.id, newUser.email);
      await sendVerificationEmail(newUser.email, otp);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email sending fails
    }

    // Return success with verification redirect
    return NextResponse.json(
      {
        message: 'User registered successfully. Please check your email for verification.',
        user: newUser,
        redirectUrl: `/verify-email?userId=${newUser.id}&email=${encodeURIComponent(newUser.email)}`,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
