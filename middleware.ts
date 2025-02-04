import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const user = token?.user;

  if (!user) {
    if (req.nextUrl.pathname === "/access-denied") return NextResponse.next();
    return NextResponse.redirect(new URL("/access-denied", req.url));
  } else {
    if (req.nextUrl.pathname === "/access-denied")
      return NextResponse.redirect(new URL("/admin", req.url));
    //@ts-ignore
    if (user.Funcionario === 1 && user.fun_data_dem === null) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // const allowedUserIds = [506169];
  // //@ts-ignore
  // const userID = user.Cad_codigo;

  // if (userID === 506169 || allowedUserIds.includes(userID)) {
  //   console.log("userID: ", userID);
  //   console.log(
  //     "userID está na lista de acesso: ",
  //     allowedUserIds.includes(userID)
  //   );
  //   const response = NextResponse.next();
  //   response.cookies.set("isAdmin", "true");
  //   return response;
  // } else {
  //   console.log("Acesso seria negado.");
  //   console.log("userID: ", userID);
  //   console.log(
  //     "userID está na lista de acesso: ",
  //     allowedUserIds.includes(userID)
  //   );
  //   const response = NextResponse.next();
  //   response.cookies.set("isAdmin", "false");
  //   return NextResponse.redirect(new URL("/", req.url));
  //   // return NextResponse.json(
  //   //   { error: "Acesso negado", success: false },
  //   //   { status: 401 }
  //   // );
  // }
}

export const config = {
  matcher: ["/admin/:path*", "/access-denied"],
};
