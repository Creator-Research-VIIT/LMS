import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Check if course exists and is approved
    const course = await prisma.course.findFirst({
      where: { 
        id: courseId,
        approvalStatus: "approved"
      }
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found or not approved" }, { status: 404 });
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.id,
        courseId: courseId
      }
    });

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 });
    }

    // For now, only allow enrollment in free courses
    if (!course.isFree) {
      return NextResponse.json({ error: "Only free courses can be enrolled directly" }, { status: 400 });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        id: crypto.randomUUID(),
        studentId: session.user.id,
        courseId: courseId
      }
    });

    // Initialize course progress
    const modules = await prisma.module.findMany({
      where: { courseId: courseId },
      orderBy: { orderIndex: 'asc' }
    });

    if (modules.length > 0) {
      await prisma.courseProgress.create({
        data: {
          id: crypto.randomUUID(),
          studentId: session.user.id,
          courseId: courseId,
          completedLessons: 0,
          totalLessons: modules.length,
          progressPercent: 0,
          updatedAt: new Date()
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      enrollmentId: enrollment.id,
      message: "Successfully enrolled in course"
    }, { status: 201 });

  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json({ error: "Failed to enroll in course" }, { status: 500 });
  }
}