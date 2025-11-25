import { prisma } from '@/lib/prisma';

export interface AwardConfig {
  name: string;
  description: string;
  icon: string;
  milestone: number;
  color: string;
}

// Award definitions
export const AWARDS: AwardConfig[] = [
  {
    name: 'Rising Scholar',
    description: 'Completed 10 courses',
    icon: '📚',
    milestone: 10,
    color: 'blue',
  },
  {
    name: 'Silver Scholar',
    description: 'Completed 25 courses',
    icon: '🥈',
    milestone: 25,
    color: 'silver',
  },
  {
    name: 'Elite Learner',
    description: 'Completed 50 courses',
    icon: '🏆',
    milestone: 50,
    color: 'gold',
  },
  {
    name: 'LMS Hall of Fame',
    description: 'Completed 100 courses',
    icon: '👑',
    milestone: 100,
    color: 'platinum',
  },
];

/**
 * Get or create awards in database
 */
export async function initializeAwards() {
  try {
    for (const award of AWARDS) {
      await prisma.award.upsert({
        where: { name: award.name },
        update: {},
        create: {
          name: award.name,
          description: award.description,
          icon: award.icon,
          milestone: award.milestone,
          color: award.color,
        },
      });
    }
    console.log('✅ Awards initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing awards:', error);
  }
}

/**
 * Count completed courses for a user
 */
export async function countCompletedCourses(userId: string): Promise<number> {
  try {
    const completedCourses = await prisma.courseProgress.count({
      where: {
        studentId: userId,
        completedAt: { not: null }, // Only count fully completed courses
      },
    });
    return completedCourses;
  } catch (error) {
    console.error('❌ Error counting completed courses:', error);
    return 0;
  }
}

/**
 * Get the next award milestone for a user
 */
export async function getNextAwardMilestone(userId: string): Promise<AwardConfig | null> {
  try {
    const completedCount = await countCompletedCourses(userId);
    
    // Find the first award that the user hasn't achieved yet
    const nextAward = AWARDS.find(award => award.milestone > completedCount);
    
    return nextAward || null;
  } catch (error) {
    console.error('❌ Error getting next award milestone:', error);
    return null;
  }
}

/**
 * Get all awards earned by user
 */
export async function getUserAwards(userId: string) {
  try {
    const userAwards = await prisma.userAward.findMany({
      where: { userId },
      include: {
        Award: true,
      },
      orderBy: { achievedAt: 'asc' },
    });
    return userAwards;
  } catch (error) {
    console.error('❌ Error fetching user awards:', error);
    return [];
  }
}

/**
 * Check and award badges to user if they've reached a milestone
 * Returns the newly awarded badge if any, or null
 */
export async function checkAndAwardBadges(userId: string): Promise<{ id: string; userId: string; awardId: string; achievedAt: Date; Award: { id: string; name: string; description: string; icon: string; milestone: number; color: string } } | null> {
  try {
    // Count completed courses
    const completedCount = await countCompletedCourses(userId);
    
    // Find awards that should be assigned
    const awardToAssign = AWARDS.find(award => award.milestone === completedCount);
    
    if (!awardToAssign) {
      console.log(`ℹ️ User ${userId} has ${completedCount} completed courses, no award milestone reached`);
      return null;
    }

    // Get the award from database
    const award = await prisma.award.findUnique({
      where: { name: awardToAssign.name },
    });

    if (!award) {
      console.error(`❌ Award not found: ${awardToAssign.name}`);
      return null;
    }

    // Check if user already has this award
    const existingAward = await prisma.userAward.findUnique({
      where: {
        userId_awardId: {
          userId,
          awardId: award.id,
        },
      },
    });

    if (existingAward) {
      console.log(`ℹ️ User ${userId} already has award: ${award.name}`);
      return null;
    }

    // Create the award entry
    const userAward = await prisma.userAward.create({
      data: {
        userId,
        awardId: award.id,
      },
      include: {
        Award: true,
      },
    });

    console.log('✅ Award assigned:', {
      userId,
      awardName: award.name,
      milestone: award.milestone,
    });

    return userAward;
  } catch (error) {
    console.error('❌ Error checking and awarding badges:', error);
    return null;
  }
}
