import { query } from "@/utils/mysqlConnection";


import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await query("SELECT 1 + 1 AS result");
    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
