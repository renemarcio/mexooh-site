import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const gracePeriod = new Date();
  gracePeriod.setDate(new Date().getDate() + 10);
  const fortnights = await prisma.bisemanas.findMany({
    where: {
      dtInicio: {
        gt: gracePeriod,
      },
    },
  });
  return NextResponse.json(fortnights);
}
