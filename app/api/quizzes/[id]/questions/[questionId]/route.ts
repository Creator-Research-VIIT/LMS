import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// PUT - Update a specific question
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; questionId: string } }
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

    // Delete existing answers and create new ones
    await prisma.answer.deleteMany({
      where: { questionId: params.questionId }
    });

    const question = await prisma.question.update({
      where: { id: params.questionId },
      data: {
        questionText,
        questionType,
        points: points || 1,
        explanation,
        questionData: questionData || null,
        Answer: {
          create: answers.map((answer: any, index: number) => ({
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
      message: "Question updated successfully",
      question
    });

  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific question
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; questionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    await prisma.question.delete({
      where: { id: params.questionId }
    });

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}