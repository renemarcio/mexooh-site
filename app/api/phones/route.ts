// // import prisma from "@/utils/prisma";

import { query } from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;

//   const phones = await prisma.telefones_clientes.findMany({
//     where: {
//       cliente_id: Number(id),
//     },
//   });

//   return new Response(JSON.stringify({ phones }));
// }

// export async function POST(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const body = await request.json();

//   console.log(body);

//   try {
//     const phone = await prisma.telefones_clientes.create({
//       data: {
//         cliente_id: Number(id),
//         Numero: body.phone,
//       },
//     });

//     return new Response(JSON.stringify({ phone }));
//   } catch (error) {
//     return new Response(JSON.stringify({ error }));
//   }
// }

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || null;
  let SQL = `SELECT * FROM telefones`;

  if (id !== null) {
    SQL += ` WHERE cadGeral_cad_codigo = ${id}`;
  }
  try {
    const response = await query(SQL);
    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const number = body.number;
  const userID = body.userID;
  const type = body.type;

  const SQL = `INSERT INTO telefones(Numero, cadGeral_cad_codigo, Tipo) VALUES (?,?,?)`;
  try {
    const response = await query(SQL, [number, userID, type]);
    console.log(response);
    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
