import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * GET /api/admin/students
 * Fetch all students with enrollment counts
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const skip = Number.parseInt(searchParams.get('skip') || '0')
    const take = Number.parseInt(searchParams.get('take') || '10')

    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
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

    const totalStudents = await prisma.user.count({
      where: {
        role: 'STUDENT',
      },
    })

    return NextResponse.json({
      success: true,
      data: students.map(student => ({
        id: student.id,
        name: student.name,
        email: student.email,
        enrolledCourses: student._count.Enrollment,
        joinedAt: student.createdAt,
        status: 'active',
      })),
      pagination: {
        total: totalStudents,
        skip,
        take,
      },
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}
