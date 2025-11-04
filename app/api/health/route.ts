import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Simple health check query
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ 
      status: 'healthy', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    
    return NextResponse.json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Force reconnection by disconnecting and reconnecting
    await prisma.$disconnect();
    await prisma.$connect();
    
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ 
      status: 'reconnected', 
      database: 'connected',
      message: 'Database connection refreshed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database reconnection failed:', error);
    
    return NextResponse.json({ 
      status: 'failed', 
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
