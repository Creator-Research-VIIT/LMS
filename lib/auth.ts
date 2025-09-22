import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user?.password || user.password === "") {
          return null;
        }

        // Only allow teachers to log in if they are approved
        if (user.role === "TEACHER" && user.approvalStatus !== "approved") {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔍 signIn callback triggered:', { 
        provider: account?.provider, 
        email: user.email, 
        name: user.name 
      });

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email || "" }
          });

          if (existingUser) {
            console.log('✅ Existing OAuth user found, allowing sign in');
            // User exists, allow sign in
            return true;
          } else {
            console.log('🆕 New OAuth user detected, redirecting to role selection');
            // New OAuth user - redirect to role selection page with user data
            const redirectParams = new URLSearchParams({
              email: user.email || '',
              name: user.name || '',
              provider: account.provider,
              image: user.image || ''
            });
            
            return `/oauth-role-selection?${redirectParams.toString()}`;
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
        provider: account?.provider 
      });

      if (user) {
        // For OAuth users, we need to fetch role from database
        if (account?.provider === "google" || account?.provider === "github") {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email || "" }
            });
            
            if (dbUser) {
              (token as any).role = dbUser.role;
              token.id = dbUser.id;
              console.log('✅ OAuth user role set:', dbUser.role);
            }
          } catch (error) {
            console.error('❌ Error fetching user role:', error);
          }
        } else {
          // For credentials login
          (token as any).role = (user as any).role;
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log('🔍 Session callback triggered:', { 
        hasToken: !!token, 
        tokenRole: (token as any)?.role,
        sessionEmail: session.user?.email 
      });

      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = (token as any).role;
        // Expose the JWT token in the session object for API clients
        (session as any).accessToken = token;
        
        console.log('✅ Session established with role:', (token as any)?.role);
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login" // Redirect errors to login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};