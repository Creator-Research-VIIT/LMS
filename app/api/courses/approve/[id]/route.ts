import { authOptions } from "@/lib/auth";
import { sendCourseApprovalNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// POST - Approve or reject a course
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, message } = await req.json(); // action can be "APPROVE" or "REJECT", message is optional admin feedback
    const courseId = id;

    if (!action || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: { 
        approvalStatus: action === "APPROVE" ? "approved" : "rejected"
      },
      include: {
        User: { 
          select: { name: true, email: true } 
        } 
      }
    });

    // Send email notification to teacher about course approval/rejection
    try {
      await sendCourseApprovalNotification(
        updatedCourse.title,
        updatedCourse.User.email || '',
        updatedCourse.User.name || 'Unknown Teacher',
        action === "APPROVE" ? 'approved' : 'rejected',
        message || undefined
      );
    } catch (emailError) {
      console.error('Failed to send course approval notification:', emailError);
      // Don't fail the approval process if email fails
    }

    return NextResponse.json({ 
      course: updatedCourse, 
      message: `Course ${action.toLowerCase()}d successfully` 
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating course approval:", error);
    return NextResponse.json({ error: "Failed to update course approval" }, { status: 500 });
  }
}
