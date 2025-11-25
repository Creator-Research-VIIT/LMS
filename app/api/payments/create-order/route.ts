import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createRazorpayOrder } from '@/lib/razorpay';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * POST /api/payments/create-order
 * Create a Razorpay order for course enrollment
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const studentId = session.user.id;

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { studentId, courseId },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // For free courses, create enrollment directly
    if (course.isFree || course.price === 0) {
      const enrollment = await prisma.enrollment.create({
        data: {
          id: `${studentId}_${courseId}`,
          studentId,
          courseId,
          isPaid: true,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Enrolled successfully in free course',
        enrollment,
        isFree: true,
      });
    }

    // For paid courses, create Razorpay order
    const amount = Math.round(course.price * 100); // Convert to paise

    const razorpayOrder = await createRazorpayOrder({
      amount,
      currency: 'INR',
      receipt: `receipt_${studentId}_${courseId}_${Date.now()}`,
      notes: {
        courseId,
        studentId,
        courseName: course.title,
      },
    });

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        studentId,
        courseId,
        amount: course.price,
        currency: 'INR',
        razorpayOrderId: razorpayOrder.id,
        status: 'PENDING',
      },
    });

    console.log('✅ Razorpay order created:', {
      orderId: razorpayOrder.id,
      paymentId: payment.id,
      amount: course.price,
      courseId,
      studentId,
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      paymentId: payment.id,
      amount: course.price,
      currency: 'INR',
      courseName: course.title,
      studentEmail: session.user.email,
      studentName: session.user.name,
    });
  } catch (error) {
    console.error('❌ Error creating payment order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
