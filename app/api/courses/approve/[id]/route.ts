import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// POST - Approve or reject a course
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action } = await req.json(); // action can be "APPROVE" or "REJECT"
    const courseId = params.id;

    if (!action || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: { 
        approvalStatus: action === "APPROVE" ? "APPROVED" : "REJECTED"
      },
      include: { 
        teacher: { 
          select: { name: true, email: true } 
        } 
      }
    });

    return NextResponse.json({ 
      course: updatedCourse, 
      message: `Course ${action.toLowerCase()}d successfully` 
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating course approval:", error);
    return NextResponse.json({ error: "Failed to update course approval" }, { status: 500 });
  }
}
