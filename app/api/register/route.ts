import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';

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

    // Check if user with same email exists
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

    // Handle referral code logic
    let referredBy = null;

    if (validatedData.referralCode && validatedData.referralCode.trim() !== '') {
      try {
        // Find user with the provided referral code
        const referrer = await prisma.user.findUnique({
          where: { referralCode: validatedData.referralCode.trim() },
        });

        if (referrer) {
          referredBy = referrer.id;
        }
        // If referral code is invalid, we just ignore it and continue with registration
      } catch (error) {
        console.log('Referral code lookup error:', error);
        // Continue with registration even if referral code lookup fails
      }
    }

    // Generate a unique referral code for the new user
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
        emailVerified: new Date(), // Mark as verified for NextAuth
        isApproved: validatedData.role === "STUDENT" || validatedData.role === "ADMIN", // Auto-approve students and admins
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        isApproved: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: newUser,
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
