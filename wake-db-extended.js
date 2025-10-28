// Extended database wake-up script
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function wakeUpDatabase() {
  console.log('🔄 Attempting to wake up Neon database...');
  console.log('⏱️  This may take 1-2 minutes for sleeping databases');
  
  const maxRetries = 10;
  const retryDelay = 15000; // 15 seconds
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`\n⏳ Attempt ${attempt}/${maxRetries}: Testing connection...`);
      
      // Set a longer timeout for this query
      const startTime = Date.now();
      const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
      const duration = Date.now() - startTime;
      
      console.log('✅ Database is awake and responsive!');
      console.log(`📊 Connection time: ${duration}ms`);
      console.log('🏁 Database ready for queries');
      
      // Test user count to make sure everything is working
      const userCount = await prisma.user.count();
      console.log(`👥 User count: ${userCount}`);
      
      return true;
      
    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        console.log('\n🚨 All attempts failed. Database may be permanently down.');
        console.log('💡 Try checking your Neon dashboard: https://console.neon.tech/');
        return false;
      }
      
      console.log(`⏳ Waiting ${retryDelay/1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

wakeUpDatabase()
  .then((success) => {
    if (success) {
      console.log('\n🎉 Database is ready for registration!');
    }
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('\n💥 Critical error:', error);
    process.exit(1);
  });