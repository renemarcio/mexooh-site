import { query } from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { Bisemana } from "@/types/databaseTypes";
import { Fortnight } from "@/types/websiteTypes";
import { ComboboxData } from "@mantine/core";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const activePage = Number(searchParams.get("activePage"));
  const pageSize = Number(searchParams.get("pageSize"));
  const id = searchParams.get("id") || null;
  const number = searchParams.get("number") || null;
  const years = searchParams.get("years") || null;
  const currentDate = searchParams.get("currentDate") || null;
  const asCombobox = searchParams.has("asCombobox");
  let SQL = `SELECT * FROM bisemana`;

  const conditions = [];
  if (id !== null) {
    conditions.push(`bi_codigo = IN(${id})`);
  }

  if (number !== null) {
    conditions.push(`bi_numero  IN(${number})`);
  }

  if (years !== null) {
    conditions.push(`bi_ano  IN(${years})`);
  }

  if (currentDate !== null) {
    conditions.push("bi_final > '" + currentDate + "'");
  }

  if (conditions.length > 0) {
    SQL += " WHERE " + conditions.join(" AND ");
  }

  try {
    let totalPages = 0;
    if (pageSize) {
      const totalResults = (await query(SQL)) as Bisemana[];
      totalPages = Math.ceil(totalResults.length / pageSize);
    }
    let resultingSQL = SQL;
    pageSize
      ? (resultingSQL =
          SQL +
          ` LIMIT ${pageSize} OFFSET ${
            pageSize * (pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1))
          }`)
      : null;

    const response = await query(resultingSQL);
    const bisemanas = response as Bisemana[];
    if (asCombobox) {
      const fortnights: ComboboxData = bisemanas.map((fortnight) => ({
        value: fortnight.bi_codigo.toString(),
        label: `${fortnight.bi_numero}-${
          fortnight.bi_ano
        } - (${fortnight.bi_inicio.getDate()}/${
          fortnight.bi_inicio.getMonth() + 1
        } - ${fortnight.bi_final.getDate()}/${
          fortnight.bi_final.getMonth() + 1
        })`,
      }));
      const result = {
        data: fortnights,
        totalPages: totalPages,
      };
      return NextResponse.json(result);
    } else {
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
    }
  } catch (error) {
    return NextResponse.json({
      error: error || "An unknown error has occurred",
    });
  }
}
