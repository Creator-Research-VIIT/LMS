import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// POST - Add a question to a quiz
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      questionText, 
      questionType, 
      points, 
      answers, 
      explanation,
      questionData 
    } = body;

    if (!questionText || !questionType || !answers) {
      return NextResponse.json(
        { error: "Question text, type, and answers are required" },
        { status: 400 }
      );
    }

    // Verify quiz ownership for teachers
    if (session.user.role === "TEACHER") {
      const quiz = await prisma.quiz.findFirst({
        where: { 
          id: params.id,
          Course: {
            teacherId: session.user.id
          }
        }
      });

      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found or access denied" }, { status: 403 });
      }
    }

    // Get the next order index
    const lastQuestion = await prisma.question.findFirst({
      where: { quizId: params.id },
      orderBy: { orderIndex: 'desc' }
    });
    
    const nextOrderIndex = lastQuestion ? lastQuestion.orderIndex + 1 : 0;

    // Validate answers based on question type
    const validatedAnswers = validateAnswersByType(questionType, answers);
    
    const question = await prisma.question.create({
      data: {
        questionText,
        questionType,
        points: points || 1,
        orderIndex: nextOrderIndex,
        explanation,
        questionData: questionData || null,
        quizId: params.id,
        Answer: {
          create: validatedAnswers.map((answer: any, index: number) => ({
            answerText: answer.answerText,
            isCorrect: answer.isCorrect || false,
            orderIndex: answer.orderIndex || index,
            matchPair: answer.matchPair || null,
            blankPosition: answer.blankPosition || null
          }))
        }
      },
      include: {
        Answer: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Question added successfully",
      question
    });

  } catch (error) {
    console.error("Error adding question:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to validate answers based on question type
function validateAnswersByType(questionType: string, answers: any[]) {
  switch (questionType) {
    case 'MULTIPLE_CHOICE': {
      // Must have at least 2 options, exactly one correct answer
      if (answers.length < 2) {
        throw new Error("Multiple choice questions must have at least 2 options");
      }
      const correctCount = answers.filter(a => a.isCorrect).length;
      if (correctCount !== 1) {
        throw new Error("Multiple choice questions must have exactly one correct answer");
      }
      return answers;
    }

    case 'TRUE_FALSE': {
      // Must have exactly 2 options (True/False), one correct
      if (answers.length !== 2) {
        throw new Error("True/False questions must have exactly 2 options");
      }
      const tfCorrectCount = answers.filter(a => a.isCorrect).length;
      if (tfCorrectCount !== 1) {
        throw new Error("True/False questions must have exactly one correct answer");
      }
      return answers;
    }

    case 'MATCH_COLUMN': {
      // Each answer should have a matchPair
      return answers.map(answer => {
        if (!answer.matchPair) {
          throw new Error("Match column questions require matchPair for each option");
        }
        return { ...answer, isCorrect: true }; // All pairs are "correct"
      });
    }

    case 'FILL_IN_BLANKS': {
      // Each answer should have a blankPosition
      return answers.map(answer => {
        if (answer.blankPosition === undefined) {
          throw new Error("Fill in blanks questions require blankPosition for each answer");
        }
        return { ...answer, isCorrect: true }; // All blanks are "correct"
      });
    }

    default:
      return answers;
  }
}