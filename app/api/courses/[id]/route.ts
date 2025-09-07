import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const course = await prisma.course.findFirst({
      where: { id: params.id, approvalStatus: "APPROVED" },
      include: { teacher: { select: { name: true, id: true } } }
    });
    if (!course) {
      return NextResponse.json({ error: "Course not found or not approved" }, { status: 404 });
    }
    return NextResponse.json({ course }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}