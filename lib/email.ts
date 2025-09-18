import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email configuration missing. Emails will be logged to console only.')
    return null
  }
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

/**
 * Generate a 6-digit OTP code
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Create or update email verification record for a user
 */
export async function createEmailVerification(userId: string, email: string): Promise<string> {
  const otp = generateOTP()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
  
  // Delete any existing verification records for this user
  await prisma.emailVerification.deleteMany({
    where: { userId }
  })
  
  // Create new verification record
  await prisma.emailVerification.create({
    data: {
      id: crypto.randomUUID(),
      userId,
      email,
      otp,
      expiresAt,
      verified: false
    }
  })
  
  return otp
}

/**
 * Verify OTP code for a user
 */
export async function verifyOTP(userId: string, otp: string): Promise<{ success: boolean; message: string }> {
  const verification = await prisma.emailVerification.findFirst({
    where: {
      userId,
      otp,
      verified: false
    }
  })
  
  if (!verification) {
    return { success: false, message: 'Invalid OTP code' }
  }
  
  if (verification.expiresAt < new Date()) {
    return { success: false, message: 'OTP code has expired' }
  }
  
  // Mark as verified
  await prisma.emailVerification.update({
    where: { id: verification.id },
    data: { verified: true }
  })
  
  // Update user's emailVerified field
  await prisma.user.update({
    where: { id: userId },
    data: { emailVerified: new Date() }
  })
  
  return { success: true, message: 'Email verified successfully' }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(email: string, otp: string): Promise<boolean> {
  const transporter = createTransporter()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
🔐 EMAIL VERIFICATION (Development Mode)
To: ${email}
OTP Code: ${otp}
This code expires in 15 minutes.
    `)
    return true
  }
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification - LearnHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📚 LearnHub</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Email Verification</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Thank you for signing up! Please use the verification code below to complete your registration:
            </p>
            
            <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">Your verification code is:</p>
              <div style="font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              ⏰ This code will expire in 15 minutes.<br>
              If you didn't request this verification, please ignore this email.
            </p>
          </div>
          
          <div style="background: #343a40; padding: 20px; text-align: center;">
            <p style="color: #adb5bd; margin: 0; font-size: 14px;">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
LearnHub - Email Verification

Thank you for signing up! Please use the verification code below to complete your registration:

Verification Code: ${otp}

This code will expire in 15 minutes.
If you didn't request this verification, please ignore this email.

© 2024 LearnHub. All rights reserved.
      `
    }
    
    await transporter.sendMail(mailOptions)
    console.log(`✅ Verification email sent to ${email}`)
    return true
    
  } catch (error) {
    console.error('❌ Failed to send verification email:', error)
    
    // Fall back to console logging if email fails
    console.log(`
🔐 EMAIL VERIFICATION (Fallback - Email Failed)
To: ${email}
OTP Code: ${otp}
This code expires in 15 minutes.
Error: ${error instanceof Error ? error.message : 'Unknown error'}
    `)
    return false
  }
}

/**
 * Check if user has pending email verification
 */
export async function hasPendingVerification(userId: string): Promise<boolean> {
  const verification = await prisma.emailVerification.findFirst({
    where: {
      userId,
      verified: false,
      expiresAt: {
        gt: new Date()
      }
    }
  })
  
  return !!verification
}

/**
 * Resend verification email for a user
 */
export async function resendVerificationEmail(userId: string, email: string): Promise<string> {
  const otp = await createEmailVerification(userId, email)
  await sendVerificationEmail(email, otp)
  return otp
}