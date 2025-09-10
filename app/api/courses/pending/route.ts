import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET pending courses for admin
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pendingCourses = await prisma.course.findMany({
      where: { approvalStatus: "PENDING" },
      include: { 
        teacher: { 
          select: { name: true, email: true, id: true } 
        } 
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ courses: pendingCourses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending courses:", error);
    return NextResponse.json({ error: "Failed to fetch pending courses" }, { status: 500 });
  }
}
