import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch specific quiz with questions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        Course: {
          select: { title: true, teacherId: true }
        },
        Question: {
          include: {
            Answer: true
          },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Check permissions - only teachers of the course, admins, and enrolled students can access
    const isTeacher = session.user.role === "TEACHER" && quiz.Course.teacherId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    const isStudent = session.user.role === "STUDENT";

    if (!isTeacher && !isAdmin && !isStudent) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // For students, only return published quizzes and hide correct answers
    if (isStudent) {
      if (!quiz.isPublished) {
        return NextResponse.json({ error: "Quiz not available" }, { status: 403 });
      }
      
      // Hide correct answers for students
      const sanitizedQuiz = {
        ...quiz,
        Question: quiz.Question.map(question => ({
          ...question,
          Answer: question.Answer.map(answer => ({
            id: answer.id,
            answerText: answer.answerText,
            orderIndex: answer.orderIndex,
            matchPair: answer.matchPair,
            blankPosition: answer.blankPosition
            // isCorrect is hidden for students
          }))
        }))
      };
      
      return NextResponse.json({ success: true, quiz: sanitizedQuiz });
    }

    return NextResponse.json({ success: true, quiz });

  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update quiz details
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, timeLimit, maxAttempts, passingScore, isPublished } = body;

    // Verify ownership for teachers
    if (session.user.role === "TEACHER") {
      const quiz = await prisma.quiz.findFirst({
        where: { 
          id,
          Course: {
            teacherId: session.user.id
          }
        }
      });

      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found or access denied" }, { status: 403 });
      }
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: {
        title,
        description,
        timeLimit: timeLimit ? parseInt(timeLimit) : null,
        maxAttempts: maxAttempts ? parseInt(maxAttempts) : undefined,
        passingScore: passingScore ? parseFloat(passingScore) : undefined,
        isPublished: isPublished !== undefined ? isPublished : undefined,
      },
      include: {
        Course: {
          select: { title: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Quiz updated successfully",
      quiz: updatedQuiz
    });

  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete quiz
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership for teachers
    if (session.user.role === "TEACHER") {
      const quiz = await prisma.quiz.findFirst({
        where: { 
          id,
          Course: {
            teacherId: session.user.id
          }
        }
      });

      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found or access denied" }, { status: 403 });
      }
    }

    await prisma.quiz.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: "Quiz deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}