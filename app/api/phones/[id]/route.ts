import prisma from "@/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const phones = await prisma.telefones_clientes.findMany({
    where: {
      cliente_id: Number(id),
    },
  });

  return new Response(JSON.stringify({ phones }));
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await request.json();

  console.log(body);

  try {
    const phone = await prisma.telefones_clientes.create({
      data: {
        cliente_id: Number(id),
        Numero: body.phone,
        Tipo: "0",
      },
    });

    return new Response(JSON.stringify({ phone }));
  } catch (error) {
    return new Response(JSON.stringify({ error }));
  }
}
