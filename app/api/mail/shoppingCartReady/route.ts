import ShoppingCartReadyEmail from "@/emails/ShoppingCartReady";
import { resend } from "@/utils/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const { cart, user, service, telephones } = reqData;

  try {
    const { data, error } = await resend.emails.send({
      from: "Mex <naoresponda@mexooh.com>",
      to: ["atendimento@midiapaineis.com.br"], // produção
      subject: "[Site Mex] Cliente fechou o carrinho!",
      react: ShoppingCartReadyEmail({ user, cart, telephones }),
    });

    if (error) {
      console.log("Erro ao enviar e-mail:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("Erro ao enviar e-mail:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
