import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  console.log(searchParams.get("id") !== null);
  const SQL = `SELECT id FROM alugadas ${
    searchParams.get("id") !== null
      ? "WHERE inventario = " + searchParams.get("id")
      : ""
  }`;
  const [results] = await db.query<RowDataPacket[]>(SQL);
  return NextResponse.json(results);
}
