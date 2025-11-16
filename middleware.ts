import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("🔍 MIDDLEWARE TOKEN:", req.nextauth.token);
    
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const userRole = (token as any)?.role;

    console.log("MIDDLEWARE:", {
      path,
      isAuth: !!token,
      role: userRole || "no-role"
    });

    // Simple API protection
    const publicApiPrefixes = ["/api/auth", "/api/diag", "/api/register", "/api/courses"];
    
    if (path.startsWith('/api/') && !token) {
      const isPublicApi = publicApiPrefixes.some(p => path === p || path.startsWith(p + '/'));
      if (!isPublicApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Allow API, static, Next.js internals
        if (pathname.startsWith('/api/') ||
            pathname.startsWith('/_next/') ||
            pathname === '/favicon.ico' ||
            /\.(png|jpg|jpeg|gif|svg|ico)$/i.test(pathname)) {
          return true;
        }

        // Public routes
        const publicRoutes = ["/", "/login", "/signup", "/register", "/verify-email", 
          "/oauth-role-selection", "/courses", "/charity", "/charity/login"];
        
        if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"))) {
          return true;
        }

        // Protected: need token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};

