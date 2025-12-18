import { emailHasAllowedDomain, isInstituteAccessEnabled } from "@/lib/instituteAccess";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const path = req.nextUrl.pathname;
    
    console.log("MIDDLEWARE:", {
      path: req.nextUrl.pathname,
      isAuth,
      token: token ? "exists" : "null",
      role: (token as any)?.role || "no-role"
    });
    
    const isAuthPage = path.startsWith("/login") || 
              path.startsWith("/signup") ||
              path.startsWith("/register") ||
              path.startsWith("/charity/login");

    // For API requests: if not logged in and API is not public, return JSON 401 instead of HTML redirect
    const publicApiPrefixes = [
      "/api/auth",
      "/api/diag",
      "/api/register",
      "/api/auth/verify-email",
      "/api/auth/debug",
      "/api/auth/check",
      "/api/oauth-check",
      "/api/courses",
      "/api/debug-middleware"
    ];
    if (path.startsWith('/api/') && !isAuth) {
      const isPublicApi = publicApiPrefixes.some(p => path === p || path.startsWith(p + '/'));
      if (!isPublicApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // If user is authenticated and trying to access auth pages, redirect based on role
    if (isAuthPage && isAuth) {
      const userRole = (token as any)?.role;
      const instituteId = (token as any)?.instituteId;
      console.log("AUTH PAGE REDIRECT:", { userRole, instituteId, pathname: req.nextUrl.pathname });
      
      // Institute users get priority redirect to /institute
      if (instituteId) {
        console.log("🏢 Institute user detected, redirecting to /institute");
        return NextResponse.redirect(new URL("/institute", req.url));
      }
      
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else if (userRole === "TEACHER") {
        return NextResponse.redirect(new URL("/teacher", req.url));
      } else if (userRole === "STUDENT") {
        return NextResponse.redirect(new URL("/student", req.url));
      } else if (userRole === "CHARITY") {
        return NextResponse.redirect(new URL("/charity", req.url));
      } else {
        // No role assigned, redirect to role selection
        return NextResponse.redirect(new URL("/oauth-role-selection", req.url));
      }
    }

    // Protect charity dashboard: only CHARITY role may access
    if (path.startsWith("/charity/dashboard")) {
      const userRole = (token as any)?.role;
      if (!isAuth) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(loginUrl);
      }
      if (userRole !== "CHARITY") {
        if (userRole === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
        if (userRole === "TEACHER") return NextResponse.redirect(new URL("/teacher", req.url));
        return NextResponse.redirect(new URL("/student", req.url));
      }
    }

    // If user is authenticated and accessing home page, redirect based on role
    if (req.nextUrl.pathname === "/" && isAuth) {
      const userRole = (token as any)?.role;
      const instituteId = (token as any)?.instituteId;
      console.log("HOME PAGE REDIRECT:", { userRole, instituteId });
      
      // Institute users get priority redirect to /institute
      if (instituteId) {
        console.log("🏢 Institute user detected, redirecting to /institute");
        return NextResponse.redirect(new URL("/institute", req.url));
      }
      
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else if (userRole === "TEACHER") {
        return NextResponse.redirect(new URL("/teacher", req.url));
      } else if (userRole === "STUDENT") {
        return NextResponse.redirect(new URL("/student", req.url));
      } else if (userRole === "CHARITY") {
        return NextResponse.redirect(new URL("/charity", req.url));
      }
    }

    // Admin-only routes
    const isAdminRoute = path.startsWith("/api/teachers") ||
              path.startsWith("/admin") ||
              path.startsWith("/api/admin");

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

    // Institute portal and APIs: enforce domain allowlist when enabled
    if (isInstituteAccessEnabled()) {
      const path = req.nextUrl.pathname;
      const isInstitutePath = path.startsWith('/institute') || path.startsWith('/api/institute');
      if (isInstitutePath) {
        if (!isAuth) {
          // Not authenticated: send to custom login and preserve return path
          const loginUrl = new URL('/login', req.url);
          loginUrl.searchParams.set('callbackUrl', path);
          return NextResponse.redirect(loginUrl);
        }
        const role = (token as any)?.role as string | undefined;
        const email = (token as any)?.email as string | undefined;
        const isAdmin = role === 'ADMIN';
        const allowed = emailHasAllowedDomain(email || null);
        if (!isAdmin && !allowed) {
          const isApi = path.startsWith('/api/');
          if (isApi) {
            return NextResponse.json(
              { error: 'Forbidden: Institute access only' },
              { status: 403 }
            );
          }
          const url = new URL('/login', req.url);
          url.searchParams.set('error', 'instituteAccess');
          url.searchParams.set('callbackUrl', path);
          return NextResponse.redirect(url);
        }
      }
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        console.log('🔍 AUTHORIZED CALLBACK:', {
          pathname,
          hasToken: !!token,
          tokenRole: token?.role,
          tokenExp: token?.exp
        });

        // Always allow API routes to reach our middleware handler, so we can
        // return JSON errors instead of HTML redirects.
        if (pathname.startsWith('/api/')) {
          return true;
        }

        // Allow static files from public folder and Next.js internals
        if (/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/i.exec(pathname) ||
            pathname.startsWith('/_next/') ||
            pathname === '/favicon.ico') {
          return true;
        }
        
        // Public routes that don't require authentication
        const publicRoutes = [
          "/",
          "/login", 
          "/signup",
          "/register",
          "/verify-email",
          "/oauth-role-selection",
          "/courses",
          "/charity",
          "/charity/login",
          "/api/auth",
          "/api/diag",
          "/api/register",
          "/api/auth/verify-email", 
          "/api/auth/debug",
          "/api/auth/check",
          "/api/oauth-check",
          "/api/courses",
          "/api/debug-middleware",
          "/teacher",
          "/admin", 
          "/student",
          "/institute"
        ];
        
        // Check if this is a public route
        const isPublicRoute = publicRoutes.some(route => 
          pathname === route || pathname.startsWith(route + "/")
        );
        
        console.log('🔍 ROUTE CHECK:', { 
          pathname, 
          isPublicRoute, 
          matchedRoute: publicRoutes.find(route => 
            pathname === route || pathname.startsWith(route + "/")
          ) 
        });
        
        if (isPublicRoute) {
          console.log('✅ PUBLIC ROUTE ALLOWED:', pathname);
          return true;
        }
        
        // For protected routes, require authentication
        const authorized = !!token;
        console.log('🔍 PROTECTED ROUTE AUTH:', { pathname, authorized, hasToken: !!token });
        return authorized;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.[\\w]+$).*)",
  ],
};
