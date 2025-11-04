import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET teacher's own courses (all statuses)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const teacherCourses = await prisma.course.findMany({
      where: { teacherId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ courses: teacherCourses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teacher courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
