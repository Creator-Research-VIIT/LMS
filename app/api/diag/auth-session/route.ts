import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * DIAGNOSTIC ENDPOINT - Use this to debug session/auth issues in production
 * Remove in production after debugging
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      sessionExists: !!session,
      sessionData: session ? {
        user: {
          id: (session.user as any)?.id,
          email: session.user?.email,
          name: session.user?.name,
          role: (session.user as any)?.role,
        },
        expires: session.expires,
      } : null,
      message: session ? "✅ Session found" : "❌ No session - check NEXTAUTH_SECRET and cookie settings",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Auth diagnostic failed",
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
