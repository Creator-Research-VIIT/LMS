import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // For now, we'll return mock notification data since notifications table doesn't exist yet
    const notifications = [
      {
        id: '1',
        title: 'New assignment posted in Advanced Mathematics',
        content: 'Math Problem Set 5 has been assigned. Due in 2 days.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        type: 'assignment',
        read: false
      },
      {
        id: '2',
        title: 'Course material updated',
        content: 'New lecture notes available for Computer Science Fundamentals.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        type: 'update',
        read: false
      },
      {
        id: '3',
        title: 'Quiz results published',
        content: 'Your results for Quiz #3 are now available.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        type: 'grade',
        read: true
      }
    ];

    return NextResponse.json({ notifications });

  } catch (error) {
    console.error('Error fetching student notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}