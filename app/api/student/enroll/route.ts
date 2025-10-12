import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const enrollmentSchema = z.object({
  courseId: z.string().uuid("Invalid course ID format"),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { courseId } = enrollmentSchema.parse(body);

    // Check if course exists and is approved
    const course = await prisma.course.findUnique({
      where: { 
        id: courseId,
        approvalStatus: "approved"
      },
      include: {
        User: {
          select: { id: true, name: true }
        }
      }
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or not approved" },
        { status: 404 }
      );
    }

    // Check if user is trying to enroll in their own course
    if (course.teacherId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot enroll in your own course" },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.id,
        courseId: courseId
      }
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "You are already enrolled in this course" },
        { status: 400 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: session.user.id,
        courseId: courseId
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            User: {
              select: { name: true }
            }
          }
        }
      }
    });

    // Initialize course progress
    await prisma.courseProgress.create({
      data: {
        studentId: session.user.id,
        courseId: courseId,
        progressPercent: 0,
        completed: false
      }
    });

    console.log(`✅ Student ${session.user.email} enrolled in course: ${course.title}`);

    return NextResponse.json({
      message: "Successfully enrolled in course",
      enrollment: enrollment,
    });

  } catch (error) {
    console.error("Error enrolling in course:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}