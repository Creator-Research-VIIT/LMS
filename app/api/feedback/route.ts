import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    // Teachers get feedback for their courses
    if (userRole === "TEACHER") {
      const teacherCourses = await prisma.course.findMany({
        where: { teacherId: userId },
        select: { id: true },
      });

      const courseIds = teacherCourses.map(c => c.id);

      const feedbacks = await prisma.feedback.findMany({
        where: {
          courseId: { in: courseIds },
        },
        include: {
          User: {
            select: {
              name: true,
              email: true,
            },
          },
          Course: {
            select: {
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({ feedbacks });
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { courseId, rating, comment } = await req.json();

    // Validate input
    if (!courseId || !rating) {
      return NextResponse.json(
        { error: "Course ID and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: userId,
        courseId: courseId,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: "You must be enrolled in this course to give feedback" },
        { status: 403 }
      );
    }

    // Check if feedback already exists
    const existingFeedback = await prisma.feedback.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });

    if (existingFeedback) {
      // Update existing feedback
      const updatedFeedback = await prisma.feedback.update({
        where: { id: existingFeedback.id },
        data: {
          rating,
          comment: comment || null,
        },
      });

      return NextResponse.json({
        message: "Feedback updated successfully",
        feedback: updatedFeedback,
      });
    }

    // Create new feedback
    const feedback = await prisma.feedback.create({
      data: {
        userId,
        courseId,
        rating,
        comment: comment || null,
      },
    });

    return NextResponse.json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
