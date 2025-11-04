import { sendEmailVerificationOTP } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const resendSchema = z.object({
  userId: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = resendSchema.parse(body)

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId }
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

    // Delete existing unverified tokens and create new one
    await prisma.emailVerification.deleteMany({
      where: { userId: user.id, used: false }
    })

    await prisma.emailVerification.create({
      data: {
        userId: user.id,
        email: user.email,
        otp: otp,
        expiresAt
      }
    })

    // Send new OTP email
    let emailSent = false
    try {
      emailSent = await sendEmailVerificationOTP(user.email, user.name, otp)
      if (emailSent) {
        console.log(`✅ New verification OTP sent to: ${user.email}`)
      } else {
        console.warn(`⚠️ OTP created but email not sent. OTP for ${user.email}: ${otp}`)
      }
    } catch (emailError) {
      console.error('❌ Failed to send verification OTP:', emailError)
      // Log OTP for development if email fails
      console.log(`📧 New OTP for ${user.email}: ${otp}`)
    }

    return NextResponse.json(
      { 
        message: 'New verification code sent!',
        success: true,
        emailSent
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Resend verification error:', error)

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