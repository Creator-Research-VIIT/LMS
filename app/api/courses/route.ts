import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendCourseSubmissionNotification } from "@/lib/email";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { approvalStatus: "approved" },
      include: { User: { select: { name: true, id: true } } }
    });
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('Error fetching courses:', error);
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
    const { title, description, thumbnail, price, duration, category, isFree, modules } = body;
    
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    if (!isFree && (!price || price <= 0)) {
      return NextResponse.json({ error: "Price is required for paid courses" }, { status: 400 });
    }

    if (!modules || modules.length === 0) {
      return NextResponse.json({ error: "At least one module is required" }, { status: 400 });
    }

    // Validate modules
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      if (!module.title || !module.videoUrl) {
        return NextResponse.json({ 
          error: `Module ${i + 1} must have a title and video URL` 
        }, { status: 400 });
      }
    }

    const course = await prisma.course.create({
      data: {
        id: crypto.randomUUID(),
        title,
        description,
        thumbnail,
        price: isFree ? 0 : parseFloat(price),
        duration,
        category,
        isFree,
        teacherId: session.user.id,
        approvalStatus: "PENDING",
        Module: {
          create: modules.map((module: any, index: number) => ({
            title: module.title,
            description: module.description || '',
            videoUrl: module.videoUrl,
            resources: module.resources || '',
            orderIndex: index + 1,
          }))
        }
      },
      include: {
        Module: true
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
    console.error('Error creating course:', error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}