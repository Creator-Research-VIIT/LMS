import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                      req.nextUrl.pathname.startsWith("/register");

    // Admin-only routes
    const isAdminRoute = req.nextUrl.pathname.startsWith("/api/teachers") ||
                        req.nextUrl.pathname.startsWith("/admin");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check admin access for admin routes
    if (isAdminRoute && isAuth) {
      const userRole = (token as any)?.role;
      if (userRole !== "ADMIN") {
        return NextResponse.json(
          { error: "Forbidden: Admin access required" },
          { status: 403 }
        );
      }
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/login", 
    "/register",
    "/api/teachers/:path*",
    "/admin/:path*"
  ],
}; 