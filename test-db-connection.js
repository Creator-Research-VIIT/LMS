// Simple database connectivity test
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Simple query to test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    console.log('🔍 Testing database query...');
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful! Found ${userCount} users in database.`);
    
    console.log('🎉 Database is working properly!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.code === 'P1001') {
      console.log('\n💡 Possible solutions:');
      console.log('1. Database might be sleeping (Neon free tier) - try again in a moment');
      console.log('2. Check your internet connection');
      console.log('3. Verify DATABASE_URL in .env file');
      console.log('4. The database server might be temporarily unavailable');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();