import GeneratePIPDF from "@/PDFTemplates/PI/PIPDF";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Currently unused.
  return NextResponse.json(req, { status: 200 });
}
