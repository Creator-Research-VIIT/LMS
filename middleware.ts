// Temporarily disabled to fix infinite redirect loop
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const isAuth = !!token;
//     const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
//                       req.nextUrl.pathname.startsWith("/signup");

//     // If user is authenticated and trying to access auth pages, redirect to dashboard
//     if (isAuthPage && isAuth) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     // Admin-only routes
//     const isAdminRoute = req.nextUrl.pathname.startsWith("/api/teachers") ||
//                         req.nextUrl.pathname.startsWith("/admin");

//     // Check admin access for admin routes
//     if (isAdminRoute && isAuth) {
//       const userRole = (token as any)?.role;
//       if (userRole !== "ADMIN") {
//         return NextResponse.json(
//           { error: "Forbidden: Admin access required" },
//           { status: 403 }
//         );
//       }
//     }

//     return null;
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         // Allow access to auth pages without token
//         if (req.nextUrl.pathname.startsWith("/login") || 
//             req.nextUrl.pathname.startsWith("/signup")) {
//           return true;
//         }
//         // Require token for protected routes
//         return !!token;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/dashboard/:path*", 
//     "/login", 
//     "/signup",
//     "/api/teachers/:path*",
//     "/admin/:path*"
//   ],
// };

// Temporary export to prevent errors
export default function middleware() {
  return null;
}

export const config = {
  matcher: [],
}; 