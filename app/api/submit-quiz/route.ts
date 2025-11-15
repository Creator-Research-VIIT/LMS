import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// POST /api/submit-quiz - Submit quiz answers
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized. Only students can submit quizzes.' }, { status: 401 })
    }

    const body = await request.json()
    const { quizId, answers } = body

    // Validate required fields
    if (!quizId || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ 
        error: 'Missing required fields: quizId and answers array' 
      }, { status: 400 })
    }

    // Check if student has already submitted this quiz
    const existingSubmission = await prisma.quizSubmission.findFirst({
      where: {
        studentId: session.user.id,
        quizId: quizId
      }
    })

    if (existingSubmission) {
      return NextResponse.json({ 
        error: 'You have already submitted this quiz' 
      }, { status: 400 })
    }

    // Get quiz with questions and correct answers
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        Course: true,
        Question: {
          include: {
            Answer: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      }
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Check if student is enrolled in the course
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.id,
        courseId: quiz.courseId
      }
    })

    if (!enrollment) {
      return NextResponse.json({ 
        error: 'You are not enrolled in this course' 
      }, { status: 403 })
    }

    // Calculate score
    let totalScore = 0
    let maxScore = 0
    const gradedAnswers = []

  for (const question of quiz.Question) {
      maxScore += question.points
      const studentAnswer = answers.find((a: any) => a.questionId === question.id)
      
      if (studentAnswer) {
        let isCorrect = false
        
        if (question.questionType === 'MULTIPLE_CHOICE') {
          // Check if selected answer is correct
          const correctAnswer = question.Answer.find((a: any) => a.isCorrect)
          isCorrect = correctAnswer?.id === studentAnswer.selectedAnswerId
        } else if (question.questionType === 'TRUE_FALSE') {
          const correctAnswer = question.Answer.find((a: any) => a.isCorrect)
          isCorrect = correctAnswer?.answerText?.toLowerCase() === studentAnswer.answer?.toLowerCase()
        } else {
          // For short answer, we'll mark as correct for now (manual grading needed)
          isCorrect = true
        }
        
        if (isCorrect) {
          totalScore += question.points
        }
        
        gradedAnswers.push({
          questionId: question.id,
          studentAnswer: studentAnswer.answer || studentAnswer.selectedAnswerId,
          isCorrect,
          points: isCorrect ? question.points : 0
        })
      } else {
        gradedAnswers.push({
          questionId: question.id,
          studentAnswer: null,
          isCorrect: false,
          points: 0
        })
      }
    }

    // Create quiz submission
    const submission = await prisma.quizSubmission.create({
      data: {
        studentId: session.user.id,
        quizId: quizId,
        score: totalScore,
        maxScore: maxScore,
        answers: {
          submittedAnswers: answers,
          gradedAnswers: gradedAnswers
        }
      }
    })

    // Update course progress
    await updateCourseProgress(session.user.id, quiz.courseId)

    return NextResponse.json({ 
      message: 'Quiz submitted successfully',
      submission: {
        id: submission.id,
        score: submission.score ?? 0,
        maxScore: submission.maxScore ?? 0,
        percentage: submission.score != null && submission.maxScore 
          ? Math.round(((submission.score ?? 0) / (submission.maxScore || 1)) * 100)
          : 0,
        submittedAt: submission.submittedAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

async function updateCourseProgress(studentId: string, courseId: string) {
  try {
    // Get total quizzes and completed quizzes for this course
    const totalQuizzes = await prisma.quiz.count({
      where: { courseId }
    })
    
    const completedQuizzes = await prisma.quizSubmission.count({
      where: {
        studentId,
        Quiz: {
          courseId
        }
      }
    })
    
    const progressPercent = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0
    
    // Update or create progress record
    await prisma.courseProgress.upsert({
      where: {
        studentId_courseId: {
          studentId,
          courseId
        }
      },
      update: {
        progressPercent,
        lastAccessedAt: new Date()
      },
      create: {
        id: `${studentId}_${courseId}`,
        studentId,
        courseId,
        progressPercent,
        lastAccessedAt: new Date(),
        updatedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Error updating course progress:', error)
  }
}
