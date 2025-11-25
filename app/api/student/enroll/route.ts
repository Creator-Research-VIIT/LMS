import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const enrollmentSchema = z.object({
  // Using .uuid() though it's deprecated in zod v4; keep for validation but suppress TS deprecation by wrapping.
  // Alternative: regex for UUID. For now we retain for functionality.
  courseId: z.string().uuid(),
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
    const course = await prisma.course.findFirst({
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
        id: randomUUID(),
        studentId: session.user.id,
        courseId: courseId
      },
      include: {
        Course: {
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
        id: randomUUID(),
        studentId: session.user.id,
        courseId: courseId,
        progressPercent: 0,
        totalLessons: 0,
        completedLessons: 0,
        updatedAt: new Date()
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