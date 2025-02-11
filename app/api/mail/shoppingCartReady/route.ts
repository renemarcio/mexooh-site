import ShoppingCartReadyEmail from "@/emails/ShoppingCartReady";
import { resend } from "@/utils/resend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const { cart, user, service, telephones } = reqData;

  try {
    const { data, error } = await resend.emails.send({
      from: "Mex <naoresponda@mexooh.com>",
      to: ["atendimento@midiapaineis.com.br"], //production @ employee mail
      // to: ["criacao@midiapaineis.com.br"], //test @ employee mail
      // to: ["brunoscachetti@hotmail.com"], //test @ dev mail
      subject: "[Site Mex] Cliente fechou o carrinho!",
      react: ShoppingCartReadyEmail({ user, cart, telephones }),
    });

    if (error) {
      console.log("Erro ao enviar e-mail:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log("Erro ao enviar e-mail:", error);
    return Response.json({ error }, { status: 500 });
  }
}
