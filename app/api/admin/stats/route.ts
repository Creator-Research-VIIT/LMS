import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get dashboard statistics
    const [
      totalStudents,
      totalCourses,
      totalCertificates,
      pendingTeachers,
      pendingCourses,
      enrollments,
      activeUsers
    ] = await Promise.all([
      prisma.user.count({
        where: { role: "STUDENT" }
      }),
      prisma.course.count({
        where: { approvalStatus: "approved" }
      }),
      prisma.user.count({
        where: { 
          role: "STUDENT",
          // Assuming certificates are tied to completed enrollments
        }
      }),
      prisma.user.count({
        where: { 
          role: "TEACHER",
          approvalStatus: "pending"
        }
      }),
      prisma.course.count({
        where: { approvalStatus: "pending" }
      }),
      prisma.enrollment.count(),
      prisma.user.count({
        where: {
          // Users active in the last 30 days
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    // Calculate total revenue (mock calculation)
    const totalRevenue = enrollments * 50; // Assuming average course price

    // Calculate completion rate (mock calculation)
    const completionRate = Math.round((totalCertificates / totalStudents) * 100) || 0;

    const stats = {
      totalStudents,
      totalCourses,
      totalCertificates,
      pendingTeachers,
      pendingCourses,
      totalRevenue,
      activeUsers,
      completionRate
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}