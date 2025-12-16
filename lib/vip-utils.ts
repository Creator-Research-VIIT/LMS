/**
 * VIP Status Management Utility
 * Handles automatic VIP upgrades for students who complete 100+ courses
 */

import { prisma } from './prisma';

const VIP_THRESHOLD = 100; // Number of completed courses required for VIP status

/**
 * Check if a student qualifies for VIP status and upgrade if needed
 * @param studentId - The ID of the student to check
 * @returns Updated user object if upgraded, null otherwise
 */
export async function checkAndUpgradeVIPStatus(studentId: string) {
  try {
    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: studentId },
      select: { 
        id: true, 
        role: true, 
        isVIP: true,
        vipGrantedAt: true 
      }
    });

    // Only students can be VIP
    if (!user || user.role !== 'STUDENT') {
      return null;
    }

    // If already VIP, no need to check
    if (user.isVIP) {
      return null;
    }

    // Count completed courses (100% progress)
    const completedCoursesCount = await prisma.courseProgress.count({
      where: {
        studentId: studentId,
        progressPercent: 100,
        completedAt: { not: null }
      }
    });

    console.log(`Student ${studentId} has completed ${completedCoursesCount} courses`);

    // Check if student qualifies for VIP
    if (completedCoursesCount >= VIP_THRESHOLD) {
      const updatedUser = await prisma.user.update({
        where: { id: studentId },
        data: {
          isVIP: true,
          vipGrantedAt: new Date()
        }
      });

      console.log(`🎉 Student ${studentId} upgraded to VIP status!`);

      // Create a special VIP award if awards system is available
      try {
        const vipAward = await prisma.award.findFirst({
          where: { name: 'VIP Elite Member' }
        });

        if (vipAward) {
          await prisma.userAward.create({
            data: {
              userId: studentId,
              awardId: vipAward.id
            }
          });
        }
      } catch (error) {
        console.log('VIP award not created:', error);
      }

      return updatedUser;
    }

    return null;
  } catch (error) {
    console.error('Error checking VIP status:', error);
    return null;
  }
}

/**
 * Check if a student has VIP status
 * @param studentId - The ID of the student to check
 * @returns boolean indicating VIP status
 */
export async function isVIPStudent(studentId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: studentId },
      select: { isVIP: true }
    });

    return user?.isVIP || false;
  } catch (error) {
    console.error('Error checking VIP status:', error);
    return false;
  }
}

/**
 * Get VIP student statistics
 * @returns Object with VIP stats
 */
export async function getVIPStats() {
  try {
    const totalVIPs = await prisma.user.count({
      where: { 
        role: 'STUDENT',
        isVIP: true 
      }
    });

    const recentVIPs = await prisma.user.findMany({
      where: { 
        role: 'STUDENT',
        isVIP: true,
        vipGrantedAt: { not: null }
      },
      orderBy: { vipGrantedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        vipGrantedAt: true
      }
    });

    return {
      totalVIPs,
      recentVIPs,
      threshold: VIP_THRESHOLD
    };
  } catch (error) {
    console.error('Error getting VIP stats:', error);
    return { totalVIPs: 0, recentVIPs: [], threshold: VIP_THRESHOLD };
  }
}

/**
 * Get student's progress towards VIP status
 * @param studentId - The ID of the student
 * @returns Progress object
 */
export async function getVIPProgress(studentId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: studentId },
      select: { isVIP: true, vipGrantedAt: true }
    });

    if (!user) {
      return null;
    }

    if (user.isVIP) {
      return {
        isVIP: true,
        completedCourses: VIP_THRESHOLD,
        remaining: 0,
        percentage: 100,
        grantedAt: user.vipGrantedAt
      };
    }

    const completedCourses = await prisma.courseProgress.count({
      where: {
        studentId: studentId,
        progressPercent: 100,
        completedAt: { not: null }
      }
    });

    return {
      isVIP: false,
      completedCourses,
      remaining: Math.max(0, VIP_THRESHOLD - completedCourses),
      percentage: Math.min(100, (completedCourses / VIP_THRESHOLD) * 100),
      grantedAt: null
    };
  } catch (error) {
    console.error('Error getting VIP progress:', error);
    return null;
  }
}
