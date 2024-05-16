import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/prisma";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("endereco");
  const page = searchParams.get("p");
  console.log("address", address, "page", page);

  return NextResponse.json({});
}
