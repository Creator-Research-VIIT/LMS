import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { emailHasAllowedDomain, isInstituteAccessEnabled } from "./instituteAccess";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  debug: true, // Enable debug mode for production debugging
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log('🔍 Looking up user:', credentials.email);
          
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
              approvalStatus: true,
              emailVerified: true,
              instituteId: true
            }
          });
          
          if (!user) {
            console.log('❌ User not found:', credentials.email);  
            throw new Error('Invalid credentials');
          }

          if (!user.password || user.password === "") {
            console.log('❌ User has no password:', credentials.email);
            throw new Error('Invalid credentials');
          }

          console.log('🔍 User found:', {
            email: user.email,
            role: user.role,
            approvalStatus: user.approvalStatus,
            hasPassword: !!user.password
          });

          // Institute access enforcement (if enabled): only allow configured email domains (admins bypass)
          if (isInstituteAccessEnabled()) {
            const isAdmin = user.role === "ADMIN";
            if (!isAdmin && !emailHasAllowedDomain(user.email)) {
              console.log('❌ Access denied (domain not allowed):', user.email);
              throw new Error('Access restricted to institute members');
            }
          }

          // Only allow teachers to log in if they are approved
          if (user.role === "TEACHER" && user.approvalStatus !== "approved") {
            console.log('❌ Teacher not approved:', credentials.email);
            throw new Error('Account pending approval');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log('❌ Invalid password for:', credentials.email);
            throw new Error('Invalid credentials');
          }

          console.log('✅ User authenticated successfully:', {
            email: user.email,
            role: user.role,
            id: user.id
          });
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            approvalStatus: user.approvalStatus,
            instituteId: user.instituteId,
          };
        } catch (error) {
          console.error('❌ Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔍 signIn callback triggered:', { 
        provider: account?.provider, 
        email: user.email, 
        name: user.name 
      });

      // For credentials provider, always allow if we reach this point
      if (account?.provider === "credentials") {
        console.log('✅ Credentials login approved');
        return true;
      }

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email || "" }
          });

          if (existingUser) {
            // Enforce institute access for OAuth as well (admins bypass)
            if (isInstituteAccessEnabled()) {
              const isAdmin = existingUser.role === 'ADMIN';
              if (!isAdmin && !emailHasAllowedDomain(existingUser.email)) {
                console.log('❌ OAuth access denied (domain not allowed):', existingUser.email);
                return "/login?error=instituteAccess";
              }
            }
            console.log('✅ Existing OAuth user found, allowing sign in');
            return true;
          } else {
            // New OAuth user: if restricted mode is on and email domain not allowed, block
            if (isInstituteAccessEnabled() && !emailHasAllowedDomain(user.email || '')) {
              console.log('❌ OAuth registration denied (domain not allowed):', user.email);
              return "/login?error=instituteAccess";
            }
            console.log('🆕 New OAuth user detected, redirecting to role selection');
            return `/oauth-role-selection?email=${encodeURIComponent(user.email || '')}&name=${encodeURIComponent(user.name || '')}&provider=${account.provider}`;
          }
        } catch (error) {
          console.error('❌ Database error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('🔍 JWT callback triggered:', { 
        hasUser: !!user, 
        hasAccount: !!account, 
        provider: account?.provider,
        userEmail: user?.email,
        tokenSub: token.sub
      });

      if (user) {
        try {
          // For OAuth users, fetch role from database
          if (account?.provider === "google" || account?.provider === "github") {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email || "" }
            });
            
            if (dbUser) {
              token.role = dbUser.role;
              token.id = dbUser.id;
              token.approvalStatus = dbUser.approvalStatus;
              token.instituteId = dbUser.instituteId;
              console.log('✅ OAuth user role set:', dbUser.role);
            }
          } else {
            // For credentials login
            token.role = (user as any).role;
            token.id = user.id;
            token.approvalStatus = (user as any).approvalStatus;
            token.instituteId = (user as any).instituteId;
            console.log('✅ Credentials user role set:', (user as any).role);
          }
        } catch (error) {
          console.error('❌ Error in JWT callback:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log('🔍 Session callback triggered:', { 
        hasToken: !!token, 
        tokenRole: token?.role,
        sessionEmail: session.user?.email,
        tokenId: token?.id
      });

      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).approvalStatus = token.approvalStatus;
        (session.user as any).instituteId = token.instituteId;
        
        console.log('✅ Session established:', {
          id: token.id,
          role: token.role,
          email: session.user.email,
          instituteId: token.instituteId
        });
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/signup"
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};