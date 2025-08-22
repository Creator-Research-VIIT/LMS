import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Only allow teachers to upload courses
  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch teacher from DB to check approval status
  const teacher = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { approvalStatus: true },
  });

  if (!teacher || teacher.approvalStatus !== "approved") {
    return NextResponse.json({ error: "Teacher not approved" }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, price, thumbnail } = body;

  if (!title || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: price || 0,
        teacherId: session.user.id,
        thumbnail,
      },
    });
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}