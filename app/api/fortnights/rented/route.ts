import { Bisemana } from "@/types/databaseTypes";
import { Fortnight } from "@/types/websiteTypes";
import { query } from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") || null;
  if (id === null) return NextResponse.json({ data: [] });
  const SQL =
    "Select * From BiSemana Where bisemana.bi_codigo In  (Select itensnegocios.biSemana_bi_codigo from   itensnegocios Where  itensnegocios.Pontos_pon_codigo = ?         And    itensnegocios.Tipo In ('L','B','C','D','T','M')  And    itensnegocios.biSemana_bi_codigo is not null    )And bisemana.bi_inicio >= CURDATE() Order By bi_inicio;";
  const results = (await query(SQL, [id])) as Bisemana[];
  const fortnights: Fortnight[] = results.map((fortnight) => ({
    id: fortnight.bi_codigo,
    number: fortnight.bi_numero,
    year: fortnight.bi_ano,
    start: fortnight.bi_inicio,
    finish: fortnight.bi_final,
  }));
  if (searchParams.get("asCombobox")) {
    const comboboxData = fortnights.map((fortnight) => {
      return {
        //@ts-ignore
        label: "" + fortnight.number + "/" + fortnight.year,
        value: fortnight.id.toString(),
      };
    });
    return NextResponse.json({ data: comboboxData });
  }
  return NextResponse.json({ data: fortnights });
}
