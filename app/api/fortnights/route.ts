import prisma from "@/utils/prisma";
import { bisemanas } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get("ano") || undefined;
  let fortnights: bisemanas[] = [];
  if (year) {
    fortnights = await prisma.bisemanas.findMany({
      where: {
        ano: year,
      },
    });
  } else {
    fortnights = await prisma.bisemanas.findMany({
      where: {
        dtInicio: {
          gt: new Date(),
        },
      },
    });
  }
  return NextResponse.json(fortnights);
}
