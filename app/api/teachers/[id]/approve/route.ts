import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const teacherId = params.id;

// Check if teacher exists and is a teacher
const teacher = await prisma.user.findUnique({
  where: { id: teacherId },
  select: {
    id: true,
    name: true,
    email: true,
    role: true,
    approvalStatus: true,
    createdAt: true,
    referralCode: true
  }
});

if (!teacher) {
  return NextResponse.json(
    { error: "Teacher not found" },
    { status: 404 }
  );
}

if (teacher.role !== "TEACHER") {
  return NextResponse.json(
    { error: "User is not a teacher" },
    { status: 400 }
  );
}

if (teacher.approvalStatus === "approved") {
  return NextResponse.json(
    { error: "Teacher is already approved" },
    { status: 400 }
  );
}

    // Approve the teacher
    const approvedTeacher = await prisma.user.update({
      where: { id: teacherId },
      data: { approvalStatus: "approved" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        approvalStatus: true,
      },
    });

    return NextResponse.json({
      message: "Teacher approved successfully",
      teacher: approvedTeacher,
    });

  } catch (error) {
    console.error("Error approving teacher:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 