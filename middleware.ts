import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    
    console.log("MIDDLEWARE:", {
      path: req.nextUrl.pathname,
      isAuth,
      token: token ? "exists" : "null",
      role: (token as any)?.role || "no-role"
    });
    
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                      req.nextUrl.pathname.startsWith("/signup") ||
                      req.nextUrl.pathname.startsWith("/register");

    // If user is authenticated and trying to access auth pages, redirect based on role
    if (isAuthPage && isAuth) {
      const userRole = (token as any)?.role;
      console.log("AUTH PAGE REDIRECT:", { userRole, pathname: req.nextUrl.pathname });
      
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else if (userRole === "TEACHER") {
        return NextResponse.redirect(new URL("/teacher", req.url));
      } else if (userRole === "STUDENT") {
        return NextResponse.redirect(new URL("/student", req.url));
      } else {
        // No role assigned, redirect to role selection
        return NextResponse.redirect(new URL("/oauth-role-selection", req.url));
      }
    }

    // Admin-only routes
    const isAdminRoute = req.nextUrl.pathname.startsWith("/api/teachers") ||
                        req.nextUrl.pathname.startsWith("/admin");

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
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/login", 
          "/signup",
          "/register",
          "/verify-email",
          "/oauth-role-selection",
          "/courses",
          "/api/auth",
          "/api/register",
          "/api/auth/verify-email", 
          "/api/auth/debug",
          "/api/auth/check",
          "/api/oauth-check",
          "/api/courses"
        ];
        
        // Check if this is a public route
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || pathname.startsWith(route + "/")
        );
        
        if (isPublicRoute) {
          return true;
        }
        
        // For protected routes, require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - files with extensions (images, css, js, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public|.*\\.[\\w]+$).*)",
  ],
}; 