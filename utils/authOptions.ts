// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { NextAuthOptions } from 'next-auth';
// import { Adapter } from 'next-auth/adapters';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcrypt';
// import prisma from '@/lib/prisma';

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { query } from "./mysqlConnection";
import { CadGeral } from "@/types/databaseTypes";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userFetch = await query(
          "SELECT * FROM cadgeral WHERE email = ? AND Cliente = 1",
          [credentials?.email]
        );

        const user = userFetch as CadGeral[];
        console.log("Retrieved users: ", user.length);
        if (user.length === 0) {
          throw new Error("Usuário não encontrado");
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password!,
          user[0].password!
        );
        if (!isPasswordCorrect) {
          throw new Error("Senha incorreta");
        }
        console.log("Logged as user: ", user[0]);
        return user[0] as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        const updatedUser = {
          ...token,
          user: {
            ...session,
          },
        };
        user = updatedUser as any;
        return { user };
      }
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};
