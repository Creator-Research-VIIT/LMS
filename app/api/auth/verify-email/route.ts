import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const verifyEmailSchema = z.object({
  userId: z.string(),
  otp: z.string().length(6, 'OTP must be 6 digits')
})

const resendOtpSchema = z.object({
  userId: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, otp } = verifyEmailSchema.parse(body)

    // Find the user and their verification token
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { EmailVerification: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      )
    }

    const emailVerification = user.EmailVerification.find(v => !v.verified)
    if (!emailVerification) {
      return NextResponse.json(
        { error: 'No verification token found. Please request a new verification email.' },
        { status: 400 }
      )
    }

    // Check if token is expired (30 minutes)
    const tokenExpiry = new Date(emailVerification.expiresAt)
    if (tokenExpiry < new Date()) {
      // Delete expired token
      await prisma.emailVerification.delete({
        where: { id: emailVerification.id }
      })
      
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Verify the OTP
    if (emailVerification.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Update user as verified and mark verification as completed
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { emailVerified: new Date() }
      }),
      prisma.emailVerification.update({
        where: { id: emailVerification.id },
        data: { verified: true }
      })
    ])

    return NextResponse.json(
      { 
        message: 'Email verified successfully!',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Email verification error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { userId: validatedUserId } = resendOtpSchema.parse({ userId })

    const user = await prisma.user.findUnique({
      where: { id: validatedUserId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      )
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    // Delete existing token and create new one
    await prisma.emailVerification.deleteMany({
      where: { userId: user.id, verified: false }
    })

    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        email: user.email,
        otp: otp,
        expiresAt
      }
    })

    // Send email with new OTP (for now, just log it)
    console.log(`📧 New OTP for ${user.email}: ${otp}`)
    // TODO: Implement actual email sending with sendEmailVerificationOTP(user.email, user.name, otp)

    return NextResponse.json(
      { 
        message: 'New verification code sent!',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Resend OTP error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}