import { Cidade } from "@/types/databaseTypes";
import { City } from "@/types/websiteTypes";
import db from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || null;
  const name = searchParams.get("name") || null;
  const state = searchParams.get("state") || null;
  const type = searchParams.get("type") || null;

  let SQL = `SELECT DISTINCT cid_nome, cid_codigo, cid_uf FROM cidades RIGHT JOIN pontos ON pontos.Cidades_cid_codigo = cid_codigo `;

  const conditions = [];
  if (id !== null) {
    conditions.push("cid_codigo IN( " + id + " )");
  }
  if (name !== null) {
    conditions.push("cid_nome LIKE %" + name + "%");
  }
  if (state !== null) {
    conditions.push("cid_uf IN(" + state + ")");
  }
  if (type !== null) {
    const allTypes = type.split(",");
    const allTypesWithQuotes = allTypes.map((type) => `"${type}"`).join(",");
    conditions.push(`pontos.pon_outd_pain IN(${allTypesWithQuotes})`);
  }
  // +`ORDER BY cid_nome ASC`;

  if (conditions.length > 0) {
    SQL += " WHERE " + conditions.join(" AND ");
  }

  SQL += " ORDER BY cid_nome ASC";

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
