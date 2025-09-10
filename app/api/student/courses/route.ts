import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// GET /api/student/courses - Get enrolled courses for student
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized. Only students can access this endpoint.' }, { status: 401 })
    }

    // Get student's enrolled courses
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: session.user.id
      },
      include: {
        course: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        enrolledAt: 'desc'
      }
    })

    const courses = enrollments.map(enrollment => enrollment.course)

    return NextResponse.json({ courses })

  } catch (error) {
    console.error('Error fetching student courses:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
