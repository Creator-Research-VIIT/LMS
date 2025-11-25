import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * GET /api/admin/courses
 * Fetch all courses with enrollment and instructor info
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const skip = Number.parseInt(searchParams.get('skip') || '0')
    const take = Number.parseInt(searchParams.get('take') || '10')

    const courses = await prisma.course.findMany({
      include: {
        User: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            Enrollment: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalCourses = await prisma.course.count()

    return NextResponse.json({
      success: true,
      data: courses.map(course => ({
        id: course.id,
        title: course.title,
        instructor: course.User.name,
        instructorEmail: course.User.email,
        price: course.price,
        enrollments: course._count.Enrollment,
        status: course.approvalStatus,
        thumbnail: course.thumbnail,
        isFree: course.isFree,
        createdAt: course.createdAt,
      })),
      pagination: {
        total: totalCourses,
        skip,
        take,
      },
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}