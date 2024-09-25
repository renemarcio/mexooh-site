import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/prisma";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("endereco") || undefined;
  const city = searchParams.get("cidade") || undefined;
  const page = searchParams.get("p") || undefined;
  const perPage = 11;

  const panels = await prisma.inventarios.findMany({
    where: {
      AND: [
        {
          tipoinventarios: {
            id: 4,
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
    take: perPage,
    skip: (Number(page) - 1) * perPage,
  });
  const totalPanels = await prisma.inventarios.findMany({
    where: {
      AND: [
        {
          tipoinventarios: {
            id: 2,
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
    panels,
    totalPages: Math.floor(totalPanels.length / perPage) + 1,
  };

  return NextResponse.json(res);
}
