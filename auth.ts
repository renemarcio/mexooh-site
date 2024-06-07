import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./utils/prisma";
import bcryptjs from "bcryptjs";
import { clientes } from "@prisma/client";

/*
declare module "next-auth" {
  
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  
  interface Session {
    user: {
      /** The user's postal address. 
      address: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
    } & DefaultSession["user"]
  }
}
*/

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      authorize: async (credentials, req) => {
        if (!credentials.email || !credentials.password) return null;
        const email = credentials.email as string;
        const password = credentials.password as string;
        const user = await prisma.clientes.findFirst({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error("Usuário não encontrado");
        }
        if (user.password === null) {
          throw new Error("Usuário sem senha");
        }
        if (bcryptjs.compareSync(password, user.password)) {
          return user.id;
        } else {
          throw new Error("Senha incorreta");
        }
      },
    }),
  ],
});
