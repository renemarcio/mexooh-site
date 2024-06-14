import { bucket } from "@/utils/bucket";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  const command = new GetObjectCommand({
    Bucket: "mexooh-webapp-system-files",
    Key: `Logo/mex.png`,
  });
  const signedUrl = await getSignedUrl(bucket, command, { expiresIn: 5 });
  return new Response(JSON.stringify({ signedUrl }));
}
