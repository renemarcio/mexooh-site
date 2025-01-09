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
  try {
    // const filePath = "utils/EXEMPLO MATRIZ.csv";
    const filePath = path.join(process.cwd(), "utils/EXEMPLO MATRIZ.csv");
    const address = req.nextUrl.searchParams.get("address") || null;
    const id = req.nextUrl.searchParams.get("id") || null;
    const currentPage = req.nextUrl.searchParams.get("page") || 1;
    const pageSize = 15;
    //   const fileContent = fs
    //     .readFileSync(filePath, { encoding: "utf-8" })
    //     .split("\r\n")
    //     .slice(1)
    //     .map((line) => line.split(","));
    //   const matrixData: MatrixDataType[] = fileContent.map((row) => ({
    //     id: row[0],
    //     address: row[1],
    //     coordinates: row[2] + ", " + row[3],
    //     type: row[4],
    //   }));
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
    if (address) {
      matrixData = matrixData.filter((row) =>
        row.address.toLowerCase().includes(address.toLowerCase())
      );
    }
    if (id) {
      // matrixData = matrixData.filter((row) => row.id.includes(id));
      matrixData = matrixData.filter((row) => row.id === id);
    }
    //Pagination
    const numberOfPages = Math.ceil(matrixData.length / pageSize);
    matrixData = matrixData.slice(
      Number(currentPage) * pageSize,
      (Number(currentPage) + 1) * pageSize
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
