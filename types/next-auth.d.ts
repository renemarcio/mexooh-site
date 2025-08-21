import nextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
     data?: {
      nome?: string;
      [key: string]: any;
    };
  }
}
