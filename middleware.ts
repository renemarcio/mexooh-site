import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const allowedUserIds = ["506169"];
  //@ts-ignore
  const userID = token.user.Cad_codigo;

  if (allowedUserIds.includes(userID)) {
    return NextResponse.next();
  } else {
    console.log("Acesso seria negado.");
    // return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
