import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Get feedbacks for a specific course
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        courseId: params.id,
        type: 'COURSE',
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Calculate average rating
    const avgRating = feedbacks.length > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      : 0

    return NextResponse.json({
      feedbacks,
      stats: {
        total: feedbacks.length,
        averageRating: Math.round(avgRating * 10) / 10,
      },
    })
  } catch (error: any) {
    console.error('Failed to fetch course feedbacks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    )
  }
}
