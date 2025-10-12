// Quick database connectivity test with shorter timeout
const { PrismaClient } = require('@prisma/client');

async function quickTest() {
  const startTime = Date.now();
  
  try {
    console.log('🔍 Quick connection test (10 second timeout)...');
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL + '&connect_timeout=10'
        }
      }
    });
    
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('10 second timeout reached')), 10000)
    );
    
    const connectPromise = prisma.$connect().then(() => prisma);
    
    const connectedPrisma = await Promise.race([connectPromise, timeoutPromise]);
    
    console.log('✅ Connected! Testing basic query...');
    await connectedPrisma.$queryRaw`SELECT version()`;
    console.log('✅ Database is responding!');
    
    await connectedPrisma.$disconnect();
    
  } catch (error) {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    console.log(`❌ Failed after ${elapsed} seconds: ${error.message}`);
    
    if (error.message.includes('timeout') || error.code === 'P1001') {
      console.log('\n💡 Database is likely sleeping. Options:');
      console.log('1. Wait a few minutes and try again');
      console.log('2. Check Neon dashboard: https://console.neon.tech/');
      console.log('3. The long wake-up script may still be working');
    }
  }
}

quickTest();