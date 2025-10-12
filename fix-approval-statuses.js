const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixApprovalStatuses() {
  console.log('🔧 Fixing approval statuses in database...');

  try {
    // Update users with APPROVED to approved
    const updatedUsers = await prisma.user.updateMany({
      where: {
        approvalStatus: 'APPROVED'
      },
      data: {
        approvalStatus: 'approved'
      }
    });

    console.log(`✅ Updated ${updatedUsers.count} users from APPROVED to approved`);

    // Update users with PENDING to pending
    const updatedPendingUsers = await prisma.user.updateMany({
      where: {
        approvalStatus: 'PENDING'
      },
      data: {
        approvalStatus: 'pending'
      }
    });

    console.log(`✅ Updated ${updatedPendingUsers.count} users from PENDING to pending`);

    // Update courses with APPROVED to approved
    const updatedCourses = await prisma.course.updateMany({
      where: {
        approvalStatus: 'APPROVED'
      },
      data: {
        approvalStatus: 'approved'
      }
    });

    console.log(`✅ Updated ${updatedCourses.count} courses from APPROVED to approved`);

    // Update courses with PENDING to pending
    const updatedPendingCourses = await prisma.course.updateMany({
      where: {
        approvalStatus: 'PENDING'
      },
      data: {
        approvalStatus: 'pending'
      }
    });

    console.log(`✅ Updated ${updatedPendingCourses.count} courses from PENDING to pending`);

    // Verify the changes
    console.log('\n📊 Current approval statuses:');
    
    const userStatuses = await prisma.user.groupBy({
      by: ['approvalStatus'],
      _count: true
    });
    
    console.log('👥 Users:');
    userStatuses.forEach(status => {
      console.log(`  ${status.approvalStatus}: ${status._count} users`);
    });

    const courseStatuses = await prisma.course.groupBy({
      by: ['approvalStatus'],
      _count: true
    });

    console.log('📚 Courses:');
    courseStatuses.forEach(status => {
      console.log(`  ${status.approvalStatus}: ${status._count} courses`);
    });

    console.log('\n🎉 Approval statuses fixed successfully!');
    console.log('\n✅ You can now login with:');
    console.log('Teacher: teacher@lms.com / password123');
    console.log('Admin: admin@lms.com / password123');
    console.log('Student: student@lms.com / password123');

  } catch (error) {
    console.error('❌ Error fixing approval statuses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixApprovalStatuses();