import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/progress/modules/:courseId
// Returns list of completed moduleIds for the current student and aggregate progress
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  const studentId = (session.user as any).id as string
  const { courseId } = await context.params

    // Verify enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: `${studentId}_${courseId}` },
    }).catch(async () => {
      // Fallback if no composite id: check via findFirst
      return prisma.enrollment.findFirst({ where: { studentId, courseId } })
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in this course' }, { status: 403 })
    }

    // Fetch all modules count for the course
    const totalModules = await prisma.module.count({ where: { courseId } })

    // Fetch completed module IDs
    const completed = await prisma.moduleProgress.findMany({
      where: { studentId, courseId, completed: true },
      select: { moduleId: true }
    })

    // Ensure CourseProgress row exists and keep aggregate in sync
    const completedCount = completed.length
    const progressPercent = totalModules > 0 ? (completedCount / totalModules) * 100 : 0

    await prisma.courseProgress.upsert({
      where: { studentId_courseId: { studentId, courseId } },
      update: {
        completedLessons: completedCount,
        totalLessons: totalModules,
        progressPercent,
        updatedAt: new Date(),
      },
      create: {
        id: `${studentId}_${courseId}`,
        studentId,
        courseId,
        completedLessons: completedCount,
        totalLessons: totalModules,
        progressPercent,
        updatedAt: new Date(),
      }
    })

    return NextResponse.json({
      completedModuleIds: completed.map(c => c.moduleId),
      totalModules,
      completedCount,
      progressPercent,
    })
  } catch (error) {
    console.error('GET /api/progress/modules error', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
