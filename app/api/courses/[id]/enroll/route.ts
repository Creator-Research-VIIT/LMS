import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Enroll user in course
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Only students can enroll in courses
    if (session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Only students can enroll in courses" }, { status: 403 });
    }

  const { id: courseId } = params;
    
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

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId: session.user.id
      }
    });

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 400 });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        id: `${session.user.id}_${courseId}`,
        courseId,
        studentId: session.user.id
      }
    });

    console.log(`✅ User ${session.user.name} enrolled in course: ${course.title}`);

    return NextResponse.json({ 
      success: true,
      message: "Successfully enrolled in course",
      enrollment: {
        id: enrollment.id,
        enrolledAt: enrollment.enrolledAt.toISOString()
      }
    });

  } catch (error) {
    console.error("❌ Error enrolling in course:", error);
    return NextResponse.json(
      { 
        error: "Failed to enroll in course",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}