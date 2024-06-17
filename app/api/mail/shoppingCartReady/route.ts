import ShoppingCartReadyEmail from "@/emails/ShoppingCartReady";
import { resend } from "@/utils/resend";
import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const { cart, user } = reqData;

  try {
    const { data, error } = await resend.emails.send({
      from: "Não Responda <naoresponda@mexooh.com>",
      to: ["brunoscachetti@hotmail.com"],
      subject: "[Site Mex] Cliente fechou o carrinho!",
      react: ShoppingCartReadyEmail({ user, cart }),
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
