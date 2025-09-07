import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/progress/[studentId]/[courseId] - Get student progress for a course
export async function GET(
  request: Request,
  { params }: { params: { studentId: string; courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { studentId, courseId } = params

    // Check permissions
    if (session.user.role === 'STUDENT' && session.user.id !== studentId) {
      return NextResponse.json({ 
        error: 'You can only view your own progress' 
      }, { status: 403 })
    }

    if (session.user.role === 'TEACHER') {
      // Check if teacher owns the course
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          teacherId: session.user.id
        }
      })
      
      if (!course) {
        return NextResponse.json({ 
          error: 'You can only view progress for your own courses' 
        }, { status: 403 })
      }
    }

    // Get course progress
    const progress = await prisma.courseProgress.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId
        }
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true
          }
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!progress) {
      return NextResponse.json({ 
        error: 'Progress record not found' 
      }, { status: 404 })
    }

    // Get quiz submissions for detailed progress
    const quizSubmissions = await prisma.quizSubmission.findMany({
      where: {
        studentId,
        quiz: {
          courseId
        }
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            type: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    })

    // Get total quizzes in course
    const totalQuizzes = await prisma.quiz.count({
      where: { courseId }
    })

    const progressData = {
      ...progress,
      quizSubmissions,
      totalQuizzes,
      completedQuizzes: quizSubmissions.length,
      averageScore: quizSubmissions.length > 0 
        ? quizSubmissions.reduce((sum, sub) => sum + (sub.score / sub.maxScore * 100), 0) / quizSubmissions.length 
        : 0
    }

    return NextResponse.json({ progress: progressData })

  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
