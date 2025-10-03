import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const userId = session.user.id;

    // Get total enrolled courses
    const totalCourses = await prisma.enrollment.count({
      where: { studentId: userId }
    });

    // Get assignments due this week (mock data for now)
    const assignmentsDue = 3; // This would come from an assignments table when implemented

    // Get study hours this week (mock data)
    const studyHours = 24; // This would come from activity tracking when implemented

    // Get average grade (mock calculation)
    const averageGrade = 'A-'; // This would be calculated from actual submissions

    return NextResponse.json({
      totalCourses,
      assignmentsDue,
      studyHours,
      averageGrade,
      trends: {
        courses: '+2 from last semester',
        assignments: '2 due this week',
        hours: 'This week',
        grade: '+0.2 from last month'
      }
    });

  } catch (error) {
    console.error('Error fetching student stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}