// import { NextResponse, NextRequest } from "next/server";
// import prisma from "../../../utils/prisma";
// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const address = searchParams.get("endereco") || undefined;
//   const city = searchParams.get("cidade") || undefined;
//   const page = searchParams.get("p") || undefined;
//   const fortnight = searchParams.get("fortnight") || undefined;
//   const perPage = 11;

import { SELECTBuilder, WHEREBuilder } from "@/lib/SQLBuilder";
import { Pontos, Tabelas } from "@/types/databaseTypes";
import { Billboard } from "@/types/websiteTypes";
import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

//   const whereConditions: any = [
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
//   ];

//   if (fortnight !== undefined) {
//     whereConditions.push({
//       NOT: {
//         alugadas: {
//           some: {
//             id_bisemana: Number(fortnight),
//           },
//         },
//       },
//     });
//   }

//   const billboards = await prisma.inventarios.findMany({
//     where: {
//       AND: whereConditions,
//     },
//     select: {
//       id: true,
//       Localizacao: true,
//       Face: true,
//       Iluminado: true,
//       LinkGoogleMaps: true,
//       uf: true,
//       cidade: true,
//     },
//     take: perPage,
//     skip: (Number(page) - 1) * perPage,
//   });

//   const totalBillboards = await prisma.inventarios.count({
//     where: { AND: whereConditions },
//   });

//   const billboardsWithValues = billboards.map((billboard) => {
//     return {
//       ...billboard,
//       valor: billboard.Iluminado === "S" ? 1190 : 1090,
//     };
//   });

//   const res = {
//     billboards: billboardsWithValues,
//     totalPages: Math.floor(totalBillboards / perPage) + 1,
//   };

//   return NextResponse.json(res);
// }

export async function GET(req: NextRequest) {
  //SQL Base
  const searchParams = req.nextUrl.searchParams;
  const activePage = Number(searchParams.get("activePage"));
  const pageSize = Number(searchParams.get("pageSize"));

  //Valid Params
  const SQLConditions: { [key: string]: (value: string) => string } = {
    id: (value: string) => `pon_codigo = IN(${value})`,
    address: (value: string) => `pon_compl LIKE '%${value}%'`,
    city: (value: string) => `Cidades_cid_codigo IN(${value})`,
    fortnight: (value: string) => `NOT alugadas.id_bisemana = ${value}`,
  };

  // SELECT DISTINCT pon_codigo, pon_compl, LinkMapa, pon_iluminado FROM pontos
  // LEFT JOIN Cidades ON pontos.Cidades_cid_codigo = Cidades_cid_codigo
  // left join alugadas on alugadas.inventario = pontos.pon_codigo
  // WHERE pon_outd_pain = 'O' and not alugadas.id_bisemana = 572
  // order by alugadas.inventario ASC

  const SQL =
    `SELECT DISTINCT pon_codigo, pon_compl, LinkMapa, pon_iluminado FROM pontos LEFT JOIN Cidades ON pontos.Cidades_cid_codigo = Cidades_cid_codigo LEFT JOIN alugadas on alugadas.inventario = pontos.pon_codigo ` +
    WHEREBuilder(searchParams, SQLConditions) +
    ` ORDER BY pon_compl`;

  try {
    let totalPages = 0;
    if (pageSize) {
      const [totalResults] = await db.query<RowDataPacket[]>(SQL);
      totalPages = Math.ceil(totalResults.length / pageSize);
    }
    let resultingSQL = SQL;
    pageSize
      ? (resultingSQL =
          SQL +
          ` LIMIT ${pageSize} OFFSET ${
            pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1)
          }`)
      : null;

    const [response] = await db.query<RowDataPacket[]>(resultingSQL);
    const outdoors = response as Pontos[];
    const billboards: Billboard[] = outdoors.map((outdoor) => ({
      id: outdoor.pon_codigo,
      address: outdoor.pon_compl,
      coordinates: outdoor.LinkMapa ? outdoor.LinkMapa : "0,0",
      value: outdoor.pon_iluminado === "S" ? 1190 : 1090,
    }));
    const result = {
      data: billboards,
      totalPages: totalPages,
    };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      error: error || "An unknown error has occurred",
    });
  }
}
