import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const destination = path.join(process.cwd(), "public/uploadedFiles/");
  const formData = await req.formData();
  console.log("Request: ", req);
  console.log("File: ", formData.get("file"));
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json("Arquivo ausente", { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  try {
    await writeFile(destination + filename, buffer);
    return NextResponse.json("Arquivo salvo", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
