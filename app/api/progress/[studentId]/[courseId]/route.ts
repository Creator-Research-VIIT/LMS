import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// GET /api/progress/[studentId]/[courseId] - Get student progress for a course
export async function GET(
  request: Request,
  { params }: { params: Promise<{ studentId: string; courseId: string }> }
) {
  try {
    const { studentId, courseId } = await params;
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
        // Relation names per schema are PascalCase
        Course: {
          select: {
            id: true,
            title: true,
            description: true
          }
        },
        User: {
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
        // Filter through relation field `Quiz`
        Quiz: {
          courseId
        }
      },
      include: {
        Quiz: {
          select: {
            id: true,
            title: true
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

  const validSubmissions = quizSubmissions.filter(sub => sub.score != null && sub.maxScore != null && (sub.maxScore ?? 0) > 0)
    const progressData = {
      ...progress,
      quizSubmissions,
      totalQuizzes,
      completedQuizzes: quizSubmissions.length,
      averageScore: validSubmissions.length > 0 
        ? validSubmissions.reduce((sum, sub) => sum + (((sub.score ?? 0) / (sub.maxScore ?? 1)) * 100), 0) / validSubmissions.length 
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
