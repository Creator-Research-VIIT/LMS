import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/student/courses - Get enrolled courses for student
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Fallback to reading JWT directly if session is unavailable in prod
    let userId = session?.user?.id as string | undefined
    let userRole = session?.user?.role as string | undefined
    if (!userRole || !userId) {
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
      userRole = (token as any)?.role
      userId = (token as any)?.id
    }

    if (!userRole || userRole !== 'STUDENT' || !userId) {
      return NextResponse.json({ error: 'Unauthorized. Only students can access this endpoint.' }, { status: 401 })
    }

    // Get student's enrolled courses with progress
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: userId
      },
      include: {
        Course: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            CourseProgress: {
              where: {
                studentId: userId
              }
            }
          }
        }
      },
      orderBy: {
        enrolledAt: 'desc'
      }
    })

    const courses = enrollments.map(enrollment => {
      const progress = enrollment.Course.CourseProgress[0];
      return {
        ...enrollment.Course,
        progress: progress ? progress.progressPercent : 0,
        lastAccessed: progress ? progress.lastAccessedAt : null,
        nextClass: "Today, 2:00 PM" // Mock data - would come from actual schedule
      };
    });

    return NextResponse.json({ courses })

  } catch (error) {
    console.error('Error fetching student courses:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
