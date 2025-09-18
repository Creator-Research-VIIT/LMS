import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendCourseSubmissionNotification } from "@/lib/email";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { approvalStatus: "APPROVED" },
      include: { teacher: { select: { name: true, id: true } } }
    });
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { title, description, thumbnail, price } = body;
    if (!title || !description || !thumbnail || !price) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail,
        price: parseFloat(price),
        teacherId: session.user.id,
        approvalStatus: "PENDING"
      }
    });

    // Send email notification to admin about new course submission
    try {
      await sendCourseSubmissionNotification(
        title,
        session.user.name || 'Unknown Teacher',
        session.user.email || '',
        course.id
      );
    } catch (emailError) {
      console.error('Failed to send course submission notification:', emailError);
      // Don't fail the course creation if email fails
    }

    return NextResponse.json({ course, message: "Course submitted for admin approval" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}