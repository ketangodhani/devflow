import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

import bcrypt from "bcryptjs";
import { createWorkspace } from "@/features/workspaces/lib/create-worksapce";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return user;
      },
    }),
  ],

  trustHost: true,

  pages: {
    signIn: "/login",
  },

  events: {
    async createUser({ user }) {
      if (user?.id) {
        try {
          await createWorkspace(user.id, `${user.name || "My"}'s Workspace`);
        } catch (error) {
          console.error("Error auto-creating workspace in createUser event:", error);
        }
      }
    },
  },

  callbacks: {
    async signIn({ user }) {
      if (user?.id) {
        try {
          const existingMembership = await prisma.workspaceMember.findFirst({
            where: { userId: user.id },
          });
          if (!existingMembership) {
            await createWorkspace(user.id, `${user.name || "My"}'s Workspace`);
          }
        } catch (error) {
          console.error("Error ensuring workspace in signIn callback:", error);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});