import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

export const  authOptions: NextAuthOptions = {
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
      if (account?.provider === "google" || account?.provider === "github") {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" }
        });

        if (existingUser) {
          // User exists, allow sign in
          return true;
        } else {
          // New OAuth user - need role selection
          // Store temporary data in URL for role selection page
          return `/oauth-role-selection?email=${encodeURIComponent(user.email || "")}&name=${encodeURIComponent(user.name || "")}&provider=${account.provider}&image=${encodeURIComponent(user.image || "")}`;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        (token as any).role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = (token as any).role;
    // Expose the JWT token in the session object for API clients
    (session as any).accessToken = token;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};