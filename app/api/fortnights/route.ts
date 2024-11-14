import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { Bisemana } from "@/types/databaseTypes";
import { SELECTBuilder } from "@/lib/SQLBuilder";
import { Fortnight } from "@/types/websiteTypes";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const activePage = Number(searchParams.get("activePage"));
  const pageSize = Number(searchParams.get("pageSize"));

  const SQLConditions: { [key: string]: (value: string) => string } = {
    id: (value: string) => `bi_codigo = ${value}`,
    number: (value: string) => `bi_numero = ${value}`,
    years: (value: string) => `bi_ano IN(${value})`,
    currentDate: (value: string) => `bi_final > '${value}'`,
  };

  const FilteredSQL = SELECTBuilder(
    searchParams,
    "bisemana",
    undefined,
    SQLConditions
  );

  try {
    let totalPages = 0;
    if (pageSize) {
      const [totalResults] = await db.query<RowDataPacket[]>(FilteredSQL);
      totalPages = Math.ceil(totalResults.length / pageSize);
    }
    let resultingSQL = FilteredSQL;
    pageSize
      ? (resultingSQL =
          FilteredSQL +
          ` LIMIT ${pageSize} OFFSET ${
            pageSize * (pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1))
          }`)
      : null;

    const [response] = await db.query<RowDataPacket[]>(resultingSQL);
    const bisemanas = response as Bisemana[];
    const fortnights: Fortnight[] = bisemanas.map((fortnight) => ({
      id: fortnight.bi_codigo,
      number: fortnight.bi_numero,
      year: fortnight.bi_ano,
      start: fortnight.bi_inicio,
      finish: fortnight.bi_final,
    }));
    const result = {
      data: fortnights,
      totalPages: totalPages,
    };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      error: error || "An unknown error has occurred",
    });
  }
}
