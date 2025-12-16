import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isVIPStudent } from "@/lib/vip-utils";
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

    // Check if student has VIP status (100+ completed courses)
    const isVIP = await isVIPStudent(session.user.id);
    const shouldGetFreeAccess = isVIP || course.isFree;

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        id: `${session.user.id}_${courseId}`,
        courseId,
        studentId: session.user.id,
        isPaid: shouldGetFreeAccess // VIP students get free access to all courses
      }
    });

    console.log(`✅ User ${session.user.name} enrolled in course: ${course.title}${isVIP ? ' (VIP Free Access)' : ''}`);

    return NextResponse.json({ 
      success: true,
      message: isVIP 
        ? "Successfully enrolled in course (VIP Free Access)" 
        : "Successfully enrolled in course",
      enrollment: {
        id: enrollment.id,
        enrolledAt: enrollment.enrolledAt.toISOString(),
        isPaid: enrollment.isPaid,
        vipAccess: isVIP
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