import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fortnights = await prisma.bisemanas.findMany({
    where: {
      dtInicio: {
        gt: new Date(),
      },
    },
  });
  return NextResponse.json(fortnights);
}
