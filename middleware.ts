import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (true) {
    // For now we just redirect to home, afterwards, add verification, see if it's an admin that's logged in.
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
