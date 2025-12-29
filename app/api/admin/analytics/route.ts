import { authOptions } from "@/lib/auth";
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';

/**
 * GET /api/admin/analytics
 * Fetch comprehensive analytics dashboard stats
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;

    // Only admins can access this endpoint
    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get total students
    const totalStudents = await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

    // Get total teachers (all statuses)
    const allTeachers = await prisma.user.findMany({
      where: {
        role: "TEACHER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        approvalStatus: true,
        createdAt: true,
        _count: {
          select: {
            teacherCourses: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalTeachers = allTeachers.length;
    const pendingTeachers = allTeachers.filter(t => t.approvalStatus === "pending").length;
    const approvedTeachers = allTeachers.filter(t => t.approvalStatus === "approved").length;
    const rejectedTeachers = allTeachers.filter(t => t.approvalStatus === "rejected").length;

    // Get total courses
    const totalCourses = await prisma.course.count();
    const approvedCourses = await prisma.course.count({
      where: {
        approvalStatus: "APPROVED",
      },
    });
    const pendingCourses = await prisma.course.count({
      where: {
        approvalStatus: "PENDING",
      },
    });

    // Get total institutes
    const totalInstitutes = await prisma.institute.count();

    // Get institutes with user counts
    const institutes = await prisma.institute.findMany({
      include: {
        _count: {
          select: {
            Users: true,
          },
        },
      },
    });

    // Calculate total revenue from successful payments
    const totalRevenueResult = await prisma.payment.aggregate({
      where: {
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
    });

    const totalRevenue = totalRevenueResult._sum.amount || 0;

    // Get total enrollments
    const totalEnrollments = await prisma.enrollment.count();

    // Get total certificates issued
    const totalCertificates = await prisma.certificate.count();

    // Get total feedbacks
    const totalFeedbacks = await prisma.feedback.count();

    // Calculate average rating
    const feedbacks = await prisma.feedback.findMany({
      select: {
        rating: true,
      },
    });

    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : "0.0";

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentStudents = await prisma.user.count({
      where: {
        role: "STUDENT",
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    const recentEnrollments = await prisma.enrollment.count({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    const recentRevenueResult = await prisma.payment.aggregate({
      where: {
        status: "SUCCESS",
        createdAt: { gte: thirtyDaysAgo },
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      success: true,
      // Student stats
      totalStudents,
      recentStudents,

      // Teacher stats
      totalTeachers,
      pendingTeachers,
      approvedTeachers,
      rejectedTeachers,
      teachers: allTeachers.map(t => ({
        id: t.id,
        name: t.name,
        email: t.email,
        approvalStatus: t.approvalStatus,
        coursesCount: t._count.teacherCourses,
        createdAt: t.createdAt,
      })),

      // Course stats
      totalCourses,
      approvedCourses,
      pendingCourses,

      // Institute stats
      totalInstitutes,
      institutes: institutes.map(inst => ({
        id: inst.id,
        name: inst.name,
        domain: inst.domain,
        userCount: inst._count.Users,
        createdAt: inst.createdAt,
      })),

      // Financial stats
      totalRevenue,
      recentRevenue: recentRevenueResult._sum.amount || 0,

      // Engagement stats
      totalEnrollments,
      recentEnrollments,
      totalCertificates,
      totalFeedbacks,
      avgRating,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
