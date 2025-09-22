import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const course = await prisma.course.findFirst({
      where: { id: id, approvalStatus: "APPROVED" },
      include: { teacher: { select: { name: true, id: true } } }
    });
    if (!course) {
      return NextResponse.json({ error: "Course not found or not approved" }, { status: 404 });
    }
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}