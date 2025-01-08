import { query } from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || null;
  let SQL = `SELECT * FROM telefones`;

  if (id !== null) {
    SQL += ` WHERE cadGeral_cad_codigo = ${id}`;
  }
  try {
    const response = await query(SQL);
    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const number = body.number;
  const userID = body.userID;
  const type = body.type;

  const SQL = `INSERT INTO telefones(Numero, cadGeral_cad_codigo, Tipo) VALUES (?,?,?)`;
  try {
    const response = await query(SQL, [number, userID, type]);
    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
