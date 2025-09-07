import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { QuizType } from '@prisma/client'

// POST /api/quizzes - Teacher adds quiz
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Only teachers can create quizzes.' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, type, courseId, questions } = body

    // Validate required fields
    if (!title || !courseId || !questions || !Array.isArray(questions)) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, courseId, and questions array' 
      }, { status: 400 })
    }

    // Verify teacher owns the course
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        teacherId: session.user.id,
        approvalStatus: 'approved'
      }
    })

    if (!course) {
      return NextResponse.json({ 
        error: 'Course not found or you do not have permission to add quizzes to this course' 
      }, { status: 403 })
    }

    // Create quiz with questions and answers
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        type: (type as any) || 'PRACTICE',
        courseId,
        questions: {
          create: questions.map((question: any, index: number) => ({
            questionText: question.questionText,
            questionType: question.questionType || 'multiple_choice',
            points: question.points || 1,
            orderIndex: index,
            answers: {
              create: question.answers?.map((answer: any) => ({
                answerText: answer.answerText,
                isCorrect: answer.isCorrect || false
              })) || []
            }
          }))
        }
      },
      include: {
        questions: {
          include: {
            answers: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      }
    })

    return NextResponse.json({ 
      message: 'Quiz created successfully',
      quiz 
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating quiz:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
