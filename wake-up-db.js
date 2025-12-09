// Database wake-up script for Neon
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error']
});

async function wakeUpDatabase() {
  console.log('🔄 Attempting to wake up Neon database...');
  console.log('📡 This may take 30-60 seconds for sleeping databases\n');
  
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`⏳ Attempt ${attempt}/5: Connecting...`);
      
      // Set a longer timeout for the first connection
      const connectionPromise = prisma.$connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 30000)
      );
      
      await Promise.race([connectionPromise, timeoutPromise]);
      
      console.log('✅ Connection established! Testing query...');
      
      // Simple query to fully wake up the database
      await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Database is now awake and responding!');
      
      return true;
      
    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt < 5) {
        console.log('⏳ Waiting 10 seconds before next attempt...\n');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }
  }
  
  console.log('\n❌ Failed to wake up database after 5 attempts');
  console.log('💡 Possible solutions:');
  console.log('1. Check Neon dashboard: https://console.neon.tech/');
  console.log('2. Verify your internet connection');
  console.log('3. Try restarting the Neon compute instance');
  console.log('4. Check if DATABASE_URL is correct');
  
  return false;
}

wakeUpDatabase()
  .then((success) => {
    if (success) {
      console.log('\n🎉 Database is ready! You can now run:');
      console.log('• npx prisma migrate dev');
      console.log('• npm run dev');
    }
  })
  .finally(() => {
    prisma.$disconnect();
  });