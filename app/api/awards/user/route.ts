import { authOptions } from '@/lib/auth';
import { countCompletedCourses, getUserAwards } from '@/lib/awards';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * GET /api/awards/user
 * Get all awards earned by current user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user's awards
    const userAwards = await getUserAwards(userId);

    // Get completed course count
    const completedCourses = await countCompletedCourses(userId);

    return NextResponse.json({
      success: true,
      awards: userAwards,
      completedCourses,
    });
  } catch (error) {
    console.error('❌ Error fetching user awards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 }
    );
  }
}
