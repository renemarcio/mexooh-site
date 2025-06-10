import { Cidade } from "@/types/databaseTypes";
import { City } from "@/types/websiteTypes";
import { query } from "@/utils/mysqlConnection";
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
    conditions.push(
      `pontos.pon_outd_pain IN(${allTypesWithQuotes}) AND pontos.pon_alugado = 'S'`
    );
  }
  // +`ORDER BY cid_nome ASC`;

  if (conditions.length > 0) {
    SQL += " WHERE " + conditions.join(" AND ");
  }

  SQL += " ORDER BY cid_nome ASC";

  const response = (await query(SQL)) as Cidade[];
  const cidades = response.map((city) => {
    if (city.cid_nome === "OSASCO") {
      return {
        ...city,
        cid_nome: "ALPHAVILLE",
      };
    } else {
      return city;
    }
  }) as Cidade[];
  // const cidades = response as Cidade[];
  const cities: City[] = cidades.map((cidade) => {
    return {
      id: cidade.cid_codigo,
      name: cidade.cid_nome,
      state: cidade.cid_uf,
    };
  });

if (searchParams.get("asCombobox")) {
  try {
    if (!cities || cities.length === 0) {
      return NextResponse.json({ data: [] });
    }

    const comboboxData = cities.map((city) => ({
      label: city.name,
      value: city.id.toString(),
    }));

    return NextResponse.json({ data: comboboxData });
  } catch (err) {
    console.error("Erro ao montar combobox de cidades:", err);
    return NextResponse.json({ data: [], error: "Erro interno" }, { status: 500 });
  }
}
}
