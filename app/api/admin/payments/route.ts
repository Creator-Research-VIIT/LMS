import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

/**
 * GET /api/admin/payments
 * Fetch all payments with user and course info
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const skip = Number.parseInt(searchParams.get('skip') || '0')
    const take = Number.parseInt(searchParams.get('take') || '10')

    const payments = await prisma.payment.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const totalPayments = await prisma.payment.count()

    return NextResponse.json({
      success: true,
      data: payments.map(payment => ({
        id: payment.id,
        userId: payment.studentId,
        userName: payment.User.name,
        userEmail: payment.User.email,
        courseId: payment.courseId,
        courseTitle: payment.Course.title,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        createdAt: payment.createdAt,
      })),
      pagination: {
        total: totalPayments,
        skip,
        take,
      },
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}
