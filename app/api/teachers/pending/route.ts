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

    // Get pending teachers (TEACHER role with isApproved = false)
    const pendingTeachers = await prisma.user.findMany({
      where: {
        role: "TEACHER",
        isApproved: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isApproved: true,
        createdAt: true,
        referralCode: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      message: "Pending teachers retrieved successfully",
      teachers: pendingTeachers,
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