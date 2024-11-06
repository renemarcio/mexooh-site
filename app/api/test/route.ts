import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { Bisemana } from "@/types/databaseTypes";
import { SELECTBuilder } from "@/lib/SQLBuilder";

export async function GET(req: NextRequest) {
  //SQL Base
  const searchParams = req.nextUrl.searchParams;
  const activePage = Number(searchParams.get("activePage"));
  const pageSize = Number(searchParams.get("pageSize"));

  //Valid Params
  const SQLConditions: { [key: string]: (value: string) => string } = {
    id: (value: string) => `bi_codigo IN(${value})`,
    number: (value: string) => `bi_numero IN(${value})`,
    years: (value: string) => `bi_ano IN(${value})`,
  };

  const FilteredSQL = SELECTBuilder(
    searchParams,
    "bisemana",
    undefined,
    SQLConditions
  );

  try {
    if (pageSize) {
      console.log("Tamanho da página: ", pageSize);
      const [totalResults] = await db.query<RowDataPacket[]>(FilteredSQL);
      console.log("Resultados totais: ", totalResults.length);
      console.log(
        "Número total de páginas: ",
        Math.ceil(totalResults.length / pageSize)
      );
    }
    let resultingSQL = FilteredSQL;
    pageSize
      ? (resultingSQL =
          FilteredSQL +
          ` LIMIT ${pageSize} OFFSET ${pageSize * (activePage - 1)}`)
      : null;

    console.log("SQL resultante: ", resultingSQL);
    const [response] = await db.query<RowDataPacket[]>(resultingSQL);
    const fortnights: Bisemana[] = response.map((fortnight) => ({
      id: fortnight.codigo,
      numero: fortnight.bi_numero,
      ano: fortnight.bi_ano,
      inicio: fortnight.bi_inicio,
      fim: fortnight.bi_final,
    }));
    const result = {
      data: fortnights,
    };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      error: error || "An unknown error has occurred",
    });
  }
}
