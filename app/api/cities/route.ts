// import { NextResponse, NextRequest } from "next/server";
// import prisma from "../../../utils/prisma";
// export async function GET(req: NextRequest) {
//   const allCitiesResults = await prisma.inventarios.findMany({
//     distinct: ["cidade"],
//     orderBy: {
//       cidade: "asc",
//     },
//     select: {
//       cidade: true,
//     },
//   });
//   const cities = allCitiesResults.map((city) => city.cidade);
//   return NextResponse.json(cities);
// }

import { SELECTBuilder, WHEREBuilder } from "@/lib/SQLBuilder";
import { Cidade } from "@/types/databaseTypes";
import { City } from "@/types/websiteTypes";
import db from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const validParams: { [key: string]: (value: string) => string } = {
    id: (value: string) => `cid_codigo = ${value}`,
    name: (value: string) => `cid_nome = '${value}'`,
    state: (value: string) => `cid_uf = '${value}'`,
    type: (value: string) => `pontos.pon_outd_pain = '${value}'`,
  };

  console.log("searchParams type", searchParams.get("type"));

  const SQL =
    `SELECT DISTINCT cid_nome, cid_codigo, cid_uf FROM cidades RIGHT JOIN pontos ON pontos.Cidades_cid_codigo = cid_codigo` +
    WHEREBuilder(searchParams, validParams) +
    " ORDER BY cid_nome ASC";

  console.log("Test", SQL);
  let tables = "cidades";

  if (searchParams.get("type") !== null) {
    tables += ` RIGHT JOIN pontos ON pontos.Cidades_cid_codigo = cid_codigo`;
  }

  const FilteredSQL = SELECTBuilder(
    searchParams,
    tables,
    undefined,
    validParams,
    "NOT cid_nome = ''",
    "cid_nome ASC"
  );

  const [response] = await db.query(SQL);
  const cidades = response as Cidade[];
  const cities: City[] = cidades.map((cidade) => {
    return {
      id: cidade.cid_codigo,
      name: cidade.cid_nome,
      state: cidade.cid_uf,
    };
  });

  if (searchParams.get("asCombobox")) {
    const comboboxData = cities.map((city) => {
      return {
        label: city.name,
        value: city.id.toString(),
      };
    });
    return NextResponse.json({ data: comboboxData });
  }
  return NextResponse.json({ data: cities });
}
