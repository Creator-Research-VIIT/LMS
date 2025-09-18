import { NextRequest, NextResponse } from 'next/server'
import { createEmailVerification, sendVerificationEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json()
    
    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing userId or email' },
        { status: 400 }
      )
    }
    
    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Generate and send OTP
    const otp = await createEmailVerification(userId, email)
    await sendVerificationEmail(email, otp)
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully'
    })
    
  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    )
  }
}