import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { InfoOOHPanelInfoType } from "@/types/websiteTypes";
import Papa from "papaparse";

//Either return a single value or all of them, in case no ID comes in.

interface InfoOOHPanelCSV {
  id: number;
  lat: number;
  long: number;
  dailyImpacts: number;
  monthlyImpacts: number;
  value: number;
  CPM30: number;
  CPM14: number;
  CPM7: number;
  CPM1: number;
}

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "utils/IMPACTOS_PAINEL.csv");
  const id = req.nextUrl.searchParams.get("id") || null;
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const parsedContent = Papa.parse(fileContent, {
    header: true,
  });
  let panelData: InfoOOHPanelInfoType[] = (
    parsedContent.data as InfoOOHPanelCSV[]
  ).map((row) => ({
    id: row.id,
    latitude: row.lat,
    longitude: row.long,
    dailyImpacts: row.dailyImpacts,
    monthlyImpacts: row.monthlyImpacts,
    value: row.value,
    CPM30: row.CPM30,
    CPM14: row.CPM14,
    CPM7: row.CPM7,
    CPM1: row.CPM1,
  }));
  try {
    if (id) {
      panelData = panelData.filter((row) => row.id.toString() === id);
    }
    const response = {
      data: panelData,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
