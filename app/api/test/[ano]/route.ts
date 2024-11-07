import db from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { ano: string } }
) {
  const [response] = await db.query(
    `SELECT bi_codigo, bi_numero, bi_ano FROM bisemana WHERE bi_ano = ${params.ano}`
  );

  return NextResponse.json(response);
}
