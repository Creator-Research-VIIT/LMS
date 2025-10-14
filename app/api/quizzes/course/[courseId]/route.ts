import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// GET /api/quizzes/course/[courseId] - Get all quizzes for a course
export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = params

    // Check if user has access to this course
    const hasAccess = await checkCourseAccess(session.user.id, courseId, session.user.role)
    
    if (!hasAccess) {
      return NextResponse.json({ 
        error: 'You do not have access to this course' 
      }, { status: 403 })
    }

    // Get quizzes with questions and answers (hide correct answers for students)
    const quizzes = await prisma.quiz.findMany({
      where: {
        courseId
      },
      include: {
        Question: {
          include: {
            Answer: {
              select: {
                id: true,
                answerText: true,
                orderIndex: true,
                matchPair: true,
                blankPosition: true,
                // Only include isCorrect for teachers
                isCorrect: session.user.role === 'TEACHER'
              }
            }
          },
          orderBy: {
            orderIndex: 'asc'
          }
        },
        // Include submission status for students
        ...(session.user.role === 'STUDENT' && {
          QuizSubmission: {
            where: {
              studentId: session.user.id
            },
            select: {
              id: true,
              score: true,
              maxScore: true,
              submittedAt: true,
              percentage: true,
              isPassed: true
            }
          }
        })
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ quizzes })

  } catch (error) {
    console.error('Error fetching quizzes:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

async function checkCourseAccess(userId: string, courseId: string, role: string) {
  if (role === 'ADMIN') {
    return true
  }
  
  if (role === 'TEACHER') {
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: userId
      }
    })
    return !!course
  }
  
  if (role === 'STUDENT') {
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: userId,
        courseId: courseId
      }
    })
    return !!enrollment
  }
  
  return false
}