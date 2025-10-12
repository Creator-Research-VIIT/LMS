import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Get pending teachers (TEACHER role with approvalStatus = "pending")
    const pendingTeachers = await prisma.user.findMany({
      where: {
        role: "TEACHER",
        approvalStatus: "pending",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approvalStatus: true,
        createdAt: true,
        referralCode: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Transform data for dashboard
    const transformedTeachers = pendingTeachers.map(teacher => ({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      status: teacher.approvalStatus,
      submittedAt: teacher.createdAt.toLocaleDateString(),
      referralCode: teacher.referralCode
    }));

    return NextResponse.json({
      message: "Pending teachers retrieved successfully",
      teachers: transformedTeachers,
      count: pendingTeachers.length,
    });

  } catch (error) {
    console.error("Error fetching pending teachers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 