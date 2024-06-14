import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const availableFortnightsIDs = await prisma.disponibilidades.findMany({
      where: {
        AND: [
          {
            inventario: Number(id),
          },
          {
            // disponivel: true, //godamnit dad, put the things as true...
            disponivel: false,
          },
        ],
      },
      select: { id_bisemana: true },
    });
    return NextResponse.json(availableFortnightsIDs);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
