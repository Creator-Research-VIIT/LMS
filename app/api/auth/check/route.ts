import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('🔍 Auth check API called:', {
      hasSession: !!session,
      userEmail: session?.user?.email,
      userRole: (session?.user as any)?.role
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { 
          authenticated: false, 
          error: "No session found" 
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: (session.user as any).id,
        email: session.user.email,
        name: session.user.name,
        role: (session.user as any).role
      }
    });

  } catch (error) {
    console.error('❌ Auth check error:', error);
    return NextResponse.json(
      { 
        authenticated: false, 
        error: "Internal server error" 
      },
      { status: 500 }
    );
  }
}