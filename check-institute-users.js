// Check which users are linked to institutes
require('dotenv').config();
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function checkInstituteUsers() {
  console.log('🔍 Checking Institute Assignments...\n');

  // Get all institutes
  const institutes = await prisma.institute.findMany({
    include: {
      Users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  console.log('📊 Institute User Summary:\n');
  
  for (const institute of institutes) {
    console.log(`🏢 ${institute.name} (@${institute.domain})`);
    console.log(`   Users: ${institute.Users.length}`);
    
    if (institute.Users.length > 0) {
      console.log('   Members:');
      institute.Users.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
      });
    } else {
      console.log('   ⚠️  No users assigned yet');
    }
    console.log('');
  }

  // Check users without institutes
  const unassignedUsers = await prisma.user.findMany({
    where: { instituteId: null },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (unassignedUsers.length > 0) {
    console.log('⚠️  Users without Institute Assignment:');
    unassignedUsers.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
    });
    console.log('');
  }

  console.log('💡 Tip: Users with @viit.ac.in emails will auto-assign to VIIT');
  console.log('💡 Tip: Users with @vit.edu emails will auto-assign to VIT\n');
}

checkInstituteUsers()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
