import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  moduleId: z.string().min(1),
  completed: z.boolean().optional(), // if omitted, toggle
})

// POST /api/progress/modules/toggle
// Body: { moduleId, completed? }
// Toggles or sets completion for the calling student on a module and returns updated aggregate progress
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const studentId = (session.user as any).id as string

    const json = await req.json().catch(() => null)
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request', issues: parsed.error.issues }, { status: 400 })
    }
    const { moduleId, completed } = parsed.data

    // Fetch module & course
    const module = await prisma.module.findUnique({ where: { id: moduleId } })
    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }
    const courseId = module.courseId

    // Verify enrollment
    const enrollment = await prisma.enrollment.findFirst({ where: { studentId, courseId } })
    if (!enrollment) {
      return NextResponse.json({ error: 'Not enrolled in course' }, { status: 403 })
    }

    // Existing progress record for this module
    const existing = await prisma.moduleProgress.findUnique({
      where: { studentId_moduleId: { studentId, moduleId } }
    })

    let newCompletedState = completed
    if (newCompletedState === undefined) {
      newCompletedState = existing ? !existing.completed : true
    }

    if (existing) {
      await prisma.moduleProgress.update({
        where: { studentId_moduleId: { studentId, moduleId } },
        data: {
          completed: newCompletedState,
          completedAt: newCompletedState ? new Date() : null
        }
      })
    } else {
      await prisma.moduleProgress.create({
        data: {
          studentId,
          courseId,
          moduleId,
          completed: newCompletedState,
          completedAt: newCompletedState ? new Date() : null
        }
      })
    }

    // Recompute aggregates
    const totalModules = await prisma.module.count({ where: { courseId } })
    const completedModules = await prisma.moduleProgress.count({ where: { studentId, courseId, completed: true } })
    const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0

    const courseProgress = await prisma.courseProgress.upsert({
      where: { studentId_courseId: { studentId, courseId } },
      update: {
        completedLessons: completedModules,
        totalLessons: totalModules,
        progressPercent,
        updatedAt: new Date()
      },
      create: {
        id: `${studentId}_${courseId}`,
        studentId,
        courseId,
        completedLessons: completedModules,
        totalLessons: totalModules,
        progressPercent,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      moduleId,
      completed: newCompletedState,
      aggregate: {
        completedModules,
        totalModules,
        progressPercent,
        courseProgressId: courseProgress.id
      }
    })
  } catch (error) {
    console.error('POST /api/progress/modules/toggle error', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
