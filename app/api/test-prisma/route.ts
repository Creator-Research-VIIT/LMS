import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test basic prisma connection
    console.log('🔍 Testing Prisma client...');
    
    // Test user count
    const userCount = await prisma.user.count();
    console.log('� User count:', userCount);
    
    // Test if emailVerification model is available
    const canAccessEmailVerification = typeof prisma.emailVerification !== 'undefined';
    console.log('� EmailVerification available:', canAccessEmailVerification);
    
    return NextResponse.json({
      success: true,
      message: 'Prisma client test successful',
      userCount,
      emailVerificationAvailable: canAccessEmailVerification
    });
  } catch (error) {
    console.error('❌ Prisma test error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorType = error instanceof Error ? error.constructor.name : typeof error;
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        type: errorType 
      },
      { status: 500 }
    );
  }
}