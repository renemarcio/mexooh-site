import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
//From my other project...
/**
 * 
 * Catch All route (This file.)
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

 * 
 * 
 * Then, from @/lib/authOptions.ts
 * 
 * 
 * import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await prisma.$connect();
        const user = await prisma.funcionarios.findUnique({
          where: {
            login: credentials ? credentials.login : '',
          },
        });
        if (!user) {
          throw new Error('Usuário não cadastrado');
        }
        if (!user.ativo) {
          throw new Error('Usuário desligado, obrigado pela contribuição!');
        }
        const isPasswordCorrect =
          (await bcrypt.compare(credentials?.password!, user.senha!)) ||
          (credentials?.password === user.senha && user.senha.length < 60);
        if (!isPasswordCorrect) {
          throw new Error('Senha incorreta');
        }
        const treatedUser = {
          ...user,
        };
        return treatedUser as any;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update') {
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
 * 
 */
