import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/prisma";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("endereco") || undefined;
  const city = searchParams.get("cidade") || undefined;
  const page = searchParams.get("p") || undefined;
  const fortnight = searchParams.get("fortnight") || undefined;
  const perPage = 11;

  console.log("fortnight");
  console.log(fortnight);

  const whereConditions: any = [
    {
      tipoinventarios: {
        id: 1,
      },
    },
    {
      ativo: true,
    },
    {
      Localizacao: {
        contains: address,
      },
    },
    {
      cidade: {
        contains: city,
      },
    },
  ];

  if (fortnight !== undefined) {
    console.log(fortnight);
    console.log("owo");
    whereConditions.push({
      NOT: {
        alugadas: {
          some: {
            id_bisemana: Number(fortnight),
          },
        },
      },
    });
  }

  const billboards = await prisma.inventarios.findMany({
    where: {
      AND: whereConditions,
    },
    //   where: {
    //     AND: [
    //       {
    //         tipoinventarios: {
    //           id: 1,
    //         },
    //       },
    //       {
    //         ativo: true,
    //       },
    //       {
    //         Localizacao: {
    //           contains: address,
    //         },
    //       },
    //       {
    //         cidade: {
    //           contains: city,
    //         },
    //       },
    //       {
    //         NOT: {
    //           alugadas: {
    //             some: {
    //               id_bisemana: fortnight ? Number(fortnight) : undefined,
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // where: whereConditions,
    select: {
      id: true,
      Localizacao: true,
      Face: true,
      Iluminado: true,
      LinkGoogleMaps: true,
      uf: true,
      cidade: true,
    },
    take: perPage,
    skip: (Number(page) - 1) * perPage,
  });

  const totalBillboards = await prisma.inventarios.count({
    // where: {
    //   AND: [
    //     {
    //       tipoinventarios: {
    //         id: 1,
    //       },
    //     },
    //     {
    //       ativo: true,
    //     },
    //     {
    //       Localizacao: {
    //         contains: address,
    //       },
    //     },
    //     {
    //       cidade: {
    //         contains: city,
    //       },
    //     },
    //     {
    //       NOT: {
    //         alugadas: {
    //           some: {
    //             id_bisemana: fortnight ? Number(fortnight) : undefined,
    //           },
    //         },
    //       },
    //     },
    //   ],
    // },
    where: { AND: whereConditions },
  });

  const billboardsWithValues = billboards.map((billboard) => {
    return {
      ...billboard,
      valor: billboard.Iluminado === "S" ? 1190 : 1090,
    };
  });

  const res = {
    billboards: billboardsWithValues,
    totalPages: Math.floor(totalBillboards / perPage) + 1,
  };

  return NextResponse.json(res);
}
