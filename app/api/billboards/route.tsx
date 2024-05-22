import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../utils/prisma";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("endereco");
  const page = searchParams.get("p");
  const perPage = 11;

  //Default: 12 entries per page

  if (address == null) {
    const billboards = await prisma.inventarios.findMany({
      where: {
        AND: [
          {
            tipoinventarios: {
              id: 1,
            },
          },
          {
            ativo: 1,
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
            ativo: 1,
          },
        ],
      },
    });

    const res = {
      billboards,
      totalPages: Math.floor(totalBillboards.length / perPage) + 1,
    };

    return NextResponse.json(res);
  } else {
    const billboards = await prisma.inventarios.findMany({
      where: {
        AND: [
          {
            tipoinventarios: {
              id: 1,
            },
          },
          {
            ativo: 1,
          },
          {
            Localizacao: {
              contains: address,
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
            ativo: 1,
          },
          {
            Localizacao: {
              contains: address,
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

    return NextResponse.json(res);
  }
}
