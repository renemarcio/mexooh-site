import { ShoppingCartDoneMail } from "@/components/ShoppingCartDoneMail";
import ShoppingCartReadyEmail from "@/emails/ShoppingCartReady";
import { resend } from "@/utils/resend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const { cart, name } = reqData;
  try {
    const { data, error } = await resend.emails.send({
      from: "Não Responda <naoresponda@mexooh.com>",
      to: ["brunoscachetti@hotmail.com"],
      subject: "Teste de envio de e-mail",
      react: ShoppingCartReadyEmail({ name, cart }),
      // text: "Teste de envio de e-mail",
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
