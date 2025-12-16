/**
 * Initialize VIP Elite Member Award
 * Run this to create the special VIP award in the database
 */

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function initializeVIPAward() {
  try {
    console.log('🏆 Initializing VIP Elite Member Award...\n');

    // Check if VIP award already exists
    const existingAward = await prisma.award.findFirst({
      where: { name: 'VIP Elite Member' }
    });

    if (existingAward) {
      console.log('✅ VIP Elite Member award already exists!');
      console.log(`   ID: ${existingAward.id}`);
      console.log(`   Name: ${existingAward.name}`);
      return;
    }

    // Create VIP award
    const vipAward = await prisma.award.create({
      data: {
        id: 'award_vip_elite',
        name: 'VIP Elite Member',
        description: 'Awarded to exceptional students who have completed 100 or more courses. Grants lifetime free access to all courses on the platform!',
        icon: '👑',
        milestone: 100,
        color: 'platinum',
        createdAt: new Date()
      }
    });

    console.log('✅ VIP Elite Member award created successfully!');
    console.log(`   ID: ${vipAward.id}`);
    console.log(`   Name: ${vipAward.name}`);
    console.log(`   Icon: ${vipAward.icon}`);
    console.log(`   Milestone: ${vipAward.milestone} courses\n`);

    // Check how many users should already be VIP
    const usersWithManyCompletions = await prisma.$queryRaw`
      SELECT u.id, u.name, u.email, u."isVIP", COUNT(cp.id) as completed_count
      FROM "User" u
      LEFT JOIN "CourseProgress" cp ON u.id = cp."studentId" 
        AND cp."progressPercent" = 100 
        AND cp."completedAt" IS NOT NULL
      WHERE u.role = 'STUDENT'
      GROUP BY u.id
      HAVING COUNT(cp.id) >= 100
    `;

    if (usersWithManyCompletions.length > 0) {
      console.log(`\n📊 Found ${usersWithManyCompletions.length} student(s) who should be VIP:\n`);
      
      for (const user of usersWithManyCompletions) {
        console.log(`   ${user.name} (${user.email})`);
        console.log(`   Completed: ${user.completed_count} courses`);
        console.log(`   Current VIP Status: ${user.isVIP ? '✅ Yes' : '❌ No'}\n`);
        
        if (!user.isVIP) {
          // Upgrade to VIP
          await prisma.user.update({
            where: { id: user.id },
            data: {
              isVIP: true,
              vipGrantedAt: new Date()
            }
          });
          
          // Grant VIP award
          await prisma.userAward.create({
            data: {
              userId: user.id,
              awardId: vipAward.id
            }
          }).catch(() => {}); // Ignore if already exists
          
          console.log(`   ✅ Upgraded ${user.name} to VIP status!`);
        }
      }
    } else {
      console.log('\n📊 No students currently qualify for VIP status (need 100+ completed courses)');
    }

    console.log('\n🎉 VIP system initialization complete!\n');

  } catch (error) {
    console.error('❌ Error initializing VIP award:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeVIPAward();
