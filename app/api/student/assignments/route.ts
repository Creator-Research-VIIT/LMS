import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('✏️ Student assignments API called:', {
      hasSession: !!session,
      hasUserId: !!session?.user?.id,
      userEmail: session?.user?.email,
      timestamp: new Date().toISOString()
    });
    
    if (!session?.user?.id) {
      console.warn('⚠️ Student assignments API: No user ID in session');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // For now, we'll return mock assignment data since assignments table doesn't exist yet
    const assignments = [
      {
        id: '1',
        title: 'Math Problem Set 5',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        priority: 'high',
        course: 'Advanced Mathematics'
      },
      {
        id: '2',
        title: 'CS Project Proposal',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        priority: 'medium',
        course: 'Computer Science Fundamentals'
      },
      {
        id: '3',
        title: 'Physics Lab Report',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        priority: 'high',
        course: 'Physics Laboratory'
      }
    ];

    return NextResponse.json({ assignments });

  } catch (error) {
    console.error('Error fetching student assignments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}