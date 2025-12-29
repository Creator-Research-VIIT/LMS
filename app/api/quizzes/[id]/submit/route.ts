import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// POST - Submit quiz attempt
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Only students can submit quizzes" }, { status: 401 });
    }

    const body = await request.json();
    const { answers, timeSpent } = body;

    if (!answers) {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 });
    }

    // Get quiz with questions and correct answers
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
      include: {
        Question: {
          include: {
            Answer: {
              select: {
                id: true,
                answerText: true,
                isCorrect: true,
                matchPair: true,
                blankPosition: true,
                orderIndex: true
              }
            }
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    if (!quiz.isPublished) {
      return NextResponse.json({ error: "Quiz is not available" }, { status: 403 });
    }

    // Check if student has exceeded max attempts
    const previousAttempts = await prisma.quizSubmission.findMany({
      where: {
        quizId: params.id,
        studentId: session.user.id
      }
    });

    if (previousAttempts.length >= quiz.maxAttempts) {
      return NextResponse.json({ 
        error: `Maximum attempts (${quiz.maxAttempts}) exceeded` 
      }, { status: 403 });
    }

    // Calculate score
    const scoreResult = calculateScore(quiz.Question, answers);
    
    // Prevent division by zero
    const percentage = scoreResult.maxScore > 0 
      ? (scoreResult.score / scoreResult.maxScore) * 100 
      : 0;
    const isPassed = percentage >= quiz.passingScore;

    // Create submission
    const submission = await prisma.quizSubmission.create({
      data: {
        quizId: params.id,
        studentId: session.user.id,
        answers: answers,
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: percentage,
        isPassed: isPassed,
        attemptNumber: previousAttempts.length + 1,
        timeSpent: timeSpent || null
      }
    });

    return NextResponse.json({
      success: true,
      message: "Quiz submitted successfully",
      result: {
        submissionId: submission.id,
        score: scoreResult.score,
        maxScore: scoreResult.maxScore,
        percentage: Math.round(percentage * 100) / 100,
        isPassed: isPassed,
        passingScore: quiz.passingScore,
        attemptNumber: submission.attemptNumber,
        maxAttempts: quiz.maxAttempts,
        timeSpent: timeSpent,
        feedback: scoreResult.feedback
      }
    });

  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get student's quiz results
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    // Students can only see their own results, teachers/admins can see any student's results
    let targetStudentId = session.user.id;
    
    if (studentId && (session.user.role === "TEACHER" || session.user.role === "ADMIN")) {
      targetStudentId = studentId;
    }

    const submissions = await prisma.quizSubmission.findMany({
      where: {
        quizId: params.id,
        studentId: targetStudentId
      },
      include: {
        User: {
          select: { name: true, email: true }
        },
        Quiz: {
          select: { title: true, maxAttempts: true, passingScore: true }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      submissions
    });

  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to calculate quiz score
function calculateScore(questions: any[], studentAnswers: any) {
  let score = 0;
  let maxScore = 0;
  const feedback: any[] = [];

  questions.forEach(question => {
    maxScore += question.points;
    const studentAnswer = studentAnswers[question.id];
    
    if (!studentAnswer) {
      feedback.push({
        questionId: question.id,
        correct: false,
        studentAnswer: null,
        correctAnswer: getCorrectAnswers(question)
      });
      return;
    }

    let isCorrect = false;

    switch (question.questionType) {
      case 'MULTIPLE_CHOICE':
      case 'TRUE_FALSE': {
        const correctAnswerId = question.Answer.find((a: any) => a.isCorrect)?.id;
        isCorrect = studentAnswer === correctAnswerId;
        break;
      }
      case 'MATCH_COLUMN': {
        // Check if all pairs are correctly matched
        const correctPairs = question.Answer.reduce((acc: any, answer: any) => {
          acc[answer.answerText] = answer.matchPair;
          return acc;
        }, {});
        
        isCorrect = Object.keys(correctPairs).every(key => 
          studentAnswer[key] === correctPairs[key]
        );
        break;
      }
      case 'FILL_IN_BLANKS': {
        // Check if all blanks are filled correctly
        const correctAnswers = question.Answer.reduce((acc: any, answer: any) => {
          acc[answer.blankPosition] = answer.answerText.toLowerCase().trim();
          return acc;
        }, {});
        
        isCorrect = Object.keys(correctAnswers).every(position => 
          studentAnswer[position]?.toLowerCase().trim() === correctAnswers[position]
        );
        break;
      }
    }

    if (isCorrect) {
      score += question.points;
    }

    feedback.push({
      questionId: question.id,
      correct: isCorrect,
      studentAnswer: studentAnswer,
      correctAnswer: getCorrectAnswers(question)
    });
  });

  return { score, maxScore, feedback };
}

// Helper function to get correct answers for feedback
function getCorrectAnswers(question: any) {
  switch (question.questionType) {
    case 'MULTIPLE_CHOICE':
    case 'TRUE_FALSE':
      return question.Answer.find((a: any) => a.isCorrect)?.answerText;
    case 'MATCH_COLUMN':
      return question.Answer.reduce((acc: any, answer: any) => {
        acc[answer.answerText] = answer.matchPair;
        return acc;
      }, {});
    case 'FILL_IN_BLANKS':
      return question.Answer.reduce((acc: any, answer: any) => {
        acc[answer.blankPosition] = answer.answerText;
        return acc;
      }, {});
    default:
      return null;
  }
}