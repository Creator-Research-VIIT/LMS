import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  // Only allow admin to approve courses
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log(`✅ Admin approving course: ${id}`);

    // Find the course first to get teacher info
    const existingCourse = await prisma.course.findUnique({
      where: { id: id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (existingCourse.approvalStatus?.toLowerCase() !== "pending") {
      return NextResponse.json({ error: "Course is not in pending status" }, { status: 400 });
    }

    // Update course status to APPROVED
    const course = await prisma.course.update({
      where: { id: id },
      data: { 
        // Normalize to lowercase going forward
        approvalStatus: "approved"
      }
    });

    console.log(`✅ Course approved: ${existingCourse.title} by ${existingCourse.User.name}`);

    // Send email notification to teacher about course approval (future enhancement)
    console.log(`📧 Email notification would be sent to: ${existingCourse.User.email}`);

    return NextResponse.json({ 
      success: true,
      message: "Course approved successfully",
      course: {
        id: course.id,
        title: course.title,
        approvalStatus: course.approvalStatus
      }
    }, { status: 200 });
  } catch (error) {
    console.error('❌ Error approving course:', error);
    return NextResponse.json({ 
      error: "Failed to approve course",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}