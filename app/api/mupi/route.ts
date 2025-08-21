import { Pontos } from "../../../types/databaseTypes";
import { MUPI } from "../../../types/websiteTypes";
import { query } from "../../../utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    // Exemplo de resultado
    const result = {
      data: [/* seus dados aqui */],
      totalPages: 5,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
