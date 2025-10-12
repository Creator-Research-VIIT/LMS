import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        studentId: session.user.id,
        courseId: courseId
      }
    });

    return NextResponse.json({ 
      enrolled: !!enrollment,
      enrollmentDate: enrollment?.enrolledAt
    }, { status: 200 });

  } catch (error) {
    console.error("Check enrollment error:", error);
    return NextResponse.json({ error: "Failed to check enrollment status" }, { status: 500 });
  }
}