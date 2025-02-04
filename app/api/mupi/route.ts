// import { NextResponse, NextRequest } from "next/server";
// // import prisma from "../../../utils/prisma";
// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const address = searchParams.get("endereco") || undefined;
//   const city = searchParams.get("cidade") || undefined;
//   const page = searchParams.get("p") || undefined;
//   const perPage = 11;

import { Pontos } from "@/types/databaseTypes";
import { MUPI } from "@/types/websiteTypes";
import { query } from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

//   const panels = await prisma.inventarios.findMany({
//     where: {
//       AND: [
//         {
//           tipoinventarios: {
//             id: 3,
//           },
//         },
//         {
//           ativo: true,
//         },
//         {
//           Localizacao: {
//             contains: address,
//           },
//         },
//         {
//           cidade: {
//             contains: city,
//           },
//         },
//       ],
//     },
//     take: perPage,
//     skip: (Number(page) - 1) * perPage,
//   });
//   const totalPanels = await prisma.inventarios.findMany({
//     where: {
//       AND: [
//         {
//           tipoinventarios: {
//             id: 2,
//           },
//         },
//         {
//           ativo: true,
//         },
//         {
//           Localizacao: {
//             contains: address,
//           },
//         },
//         {
//           cidade: {
//             contains: city,
//           },
//         },
//       ],
//     },
//   });

//   const res = {
//     panels,
//     totalPages: Math.floor(totalPanels.length / perPage) + 1,
//   };

//   return NextResponse.json(res);
// }
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || null;
  const address = searchParams.get("address") || null;
  const city = searchParams.get("city") || null;
  const activePage = Number(searchParams.get("activePage")) || null;
  const pageSize = Number(searchParams.get("pageSize")) || null;
  const fortnights = searchParams.get("fortnights") || null;
  const date = searchParams.get("date") || null;
  let listOfRentedInventoryIDs: number[] = [];
  try {
    if (fortnights !== null && fortnights !== "") {
      const SQLRentedInventory =
        "Select itensnegocios.Pontos_pon_codigo from itensnegocios Where itensnegocios.biSemana_bi_codigo In (" +
        fortnights +
        ") And itensnegocios.Tipo In ('L','B','C','D','T','M')";
      const responseRentedInventory = await query(SQLRentedInventory);
      listOfRentedInventoryIDs = (
        responseRentedInventory as RowDataPacket[]
      ).map((obj) => (obj as { Pontos_pon_codigo: number }).Pontos_pon_codigo);
    }
  } catch (error) {
    console.log("Couldn't fetch list of rented inventories.", error);
    throw error;
  }

  let listOfRentedMUPIsAtDate: number[] = [];
  if (date !== null && date !== "") {
    const SQLRentedInventory =
      'Select itensnegocios.Pontos_pon_codigo from itensnegocios Where itensnegocios.dtExib_Inicial <= "' +
      date +
      '" AND itensnegocios.dtExib_Final >= "' +
      date +
      '" And itensnegocios.Tipo In ("L","B","C","D","T","M") AND itensnegocios.TipoPonto = "M"';
    const responseRentedInventory = await query(SQLRentedInventory);
    listOfRentedMUPIsAtDate = (responseRentedInventory as RowDataPacket[]).map(
      (obj) => (obj as { Pontos_pon_codigo: number }).Pontos_pon_codigo
    );
  }

  let SQL =
    "SELECT pon_codigo, pon_compl, LinkMapa from pontos LEFT JOIN Cidades ON Cidades.cid_codigo = pontos.Cidades_cid_codigo WHERE Pontos.pon_outd_pain = 'M' And pontos.pon_alugado = 'S'";

  const conditions = [];

  if (id !== null) {
    conditions.push("pon_codigo IN(" + id + ")");
  }

  if (address !== null) {
    conditions.push("pon_compl LIKE '%" + address + "%'");
  }

  if (city !== null) {
    conditions.push("Cidades_cid_codigo IN(" + city + ")");
  }

  if (listOfRentedInventoryIDs.length > 0) {
    conditions.push("NOT pon_codigo IN(" + listOfRentedInventoryIDs + ")");
  }

  if (listOfRentedMUPIsAtDate.length > 0) {
    conditions.push("NOT pon_codigo IN(" + listOfRentedMUPIsAtDate + ")");
  }

  if (conditions.length > 0) {
    SQL += " AND " + conditions.join(" AND ");
  }

  try {
    if (pageSize !== null) {
      const fullResponse = (await query(SQL)) as Pontos[];
      const totalPages = Math.ceil(fullResponse.length / pageSize);
      if (activePage !== null) {
        SQL += ` LIMIT ${pageSize} OFFSET ${
          pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1)
        }`;
      }
      const paginatedResponse = await query(SQL);
      const inventory = paginatedResponse as Pontos[];
      const MUPIs: MUPI[] = inventory.map((mupi) => ({
        id: mupi.pon_codigo,
        address: mupi.pon_compl,
        coordinates: mupi.LinkMapa ? mupi.LinkMapa : "0,0",
        value: mupi.pon_iluminado === "S" ? 1190 : 1090,
      }));
      const result = {
        data: MUPIs,
        totalPages,
      };
      return NextResponse.json(result);
    } else {
      const response = await query(SQL);
      const inventory = response as Pontos[];
      const MUPIs: MUPI[] = inventory.map((mupi) => ({
        id: mupi.pon_codigo,
        address: mupi.pon_compl,
        coordinates: mupi.LinkMapa ? mupi.LinkMapa : "0,0",
        value: mupi.pon_iluminado === "S" ? 1190 : 1090,
      }));
      const result = {
        data: MUPIs,
      };
      return NextResponse.json(result);
    }
  } catch (error) {}
}
