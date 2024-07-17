import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/prisma";
export async function GET(req: NextRequest) {
  const allCitiesResults = await prisma.inventarios.findMany({
    distinct: ["cidade"],
    orderBy: {
      cidade: "asc",
    },
    select: {
      cidade: true,
    },
  });
  const cities = allCitiesResults.map((city) => city.cidade);
  return NextResponse.json(cities);
}
