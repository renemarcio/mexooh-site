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
  const asCombobox = searchParams.get("asCombobox");

  try {
    let SQL = `
      SELECT DISTINCT cid_nome, cid_codigo, cid_uf
      FROM cidades
      RIGHT JOIN pontos ON pontos.Cidades_cid_codigo = cid_codigo
    `;

    const conditions = [];

    if (id) {
      conditions.push(`cid_codigo IN(${id})`);
    }
    if (name) {
      conditions.push(`cid_nome LIKE "%${name}%"`);
    }
    if (state) {
      conditions.push(`cid_uf IN(${state})`);
    }
    if (type) {
      const allTypes = type.split(",");
      const allTypesWithQuotes = allTypes.map((t) => `"${t}"`).join(",");
      conditions.push(
        `pontos.pon_outd_pain IN(${allTypesWithQuotes}) AND pontos.pon_alugado = 'S'`
      );
    }

    if (conditions.length > 0) {
      SQL += " WHERE " + conditions.join(" AND ");
    }

    SQL += " ORDER BY cid_nome ASC";

    const response = (await query(SQL)) as Cidade[];

    const cidades = response.map((city) =>
      city.cid_nome === "OSASCO"
        ? { ...city, cid_nome: "ALPHAVILLE" }
        : city
    );

    const cities: City[] = cidades.map((cidade) => ({
      id: cidade.cid_codigo,
      name: cidade.cid_nome,
      state: cidade.cid_uf,
    }));

    if (asCombobox) {
      const comboboxData = cities.map((city) => ({
        label: city.name,
        value: city.id.toString(),
      }));
      return NextResponse.json({ data: comboboxData });
 
    }

    return NextResponse.json({ data: cities });
  } catch (err) {
    console.error("Erro ao buscar cidades:", err);
    return NextResponse.json(
      { data: [], error: "Erro ao buscar cidades" },
      { status: 500 }
    );
  }
}
