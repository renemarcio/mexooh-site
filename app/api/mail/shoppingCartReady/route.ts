import { ShoppingCartDoneMail } from "@/components/ShoppingCartDoneMail";
import { resend } from "@/utils/resend";

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Não Responda <naoresponda@mexooh.com>",
      to: ["brunoscachetti@hotmail.com"],
      subject: "Teste de envio de e-mail",
      react: ShoppingCartDoneMail({ name: "Bruno" }),
      text: "Teste de envio de e-mail",
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
