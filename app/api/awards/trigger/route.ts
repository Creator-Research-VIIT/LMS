import { authOptions } from '@/lib/auth';
import { checkAndAwardBadges, countCompletedCourses } from '@/lib/awards';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

/**
 * POST /api/awards/trigger
 * Check if user has completed a course and award badges if milestone reached
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Check and award badges
    const newAward = await checkAndAwardBadges(userId);

    // Get current course completion count
    const completedCount = await countCompletedCourses(userId);

    return NextResponse.json({
      success: true,
      completedCourses: completedCount,
      newAward: newAward
        ? {
            id: newAward.id,
            awardId: newAward.awardId,
            achievedAt: newAward.achievedAt,
            award: {
              id: newAward.Award.id,
              name: newAward.Award.name,
              description: newAward.Award.description,
              icon: newAward.Award.icon,
              milestone: newAward.Award.milestone,
              color: newAward.Award.color,
            },
          }
        : null,
    });
  } catch (error) {
    console.error('❌ Error in award trigger:', error);
    return NextResponse.json(
      { error: 'Failed to process award' },
      { status: 500 }
    );
  }
}
