// Quick test to verify Prisma client is working
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing Prisma connection...');
    await prisma.$connect();
    console.log('✅ Prisma connected successfully!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Database query successful! Found ${userCount} users.`);
    
    console.log('\n🎉 Prisma is working correctly with version 6.1.0!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
