import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const maxFileSizeInBytes = 5 * 1000 * 1000; //5MB
  const destination = path.join(process.cwd(), "public/uploadedFiles/");
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json("Arquivo ausente", { status: 400 });
  console.log(file.size);
  if (file.size > maxFileSizeInBytes)
    return NextResponse.json("Arquivo muito grande", { status: 400 });
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
