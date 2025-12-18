// Auto-assign existing users to institutes based on email domain
require('dotenv').config();
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function assignUsersToInstitutes() {
  console.log('🔄 Auto-assigning users to institutes based on email domains...\n');

  // Get all institutes
  const institutes = await prisma.institute.findMany();
  
  let updatedCount = 0;

  for (const institute of institutes) {
    console.log(`🏢 Processing ${institute.name} (@${institute.domain})`);
    
    // Find users with matching email domain but no institute assigned
    const matchingUsers = await prisma.user.findMany({
      where: {
        email: {
          endsWith: `@${institute.domain}`,
        },
        instituteId: null, // Only update unassigned users
      },
    });

    if (matchingUsers.length === 0) {
      console.log(`   ✓ No unassigned users found for @${institute.domain}\n`);
      continue;
    }

    console.log(`   Found ${matchingUsers.length} user(s) to assign:`);
    
    for (const user of matchingUsers) {
      await prisma.user.update({
        where: { id: user.id },
        data: { instituteId: institute.id },
      });
      
      console.log(`   ✅ Assigned: ${user.name} (${user.email})`);
      updatedCount++;
    }
    console.log('');
  }

  console.log(`\n✨ Assignment complete! Updated ${updatedCount} user(s)\n`);

  // Show final summary
  console.log('📊 Final Institute Summary:\n');
  
  const finalInstitutes = await prisma.institute.findMany({
    include: {
      Users: {
        select: {
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  for (const institute of finalInstitutes) {
    console.log(`🏢 ${institute.name} (@${institute.domain})`);
    console.log(`   Total Users: ${institute.Users.length}`);
    
    if (institute.Users.length > 0) {
      institute.Users.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
      });
    }
    console.log('');
  }
}

assignUsersToInstitutes()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
