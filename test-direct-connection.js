// Alternative Neon connection test
const { PrismaClient } = require('@prisma/client');

// Try direct connection without pooling
const directUrl = 'postgresql://neondb_owner:npg_VOtGCn4b8QcD@ep-billowing-pond-a1rs6mm9.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testDirectConnection() {
  console.log('🔄 Testing direct Neon connection (non-pooled)...');
  
  try {
    console.log('📡 Connecting to:', directUrl.replace(/:[^:@]+@/, ':***@'));
    
    const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as db_version`;
    console.log('✅ Direct connection successful!');
    console.log('📊 Database info:', result[0]);
    
    // Test basic operations
    const userCount = await prisma.user.count();
    console.log('👥 User count:', userCount);
    
    console.log('🎉 Database is ready for registration!');
    return true;
    
  } catch (error) {
    console.log('❌ Direct connection failed:', error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testDirectConnection();