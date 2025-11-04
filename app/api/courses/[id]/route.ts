import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const course = await prisma.course.findFirst({
      where: { id: id },
      include: { 
        User: { 
          select: { 
            name: true, 
            id: true,
            email: true 
          } 
        },
        Module: {
          orderBy: {
            orderIndex: 'asc'
          }
        }
      }
    });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      id: course.id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      price: course.price,
      duration: course.duration,
      category: course.category,
      isFree: course.isFree,
      approvalStatus: course.approvalStatus,
      User: course.User,
      createdAt: course.createdAt.toISOString(),
      Module: course.Module
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, thumbnail, price, duration, category, isFree, modules } = body;
    
    // Check if the course belongs to the current teacher
    const existingCourse = await prisma.course.findFirst({
      where: { id: id, teacherId: session.user.id }
    });

    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found or you don't have permission to edit it" }, { status: 404 });
    }

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

    // Update course and modules in a transaction
    const updatedCourse = await prisma.$transaction(async (tx) => {
      // Update course
      const course = await tx.course.update({
        where: { id: id },
        data: {
          title,
          description,
          thumbnail,
          price: isFree ? 0 : parseFloat(price),
          duration,
          category,
          isFree,
          updatedAt: new Date(),
        }
      });

      // Delete existing modules
      await tx.module.deleteMany({
        where: { courseId: id }
      });

      // Create new modules
      await tx.module.createMany({
        data: modules.map((module: any, index: number) => ({
          id: crypto.randomUUID(),
          title: module.title,
          description: module.description || '',
          videoUrl: module.videoUrl,
          resources: module.resources || '',
          orderIndex: index + 1,
          courseId: id,
        }))
      });

      return course;
    });

    return NextResponse.json({ 
      course: updatedCourse, 
      message: "Course updated successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}