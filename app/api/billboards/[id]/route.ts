// import { bucket } from "@/utils/bucket";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// // import prisma from "@/utils/prisma";
// import { GetObjectCommand } from "@aws-sdk/client-s3";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const billboard = await prisma.inventarios.findFirst({
//     where: {
//       id: Number(id),
//     },
//   });

//   const availableFortnights = await prisma.bisemanas.findMany({
//     where: {
//       NOT: {
//         alugadas: {
//           some: {
//             inventario: Number(id),
//           },
//         },
//       },
//     },
//   });

//   const command = new GetObjectCommand({
//     Bucket: "mexooh-webapp-system-files",
//     Key: `Photos/Outdoor/${id}.jpg`,
//   });
//   const signedUrl = await getSignedUrl(bucket, command, { expiresIn: 5 });
//   return new Response(
//     JSON.stringify({ ...billboard, signedUrl, availableFortnights })
//   );
// }
