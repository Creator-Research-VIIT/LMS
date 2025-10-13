import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all quizzes for a teacher or specific course
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    let whereClause = {};
    
    if (courseId) {
      whereClause = { courseId };
    } else if (session.user.role === "TEACHER") {
      // Teacher can only see quizzes for their own courses
      whereClause = {
        Course: {
          teacherId: session.user.id
        }
      };
    }

    const quizzes = await prisma.quiz.findMany({
      where: whereClause,
      include: {
        Course: {
          select: { title: true, id: true }
        },
        Question: {
          include: {
            Answer: true
          }
        },
        _count: {
          select: { 
            Question: true,
            QuizSubmission: true 
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true,
      quizzes: quizzes.map(quiz => ({
        ...quiz,
        questionCount: quiz._count.Question,
        submissionCount: quiz._count.QuizSubmission
      }))
    });

  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new quiz
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, courseId, timeLimit, maxAttempts, passingScore } = body;

    if (!title || !courseId) {
      return NextResponse.json(
        { error: "Title and course ID are required" },
        { status: 400 }
      );
    }

    // Verify teacher owns the course (if not admin)
    if (session.user.role === "TEACHER") {
      const course = await prisma.course.findFirst({
        where: { 
          id: courseId, 
          teacherId: session.user.id 
        }
      });

      if (!course) {
        return NextResponse.json(
          { error: "Course not found or access denied" },
          { status: 403 }
        );
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        courseId,
        timeLimit: timeLimit ? parseInt(timeLimit) : null,
        maxAttempts: maxAttempts ? parseInt(maxAttempts) : 3,
        passingScore: passingScore ? parseFloat(passingScore) : 60.0,
      },
      include: {
        Course: {
          select: { title: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Quiz created successfully",
      quiz
    });

  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
