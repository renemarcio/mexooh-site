// import { NextResponse, NextRequest } from "next/server";
// import prisma from "../../../utils/prisma";
// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const address = searchParams.get("endereco") || undefined;
//   const city = searchParams.get("cidade") || undefined;
//   const page = searchParams.get("p") || undefined;
//   const fortnight = searchParams.get("fortnight") || undefined;
//   const perPage = 11;

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

import { SELECTBuilder } from "@/lib/SQLBuilder";
import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const activePage = Number(searchParams.get("activePage"));
  const pageSize = Number(searchParams.get("pageSize"));

  //Valid Params
  const SQLConditions: { [key: string]: (value: string) => string } = {
    id: (value: string) => `pon_codigo IN(${value})`,
    company: (value: string) => `Empresas_Emp_codigo IN(${value})`,
  };

  //SQL with filter
  const FilteredSQL = SELECTBuilder(
    searchParams,
    "pontos",
    undefined,
    SQLConditions
  );

  try {
    let totalPages = 0;
    let resultingSQL = FilteredSQL;
    if (pageSize) {
      const [totalResults] = await db.query<RowDataPacket[]>(FilteredSQL);
      totalPages = Math.ceil(totalResults.length / pageSize);
      resultingSQL += ` LIMIT ${pageSize} OFFSET ${
        pageSize * (activePage - 1)
      }`;
    }
    const [response] = await db.query<RowDataPacket[]>(resultingSQL);
    const billboards = response.map((billboard) => ({
      id: billboard.id,
    }));
  } catch (error) {
    throw error;
  }
}
