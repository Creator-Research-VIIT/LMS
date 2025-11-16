'use server'

import { authOptions } from '@/lib/auth'
import { checkAndAwardBadges, countCompletedCourses } from '@/lib/awards'
import { getServerSession } from 'next-auth'

export async function triggerAwardCheck() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    const userId = session.user.id

    // Check and award badges
    const newAward = await checkAndAwardBadges(userId)

    // Get current course completion count
    const completedCount = await countCompletedCourses(userId)

    return {
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
    }
  } catch (error) {
    console.error('❌ Error in award trigger:', error)
    return {
      success: false,
      error: 'Failed to process award',
    }
  }
}
