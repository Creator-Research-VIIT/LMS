import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

// POST - Submit feedback
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Only students can submit feedback' }, { status: 403 })
    }

    const body = await request.json()
    const { courseId, teacherId, rating, comment, type } = body

    // Validate
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment is required' },
        { status: 400 }
      )
    }

    if (type === 'COURSE' && !courseId) {
      return NextResponse.json(
        { error: 'Course ID is required for course feedback' },
        { status: 400 }
      )
    }

    if (type === 'TEACHER' && !teacherId) {
      return NextResponse.json(
        { error: 'Teacher ID is required for teacher feedback' },
        { status: 400 }
      )
    }

    // For course feedback, verify enrollment
    if (type === 'COURSE') {
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          studentId: session.user.id,
          courseId: courseId,
        },
      })

      if (!enrollment) {
        return NextResponse.json(
          { error: 'You must be enrolled in this course to give feedback' },
          { status: 403 }
        )
      }
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        userId: session.user.id,
        courseId: type === 'COURSE' ? courseId : null,
        teacherId: type === 'TEACHER' ? teacherId : null,
        rating,
        comment: comment.trim(),
        type: type || 'COURSE',
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Course: type === 'COURSE' ? {
          select: {
            id: true,
            title: true,
          },
        } : undefined,
      },
    })

    return NextResponse.json({ feedback }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to submit feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

// GET - Get user's feedbacks
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'COURSE' | 'TEACHER' | null

    const where: any = {
      userId: session.user.id,
    }

    if (type) {
      where.type = type
    }

    const feedbacks = await prisma.feedback.findMany({
      where,
      include: {
        Course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ feedbacks })
  } catch (error: any) {
    console.error('Failed to fetch feedbacks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    )
  }
}
