import NextAuth, { type AuthOptions, type SessionStrategy } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    // Google and GitHub providers disabled until credentials are provided
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // For testing purposes, allow login without database
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: "test@example.com",
            name: "Test User",
            role: "user",
          };
        }
        
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const client: MongoClient = await clientPromise;
          const db = client.db();
          const user = await db.collection('users').findOne({ email: credentials.email });
          
          if (!user || !user.password) return null;
          
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) return null;
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Database connection error:', error);
          // Return null on database error
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
