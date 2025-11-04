import { prisma } from '@/lib/prisma';

/**
 * Wake up the Neon database if it's sleeping
 * Neon free tier auto-suspends after 5 minutes of inactivity
 */
export async function wakeUpDatabase(): Promise<boolean> {
  try {
    console.log('🔄 Waking up database...');
    
    // Simple query to wake up the database
    await prisma.$queryRaw`SELECT NOW()`;
    
    console.log('✅ Database is awake and connected');
    return true;
  } catch (error) {
    console.error('❌ Failed to wake up database:', error);
    
    // Try to reconnect
    try {
      await prisma.$disconnect();
      await prisma.$connect();
      await prisma.$queryRaw`SELECT NOW()`;
      console.log('✅ Database reconnected successfully');
      return true;
    } catch (reconnectError) {
      console.error('❌ Database reconnection failed:', reconnectError);
      return false;
    }
  }
}

/**
 * Ensure database connection before operations
 */
export async function ensureDbConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.log('Database seems disconnected, attempting to wake up...');
    return await wakeUpDatabase();
  }
}

/**
 * Keep database alive by sending periodic heartbeats
 * Call this in your API routes or pages that need database access
 */
export async function keepAlive() {
  try {
    await prisma.$queryRaw`SELECT 'keepalive'`;
  } catch (error) {
    console.log('Keep alive failed, attempting reconnection...');
    await wakeUpDatabase();
  }
}
