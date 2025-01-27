import { Pontos } from "@/types/databaseTypes";
import { Billboard } from "@/types/websiteTypes";
import { query } from "@/utils/mysqlConnection";
// import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
// import { bucket } from "@/utils/bucket";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const fortnights = searchParams.get("fortnights") || null;
  const id = searchParams.get("id") || null;
  const address = searchParams.get("address") || null;
  const city = searchParams.get("city") || null;
  const activePage = Number(searchParams.get("activePage")) || null;
  const pageSize = Number(searchParams.get("pageSize")) || null;
  const thumbnailUrl = `/photos/Outdoors/${String(id).padStart(6, "0")}.webp`;
  let listOfRentedInventoryIDs: number[] = [];
  if (fortnights !== null && fortnights !== "") {
    const SQLRentedInventory =
      "Select itensnegocios.Pontos_pon_codigo from   itensnegocios Where  itensnegocios.biSemana_bi_codigo In (" +
      fortnights +
      ") And itensnegocios.Tipo In ('L','B','C','D','T','M')";
    const responseRentedInventory = await query(SQLRentedInventory);
    listOfRentedInventoryIDs = (responseRentedInventory as RowDataPacket[]).map(
      (obj) => (obj as { Pontos_pon_codigo: number }).Pontos_pon_codigo
    );
  }

  let SQL =
    "SELECT pon_codigo, pon_compl, LinkMapa, pon_iluminado, pon_alugado, pon_outd_pain FROM pontos LEFT JOIN Cidades ON Cidades.cid_codigo = pontos.Cidades_cid_codigo WHERE Pontos.pon_outd_pain = 'O' And pontos.pon_alugado = 'S'";

  const conditions = [];

  if (id !== null) {
    conditions.push("pon_codigo IN(" + id + ")");

    // if (id.split(",").length === 1) {
    //   // const blob = await list({
    //   //   prefix: `Photos/Outdoor/${String(id).padStart(6, "0")}.`,
    //   // });
    //   // if (blob) {
    //   //   console.log("Blob: ", blob);
    //   // }
    // }
    //   const listCommand = new ListObjectsV2Command({
    //     Bucket: "mexooh-webapp-system-files",
    //     Prefix: `Photos/Outdoor/${String(id).padStart(6, "0")}.`,
    // });

    //   // const objList = await bucket.send(listCommand);

    //   if (objList.Contents && objList.Contents.length > 0) {
    //     const foundPic = objList.Contents[0];
    //     const command = new GetObjectCommand({
    //       Bucket: "mexooh-webapp-system-files",
    //       Key: foundPic.Key,
    //     });
    //     // signedUrl = await getSignedUrl(bucket, command, { expiresIn: 5 });
    //   }
    // }
  }

  if (address !== null) {
    conditions.push("pon_compl LIKE '%" + address + "%'");
  }

  if (city !== null) {
    conditions.push("Cidades_cid_codigo IN(" + city + ")");
  }

  if (fortnights !== null) {
    conditions.push("NOT pon_codigo IN(" + listOfRentedInventoryIDs + ")");
  }

  if (conditions.length > 0) {
    SQL += " AND " + conditions.join(" AND ");
  }

  if (pageSize !== null) {
    const fullResponse = (await query(SQL)) as Pontos[];
    const totalPages = Math.ceil(fullResponse.length / pageSize);
    if (activePage !== null) {
      SQL += ` LIMIT ${pageSize} OFFSET ${
        pageSize * (activePage - 1 <= 0 ? 0 : activePage - 1)
      }`;
    }
    const paginatedResponse = await query(SQL);
    const outdoors = paginatedResponse as Pontos[];
    const billboards: Billboard[] = outdoors.map((outdoor) => ({
      id: outdoor.pon_codigo,
      address: outdoor.pon_compl,
      coordinates: outdoor.LinkMapa ? outdoor.LinkMapa : "0,0",
      value: outdoor.pon_iluminado === "S" ? 1190 : 1090,
      thumbnailUrl,
    }));
    const result = {
      data: billboards,
      totalPages,
    };
    return NextResponse.json(result);
  } else {
    const response = await query(SQL);
    const outdoors = response as Pontos[];
    const billboards: Billboard[] = outdoors.map((outdoor) => ({
      id: outdoor.pon_codigo,
      address: outdoor.pon_compl,
      coordinates: outdoor.LinkMapa ? outdoor.LinkMapa : "0,0",
      value: outdoor.pon_iluminado === "S" ? 1190 : 1090,
      thumbnailUrl,
    }));
    const result = {
      data: billboards,
    };
    return NextResponse.json(result);
  }
}

// const command = new GetObjectCommand({
//   Bucket: "mexooh-webapp-system-files",
//   Key: `Logo/mex.png`,
// });
// const signedUrl = await getSignedUrl(bucket, command, { expiresIn: 5 });
// return new Response(JSON.stringify({ signedUrl }));
