import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { Bisemana } from "@/types/databaseTypes";
import { SELECTBuilder } from "@/lib/SQLBuilder";
import { Fortnight } from "@/types/websiteTypes";

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
    const bisemanas = response as Bisemana[];
    const fortnights: Fortnight[] = bisemanas.map((fortnight: Bisemana) => ({
      id: fortnight.bi_codigo,
      number: fortnight.bi_numero,
      year: fortnight.bi_ano,
      start: fortnight.bi_inicio,
      finish: fortnight.bi_final,
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
