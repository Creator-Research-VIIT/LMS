import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get total statistics
    const [
      totalStudents,
      approvedCourses,
      pendingTeachers
    ] = await Promise.all([
      prisma.user.count({
        where: { role: 'STUDENT' }
      }),
      prisma.course.count({
        where: { approvalStatus: 'approved' }
      }),
      prisma.user.count({
        where: { 
          role: 'TEACHER',
          approvalStatus: 'pending'
        }
      })
    ]);

    // Calculate total revenue (simplified - sum all course prices * enrollments)
    const enrollmentsWithCourses = await prisma.enrollment.findMany({
      include: {
        course: {
          select: {
            price: true
          }
        }
      }
    });
    
    const totalRevenue = enrollmentsWithCourses.reduce((sum, enrollment) => {
      return sum + enrollment.course.price;
    }, 0);

    // Get recent courses with teacher info
    const recentCourses = await prisma.course.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        User: {
          select: {
            name: true,
            email: true
          }
        },
        enrollments: true,
        _count: {
          select: {
            enrollments: true,
            feedbacks: true
          }
        }
      }
    });

    // Calculate completion rate
    const totalProgressEntries = await prisma.courseProgress.count();
    const completedProgressEntries = await prisma.courseProgress.count({
      where: { completed: true }
    });
    
    const completionRate = totalProgressEntries > 0 
      ? (completedProgressEntries / totalProgressEntries) * 100 
      : 87.3; // Default value if no progress data

    // Format course data for frontend
    const formattedCourses = recentCourses.map(course => ({
      id: course.id,
      title: course.title,
      instructor: course.User.name,
      category: 'Programming', // You might want to add a category field to your schema
      rating: 4.5, // You'd calculate this from feedbacks
      students: course._count.enrollments,
      price: course.price,
      originalPrice: course.price * 1.5, // Mock original price
      duration: '12 weeks', // You might want to add duration to schema
      image: course.thumbnail || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      type: 'internal',
      status: course.approvalStatus,
      isPopular: course._count.enrollments > 50,
      isNew: new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }));

    const stats = {
      totalStudents,
      activeCourses: approvedCourses,
      monthlyRevenue: totalRevenue,
      completionRate: Math.round(completionRate * 10) / 10,
      pendingTeachers
    };

    const announcements = [
      {
        id: '1',
        title: 'System Update',
        message: 'Platform maintenance scheduled for this weekend.',
        date: new Date().toLocaleDateString(),
        type: 'info',
        priority: 'medium'
      },
      {
        id: '2',
        title: 'New Features',
        message: 'Course progress tracking has been enhanced.',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(),
        type: 'success',
        priority: 'low'
      }
    ];

    return NextResponse.json({
      stats,
      courses: formattedCourses,
      announcements
    });

  } catch (error) {
    console.error('Error fetching institute data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch institute data' },
      { status: 500 }
    );
  }
}