import { sendEmailVerificationOTP, sendTeacherApplicationConfirmation, sendTeacherApplicationNotification } from '@/lib/email';
import { emailHasAllowedDomain, isInstituteAccessEnabled } from '@/lib/instituteAccess';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN', 'CHARITY']),
  referralCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Registration request body:', body);
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Institute access enforcement (if enabled): only allow configured email domains
    if (isInstituteAccessEnabled()) {
      const isAdmin = validatedData.role === 'ADMIN';
      if (!isAdmin && !emailHasAllowedDomain(validatedData.email)) {
        return NextResponse.json(
          { error: 'Registration restricted: only approved institute email domains may register.' },
          { status: 403 }
        );
      }
    }

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

  // Hash password (current branch behavior)
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

    // Extract email domain and find matching institute
    const emailDomain = validatedData.email.split('@')[1]?.toLowerCase()
    let instituteId = null
    
    if (emailDomain) {
      const institute = await prisma.institute.findUnique({
        where: { domain: emailDomain, isActive: true },
      })
      if (institute) {
        instituteId = institute.id
        console.log(`✅ Auto-assigned to institute: ${institute.name}`)
      }
    }

    // Generate email verification OTP
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    // Create new user (without email verification initially)
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role as any,
        referralCode: newReferralCode,
        referredBy: referredBy,
        emailVerified: null, // Not verified initially
        approvalStatus: validatedData.role === "TEACHER" ? "pending" : "approved",
        instituteId: instituteId, // Auto-assign institute based on email domain
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        approvalStatus: true,
        createdAt: true,
        Institute: {
          select: {
            id: true,
            name: true,
            domain: true,
          },
        },
      },
    });

    // Create email verification record
    await prisma.emailVerification.create({
      data: {
        userId: newUser.id,
        email: newUser.email,
        otp: emailOtp,
        expiresAt: otpExpiresAt
      }
    })

    // Log OTP for development (remove in production)
    console.log(`📧 EMAIL VERIFICATION OTP for ${newUser.email}: ${emailOtp}`)

    // Send email verification OTP to all users and capture flag
    let emailSent = false
    try {
      await sendEmailVerificationOTP(newUser.email, newUser.name, emailOtp)
      emailSent = true
      console.log(`✅ Email verification OTP sent to: ${newUser.email}`)
    } catch (emailError) {
      console.error('❌ Failed to send email verification OTP:', emailError)
      // Don't fail the registration if email fails - just log it
    }

    // Send emails if user is a teacher
    if (newUser.role === 'TEACHER') {
      try {
        // Send confirmation email to teacher
        await sendTeacherApplicationConfirmation(newUser.email, newUser.name)
        
        // Send notification email to admin
        await sendTeacherApplicationNotification(newUser.email, newUser.name)
        
        console.log(`✅ Teacher application emails sent for: ${newUser.name}`)
      } catch (emailError) {
        console.error('❌ Failed to send teacher application emails:', emailError)
        // Don't fail the registration if emails fail - just log it
      }
    }

    // Return success with verification redirect and emailSent indicator
    return NextResponse.json(
      {
        message: 'User registered successfully. Please check your email for verification code.',
        user: newUser,
        redirectUrl: `/verify-email?userId=${newUser.id}&email=${encodeURIComponent(newUser.email)}`,
        emailSent,
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
