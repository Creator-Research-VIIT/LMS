import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * POST /api/payments/verify
 * Verify Razorpay payment and create enrollment
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification data' },
        { status: 400 }
      );
    }

    // Verify signature
    const isSignatureValid = verifyRazorpaySignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!isSignatureValid) {
      console.warn('❌ Invalid payment signature');
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    // Find the payment record
    const payment = await prisma.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verify payment belongs to current user
    if (payment.studentId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized: Payment does not belong to current user' },
        { status: 403 }
      );
    }

    // Update payment record
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'SUCCESS',
      },
    });

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        id: `${payment.studentId}_${payment.courseId}`,
        studentId: payment.studentId,
        courseId: payment.courseId,
        isPaid: true,
        paymentId: payment.id,
      },
    });

    // Create initial course progress record
    await prisma.courseProgress.upsert({
      where: {
        studentId_courseId: {
          studentId: payment.studentId,
          courseId: payment.courseId,
        },
      },
      update: {},
      create: {
        id: `${payment.studentId}_${payment.courseId}`,
        studentId: payment.studentId,
        courseId: payment.courseId,
        completedLessons: 0,
        totalLessons: 0,
        progressPercent: 0,
        updatedAt: new Date(),
      },
    });

    console.log('✅ Payment verified and enrollment created:', {
      paymentId: payment.id,
      enrollmentId: enrollment.id,
      courseId: payment.courseId,
      studentId: payment.studentId,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      enrollment,
      payment: updatedPayment,
    });
  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    
    // Update payment status to FAILED if it was pending
    if (error instanceof Error) {
      const orderIdMatch = error.message.match(/razorpayOrderId: (.+?)\s/);
      if (orderIdMatch) {
        await prisma.payment.updateMany({
          where: { razorpayOrderId: orderIdMatch[1] },
          data: { status: 'FAILED' },
        });
      }
    }

    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
