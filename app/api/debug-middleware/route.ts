import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    return NextResponse.json({
      success: true,
      token: token ? {
        id: token.id,
        email: token.email,
        role: token.role,
        approvalStatus: token.approvalStatus,
        exp: token.exp,
        iat: token.iat,
      } : null,
      hasToken: !!token,
      cookies: request.cookies.getAll(),
      headers: {
        authorization: request.headers.get('authorization'),
        cookie: request.headers.get('cookie'),
      }
    });
  } catch (error) {
    console.error('Debug middleware error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      hasToken: false
    });
  }
}