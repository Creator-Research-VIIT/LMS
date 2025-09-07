import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
        approvalStatus: "pending"
      }
    });
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}