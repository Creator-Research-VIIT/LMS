import { initializeAwards } from '@/lib/awards'
import { NextResponse } from 'next/server'

/**
 * POST /api/awards/init
 * Initialize the awards system
 * Can be called once on app startup
 */
export async function POST() {
  try {
    // Check if awards already exist
    const { prisma } = await import('@/lib/prisma')
    const existingAwards = await prisma.award.count()

    if (existingAwards > 0) {
      return NextResponse.json(
        { message: 'Awards already initialized', count: existingAwards },
        { status: 200 }
      )
    }

    // Initialize awards
    await initializeAwards()

    return NextResponse.json(
      { message: 'Awards initialized successfully', count: 4 },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error initializing awards:', error)
    return NextResponse.json(
      { error: 'Failed to initialize awards' },
      { status: 500 }
    )
  }
}
