import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/prisma";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("endereco") || undefined;
  const city = searchParams.get("cidade") || undefined;
  const page = searchParams.get("p") || undefined;
  const perPage = 11;

  const billboards = await prisma.inventarios.findMany({
    where: {
      AND: [
        {
          tipoinventarios: {
            id: 1,
          },
        },
        {
          ativo: true,
        },
        {
          Localizacao: {
            contains: address,
          },
        },
        {
          cidade: {
            contains: city,
          },
        },
      ],
    },
    select: {
      id: true,
      Localizacao: true,
      Face: true,
      Iluminado: true,
      LinkGoogleMaps: true,
      uf: true,
      cidade: true,
    },
    take: perPage,
    skip: (Number(page) - 1) * perPage,
  });
  const totalBillboards = await prisma.inventarios.findMany({
    where: {
      AND: [
        {
          tipoinventarios: {
            id: 1,
          },
        },
        {
          ativo: true,
        },
        {
          Localizacao: {
            contains: address,
          },
        },
        {
          cidade: {
            contains: city,
          },
        },
      ],
    },
  });

  const res = {
    billboards,
    totalPages: Math.floor(totalBillboards.length / perPage) + 1,
  };
  console.log(res);

  console.log(address);
  console.log(city);
  console.log(page);

  return NextResponse.json(res);
  // }
}
