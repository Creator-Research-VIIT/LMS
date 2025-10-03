import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get courses with progress and ratings
    const courses = await prisma.course.findMany({
      where: { approvalStatus: "approved" },
      include: {
        teacher: {
          select: { name: true }
        },
        enrollments: {
          select: { id: true }
        },
        feedbacks: {
          select: { rating: true }
        },
        progresses: {
          select: { progressPercent: true }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    // Transform data for dashboard
    const transformedCourses = courses.map(course => {
      const totalEnrollments = course.enrollments.length;
      const averageRating = course.feedbacks.length > 0 
        ? course.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / course.feedbacks.length
        : 0;
      
      const averageProgress = course.progresses.length > 0
        ? course.progresses.reduce((sum, progress) => sum + progress.progressPercent, 0) / course.progresses.length
        : 0;

      return {
        id: course.id,
        title: course.title,
        progress: Math.round(averageProgress),
        students: totalEnrollments,
        rating: Math.round(averageRating * 10) / 10,
        status: 'running' as const
      };
    });

    return NextResponse.json({ courses: transformedCourses }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}