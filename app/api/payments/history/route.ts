import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * GET /api/payments/history
 * Get payment history for current student
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const studentId = session.user.id;

    // Get all payments for the student
    const payments = await prisma.payment.findMany({
      where: { studentId },
      include: {
        Course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      payments: payments.map((payment) => ({
        id: payment.id,
        courseId: payment.courseId,
        courseName: payment.Course.title,
        courseThumbnail: payment.Course.thumbnail,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        razorpayPaymentId: payment.razorpayPaymentId,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      })),
    });
  } catch (error) {
    console.error('❌ Error fetching payment history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    );
  }
}
