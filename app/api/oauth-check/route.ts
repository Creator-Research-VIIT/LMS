import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const initiateOAuthSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  provider: z.enum(['google', 'github']),
  image: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, provider, image } = initiateOAuthSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      // User exists, they can proceed with OAuth
      return NextResponse.json({
        exists: true,
        message: 'User exists, OAuth can proceed',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role
        }
      })
    } else {
      // New user, needs role selection
      return NextResponse.json({
        exists: false,
        message: 'New user detected, role selection needed',
        redirectUrl: `/oauth-role-selection?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&provider=${provider}&image=${encodeURIComponent(image || '')}`
      })
    }

  } catch (error) {
    console.error('OAuth initiation error:', error)
    
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