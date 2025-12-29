import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    // Only teachers can access this endpoint
    if (userRole !== "TEACHER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all courses by this teacher
    const teacherCourses = await prisma.course.findMany({
      where: {
        teacherId: userId,
      },
      select: {
        id: true,
        approvalStatus: true,
      },
    });

    const courseIds = teacherCourses.map(c => c.id);

    // Count total students (unique enrollments across all teacher's courses)
    const totalStudents = await prisma.enrollment.count({
      where: {
        courseId: {
          in: courseIds,
        },
      },
    });

    // Count active (approved) courses
    const activeCourses = teacherCourses.filter(
      c => c.approvalStatus === "APPROVED"
    ).length;

    // Calculate total revenue from payments
    const payments = await prisma.payment.findMany({
      where: {
        courseId: {
          in: courseIds,
        },
        status: "SUCCESS",
      },
      select: {
        amount: true,
      },
    });

    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Calculate average rating from feedback
    const feedbacks = await prisma.feedback.findMany({
      where: {
        courseId: {
          in: courseIds,
        },
      },
      select: {
        rating: true,
      },
    });

    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : "0.0";

    return NextResponse.json({
      totalStudents,
      activeCourses,
      totalRevenue,
      avgRating,
      totalCourses: teacherCourses.length,
      pendingCourses: teacherCourses.filter(c => c.approvalStatus === "PENDING").length,
      rejectedCourses: teacherCourses.filter(c => c.approvalStatus === "REJECTED").length,
    });
  } catch (error) {
    console.error("Error fetching teacher analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
