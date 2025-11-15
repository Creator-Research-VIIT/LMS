import { sendTeacherApplicationConfirmation, sendTeacherApplicationNotification } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { getRoleBasedDashboard } from '@/lib/redirects'
import { generateReferralCode } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const oauthRegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1),
  provider: z.enum(['google', 'github']),
  // 'image' isn't a field on User model; ignore image input to avoid Prisma type error
  image: z.string().optional(),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN'])
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = oauthRegisterSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
    // Generate referral code
    const newReferralCode = generateReferralCode()
    
    // Create new user with OAuth data
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: "", // OAuth users get empty password (required field)
        role: validatedData.role,
        referralCode: newReferralCode,
        emailVerified: new Date(), // OAuth emails are pre-verified
  approvalStatus: validatedData.role === "TEACHER" ? "pending" : "approved"
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approvalStatus: true,
        createdAt: true,
      },
    })
    
    // Get appropriate redirect URL based on role
    const redirectUrl = getRoleBasedDashboard(newUser.role, newUser.approvalStatus)
    
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

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: newUser,
        redirectUrl,
      },
      { status: 201 }
    )  } catch (error) {
    console.error('OAuth registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}