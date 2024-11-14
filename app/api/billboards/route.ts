// import { ConditionsBuilder } from "@/lib/SQLBuilder";
// import { Pontos, Tabelas } from "@/types/databaseTypes";
// import { Billboard } from "@/types/websiteTypes";
// import db from "@/utils/mysqlConnection";
// import { RowDataPacket } from "mysql2";
// import { NextRequest, NextResponse } from "next/server";

import { Pontos } from "@/types/databaseTypes";
import { Billboard } from "@/types/websiteTypes";
import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const activePage = Number(searchParams.get("activePage"));
//   const pageSize = Number(searchParams.get("pageSize"));

//   const SQLConditions: { [key: string]: (value: string) => string } = {
//     id: (value: string) => `pon_codigo = IN(${value})`,
//     address: (value: string) => `pon_compl LIKE '%${value}%'`,
//     city: (value: string) => `Cidades_cid_codigo IN(${value})`,
//     // fortnight: (value: string) =>
//     //   `itensnegocios.biSemana_bi_codigo In (${value}) AND itensnegocios.Tipo In ('L','B','C','D','T','M')`,
//   };

//   if (searchParams.get("fortnight") !== null) {
//     const SQLRentedInventory =
//       "Select itensnegocios.Pontos_pon_codigo from   itensnegocios Where  itensnegocios.biSemana_bi_codigo In (" +
//       searchParams.get("fortnight") +
//       ") And itensnegocios.Tipo In ('L','B','C','D','T','M')";
//     const [responseRentedInventory] = await db.query(SQLRentedInventory);
//     const listOfRentedInventoryIDs = (
//       responseRentedInventory as RowDataPacket[]
//     ).map((obj) => (obj as { Pontos_pon_codigo: number }).Pontos_pon_codigo);
//     console.log(listOfRentedInventoryIDs);

//   }
//   const SQL =
//     "SELECT pon_codigo, pon_compl, LinkMapa, pon_iluminado, pon_alugado, pon_outd_pain FROM pontos LEFT JOIN Cidades ON Cidades.cid_codigo = pontos.Cidades_cid_codigo WHERE Pontos.pon_outd_pain = 'O' And pontos.pon_alugado = 'S'" +
//     ConditionsBuilder(searchParams, SQLConditions) +
//     " ORDER BY pon_compl";

//   try {
//     let totalPages = 0;
//     if (pageSize) {
//       const [totalResults] = await db.query<RowDataPacket[]>(SQL);
//       totalPages = Math.ceil(totalResults.length / pageSize);
//     }
//     let resultingSQL = SQL;
//     pageSize
//       ? (resultingSQL =
//           SQL +
//           ` LIMIT ${pageSize} OFFSET ${
//             pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1)
//           }`)
//       : null;

//     const [response] = await db.query<RowDataPacket[]>(resultingSQL);
//     const outdoors = response as Pontos[];
//     const billboards: Billboard[] = outdoors.map((outdoor) => ({
//       id: outdoor.pon_codigo,
//       address: outdoor.pon_compl,
//       coordinates: outdoor.LinkMapa ? outdoor.LinkMapa : "0,0",
//       value: outdoor.pon_iluminado === "S" ? 1190 : 1090,
//       test:
//         "Alugado? " +
//         outdoor.pon_alugado +
//         " | OUTD_PAIN: " +
//         //@ts-ignore
//         outdoor.pon_outd_pain,
//     }));
//     const result = {
//       data: billboards,
//       totalPages: totalPages,
//     };
//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({
//       error: error || "An unknown error has occurred",
//     });
//   }
// }

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const activePage = Number(searchParams.get("activePage")) || null;
  const pageSize = Number(searchParams.get("pageSize")) || null;

  let listOfRentedInventoryIDs: number[] = [];

  if (searchParams.get("fortnight") !== null) {
    const SQLRentedInventory =
      "Select itensnegocios.Pontos_pon_codigo from   itensnegocios Where  itensnegocios.biSemana_bi_codigo In (" +
      searchParams.get("fortnight") +
      ") And itensnegocios.Tipo In ('L','B','C','D','T','M')";
    const [responseRentedInventory] = await db.query(SQLRentedInventory);
    listOfRentedInventoryIDs = (responseRentedInventory as RowDataPacket[]).map(
      (obj) => (obj as { Pontos_pon_codigo: number }).Pontos_pon_codigo
    );
  }
  console.log("ID: " + searchParams.get("id"));
  console.log("is ID Null?");
  console.log(searchParams.get("id") === null);
  let SQL =
    "SELECT pon_codigo, pon_compl, LinkMapa, pon_iluminado, pon_alugado, pon_outd_pain FROM pontos LEFT JOIN Cidades ON Cidades.cid_codigo = pontos.Cidades_cid_codigo WHERE Pontos.pon_outd_pain = 'O' And pontos.pon_alugado = 'S'";

  const conditions = [];

  if (searchParams.get("id") !== null) {
    conditions.push("pon_codigo IN(" + searchParams.get("id") + ")");
  }

  if (searchParams.get("address") !== null) {
    conditions.push("pon_compl LIKE '%" + searchParams.get("address") + "%'");
  }

  if (searchParams.get("city") !== null) {
    conditions.push("Cidades_cid_codigo IN(" + searchParams.get("city") + ")");
  }

  if (searchParams.get("fortnight") !== null) {
    conditions.push("NOT pon_codigo IN(" + listOfRentedInventoryIDs + ")");
  }

  if (conditions.length > 0) {
    SQL += " AND " + conditions.join(" AND ");
  }

  console.log("SQL: " + SQL);
  if (pageSize !== null) {
    console.log("PAGE SIZE IS NOT NULL");
    const [fullResponse] = await db.query<RowDataPacket[]>(SQL);
    const totalPages = Math.ceil(fullResponse.length / pageSize);
    if (activePage !== null) {
      SQL +
        ` LIMIT ${pageSize} OFFSET ${
          pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1)
        }`;
    }
    const [paginatedResponse] = await db.query(SQL);
    const outdoors = paginatedResponse as Pontos[];
    const billboards: Billboard[] = outdoors.map((outdoor) => ({
      id: outdoor.pon_codigo,
      address: outdoor.pon_compl,
      coordinates: outdoor.LinkMapa ? outdoor.LinkMapa : "0,0",
      value: outdoor.pon_iluminado === "S" ? 1190 : 1090,
    }));
    const result = {
      data: billboards,
      totalPages,
    };
    return NextResponse.json(result);
  } else {
    console.log("PAGE SIZE IS NULL");
    const [response] = await db.query(SQL);
    const outdoors = response as Pontos[];
    const billboards: Billboard[] = outdoors.map((outdoor) => ({
      id: outdoor.pon_codigo,
      address: outdoor.pon_compl,
      coordinates: outdoor.LinkMapa ? outdoor.LinkMapa : "0,0",
      value: outdoor.pon_iluminado === "S" ? 1190 : 1090,
    }));
    const result = {
      data: billboards,
    };
    return NextResponse.json(result);
  }
}
