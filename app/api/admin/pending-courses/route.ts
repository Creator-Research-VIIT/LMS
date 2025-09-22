import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get pending courses
    const courses = await prisma.course.findMany({
      where: { approvalStatus: "pending" },
      include: {
        teacher: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform data for dashboard
    const transformedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      teacher: course.teacher.name,
      submittedAt: course.createdAt.toLocaleDateString(),
      status: 'pending' as const
    }));

    return NextResponse.json({ courses: transformedCourses }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch pending courses:", error);
    return NextResponse.json({ error: "Failed to fetch pending courses" }, { status: 500 });
  }
}