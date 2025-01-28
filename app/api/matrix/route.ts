import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { MatrixDataType } from "@/types/websiteTypes";
import Papa from "papaparse";

interface MatrixCSVType {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  kind: string;
  media: string;
}

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "utils/EXEMPLO MATRIZ.csv");
  const address = req.nextUrl.searchParams.get("address") || null;
  const id = req.nextUrl.searchParams.get("id") || null;
  let currentPage = Number(req.nextUrl.searchParams.get("page")) || 1;
  const pageSize = 15;
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const parsedContent = Papa.parse(fileContent, {
    header: true,
  });
  let matrixData: MatrixDataType[] = (
    parsedContent.data as MatrixCSVType[]
  ).map((row) => ({
    id: row.id,
    address: row.name,
    coordinates: row.latitude + ", " + row.longitude,
    type: row.kind,
    media: row.media,
  }));
  try {
    if (address) {
      matrixData = matrixData.filter((row) =>
        row.address.toLowerCase().includes(address.toLowerCase())
      );
    }
    if (id) {
      // matrixData = matrixData.filter((row) => row.id.includes(id));
      matrixData = matrixData.filter((row) => row.id === id);
    }
    const numberOfPages = Math.ceil(matrixData.length / pageSize);
    //if current page exceeds the page limit, limit it to last page
    currentPage = currentPage > numberOfPages ? numberOfPages : currentPage;
    matrixData = matrixData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    const response = {
      data: matrixData,
      numberOfPages: numberOfPages,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
