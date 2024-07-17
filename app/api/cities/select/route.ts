import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../utils/prisma";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const invType = searchParams.get("type") || undefined;
  const allCitiesResults = await prisma.inventarios.findMany({
    distinct: ["cidade"],
    orderBy: {
      cidade: "asc",
    },
    select: {
      cidade: true,
    },
    where: {
      AND: [
        {
          tipoinventarios: {
            id: invType ? Number(invType) : undefined,
          },
        },
        {
          ativo: true,
        },
      ],
    },
  });

  //   const citiesWithoutDuplicates = allCitiesResults
  //     .map((city) => city.cidade)
  //     .filter((value, index, self) => self.indexOf(value) === index);

  //   console.log("allCitiesResults");
  //   console.log(allCitiesResults);
  //   console.log("citiesWithoutDuplicates");
  //   console.log(citiesWithoutDuplicates);

  const citiesAsSelectData = allCitiesResults.map((city) => {
    return {
      value: city.cidade,
      label: city.cidade,
    };
  });

  //   console.log(citiesAsSelectData);

  return NextResponse.json(citiesAsSelectData);
}
