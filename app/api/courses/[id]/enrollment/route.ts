import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Check if user is enrolled in course
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        courseId: id,
        studentId: session.user.id
      }
    });

    return NextResponse.json({ 
      enrolled: !!enrollment,
      enrollmentDate: enrollment?.enrolledAt?.toISOString() || null
    });

  } catch (error) {
    console.error("❌ Error checking enrollment:", error);
    return NextResponse.json(
      { error: "Failed to check enrollment status" },
      { status: 500 }
    );
  }
}