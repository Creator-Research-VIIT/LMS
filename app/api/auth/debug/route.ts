import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔄 Debug login attempt for:', email);

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log('❌ User not found:', email);
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    // Check password
    const bcrypt = require('bcrypt');
    const isValid = await bcrypt.compare(password, user.password || '');

    if (!isValid) {
      console.log('❌ Invalid password for:', email);
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Check teacher approval
    if (user.role === 'TEACHER' && user.approvalStatus !== 'approved') {
      console.log('❌ Teacher not approved:', email);
      return NextResponse.json(
        { success: false, error: "Teacher account pending approval" },
        { status: 401 }
      );
    }

    console.log('✅ User validation successful:', {
      email: user.email,
      role: user.role,
      approvalStatus: user.approvalStatus
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        approvalStatus: user.approvalStatus
      }
    });

  } catch (error) {
    console.error('❌ Debug login error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('🔍 Current session debug:', {
      hasSession: !!session,
      user: session?.user,
      expires: session?.expires
    });

    return NextResponse.json({
      session,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      nextAuthUrl: process.env.NEXTAUTH_URL
    });

  } catch (error) {
    console.error('❌ Session debug error:', error);
    return NextResponse.json(
      { error: "Session debug failed" },
      { status: 500 }
    );
  }
}