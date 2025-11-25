import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * GET /api/admin/analytics
 * Fetch analytics dashboard stats
 */
export async function GET() {
  try {
    const [
      totalStudents,
      totalCourses,
      totalPayments,
      totalRevenue,
      activeUsers,
      enrollments,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: 'STUDENT',
        },
      }),
      prisma.course.count({
        where: {
          approvalStatus: 'approved',
        },
      }),
      prisma.payment.count({
        where: {
          status: 'SUCCESS',
        },
      }),
      prisma.payment.aggregate({
        where: {
          status: 'SUCCESS',
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.user.count({
        where: {
          role: 'STUDENT',
          Enrollment: {
            some: {},
          },
        },
      }),
      prisma.enrollment.count(),
    ])

    const monthlyRevenue = await prisma.payment.groupBy({
      by: ['createdAt'],
      where: {
        status: 'SUCCESS',
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 12,
    })

    return NextResponse.json({
      success: true,
      stats: {
        totalStudents,
        totalCourses,
        totalPayments,
        totalRevenue: totalRevenue._sum.amount || 0,
        activeUsers,
        totalEnrollments: enrollments,
      },
      monthlyRevenue: monthlyRevenue.map(item => ({
        date: item.createdAt,
        revenue: item._sum.amount || 0,
      })),
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
