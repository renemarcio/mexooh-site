import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const allowedUserIds = [506169];
  //@ts-ignore
  const userID = token ? token.user.Cad_codigo : null;

  if (allowedUserIds.includes(userID) && userID !== null) {
    console.log("userID: ", userID);
    console.log(
      "userID está na lista de acesso: ",
      allowedUserIds.includes(userID)
    );
    return NextResponse.next();
  } else {
    console.log("Acesso seria negado.");
    console.log("userID: ", userID);
    console.log(
      "userID está na lista de acesso: ",
      allowedUserIds.includes(userID)
    );
    // return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
