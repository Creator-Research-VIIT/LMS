import { NextRequest, NextResponse } from 'next/server'
import { verifyOTP } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { userId, otp } = await request.json()
    
    if (!userId || !otp) {
      return NextResponse.json(
        { error: 'Missing userId or OTP' },
        { status: 400 }
      )
    }
    
    // Verify the OTP
    const result = await verifyOTP(userId, otp)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: result.message
    })
    
  } catch (error) {
    console.error('Verify email error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}