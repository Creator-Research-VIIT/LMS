import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// GET pending courses for admin
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  let role = session?.user.role as string | undefined;
  if (!role) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    role = (token as any)?.role;
  }
  if (!role || role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("🔍 Fetching pending courses for admin...");

    const pendingCourses = await prisma.course.findMany({
      where: {
        OR: [
          { approvalStatus: "pending" },
          { approvalStatus: "PENDING" }
        ]
      },
      include: { 
        User: { 
          select: { name: true, email: true, id: true } 
        } 
      },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`📚 Found ${pendingCourses.length} pending courses`);

    // Transform the data to match the expected interface
    const transformedCourses = pendingCourses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      teacherName: course.User.name,
      teacherEmail: course.User.email,
      price: course.price,
      thumbnail: course.thumbnail,
      createdAt: course.createdAt.toISOString(),
      approvalStatus: course.approvalStatus
    }));

    return NextResponse.json({ 
      success: true,
      courses: transformedCourses,
      count: transformedCourses.length
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching pending courses:", error);
    return NextResponse.json({ 
      error: "Failed to fetch pending courses",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
