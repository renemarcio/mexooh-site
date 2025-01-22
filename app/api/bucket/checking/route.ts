// import { ListObjectsV2Command } from "@aws-sdk/client-s3";
// import { bucket } from "@/utils/bucket";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  // const response = await bucket.send(
  //   new ListObjectsV2Command({
  //     Bucket: "mexooh-webapp-system-files",
  //     Prefix: "/Photos/",
  //     Delimiter: "/",
  //   })
  // );

  return NextResponse.json("Bucket not set");
}
