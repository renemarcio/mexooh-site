import { CadGeral, ProtocolosTrocaDeSenha } from "@/types/databaseTypes";
import { query, transaction } from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { resend } from "@/utils/resend";
import PasswordResetEmail from "@/emails/PasswordReset";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const UUID = searchParams.get("uuid");
  const protocolFetchResponse = (await query(
    "SELECT * FROM protocolos_troca_de_senha WHERE UUID = ? AND concluido = 0 AND dataCriacao >= NOW() - INTERVAL 30 MINUTE;",
    [UUID]
  )) as ProtocolosTrocaDeSenha[];
  if (protocolFetchResponse.length != 1)
    return NextResponse.json("Conflict", { status: 409 });
  const protocol = protocolFetchResponse[0] as ProtocolosTrocaDeSenha;
  return NextResponse.json({ message: "OK" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const incomingUUID = req.nextUrl.searchParams.get("uuid");
  console.log("Request: ", req);
  console.warn("Incoming request from: ", req.headers.get("x-forwarded-for"));
  const city = req.headers.get("x-vercel-ip-city");
  const state = req.headers.get("x-vercel-ip-country-region");
  const countryCode = req.headers.get("x-vercel-ip-country");
  if (countryCode) {
    const displayNames = new Intl.DisplayNames([countryCode], {
      type: "region",
    });
    const location = city + ", " + state + " - " + displayNames.of(countryCode);
    console.warn("Location: ", location);
  }
  if (incomingUUID) {
    console.log("Has incomingUUID");
    console.log("UUID: ", incomingUUID);
    const protocolResponse = (await query(
      "SELECT * FROM protocolos_troca_de_senha WHERE UUID = ? AND concluido = 0 AND dataCriacao >= NOW() - INTERVAL 30 MINUTE;",
      [incomingUUID]
    )) as ProtocolosTrocaDeSenha[];
    if (protocolResponse.length != 1)
      return NextResponse.json("Conflict", { status: 409 });
    const body = await req.json();
    const password = body.password;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const changePasswordQuery = await transaction(
      [
        `UPDATE cadgeral SET cadgeral.password = ? WHERE cadgeral.Cad_codigo = ?;`,
        `UPDATE protocolos_troca_de_senha SET protocolos_troca_de_senha.concluido = 1 WHERE protocolos_troca_de_senha.UUID = ? AND protocolos_troca_de_senha.dataCriacao >= NOW() - INTERVAL 30 MINUTE;`,
      ],
      [[encryptedPassword, protocolResponse[0].cadgeral_id], [incomingUUID]]
    );

    console.log("changePasswordQuery: ", changePasswordQuery);
    return NextResponse.json("OK", { status: 200 });
  }
  const body = await req.json();
  const email = body.email;
  const SQL = `SELECT * FROM cadgeral WHERE email = ?`;
  const cadgeral = (await query(SQL, [email])) as CadGeral[];
  if (cadgeral.length === 1) {
    console.log("Email found: ", cadgeral[0].email);
    const UUID = randomUUID();
    //Find the user with the email
    const userFetchResponse = (await query(
      "SELECT * FROM cadgeral WHERE email = ? AND Cliente = 1",
      [email]
    )) as CadGeral[];
    const user = userFetchResponse[0] as CadGeral;
    console.log("User: ", user);
    const userID = user.Cad_codigo;
    console.log("User ID: ", userID);
    console.log("UUID: ", UUID);
    query(
      "INSERT INTO protocolos_troca_de_senha (UUID, cadgeral_id) VALUES (?, ?)",
      [UUID, userID]
    );
    // const response = await sendMail(email, UUID, user);
    await sendMail(email, UUID, user);
  }
  return NextResponse.json("OK", { status: 200 });
}

async function sendMail(mail: string, uuid: string, user: CadGeral) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mex <naoresponda@mexooh.com>",
      to: [mail],
      // to: ["brunoscachetti@hotmail.com"], //test @ dev mail
      subject: "Recuperação de senha MexOOH",
      react: PasswordResetEmail({ user, uuid }),
    });

    if (error) {
      console.log("Erro ao enviar e-mail:", error);
      return Response.json({ error }, { status: 500 });
    } else {
      console.log("E-mail enviado!");
    }
    return Response.json(data);
  } catch (error) {
    console.log("Erro ao enviar e-mail:", error);
    return Response.json({ error }, { status: 500 });
  }
}

// Usuário manda request para redefinir a senha
// Se o e-mail existir, envia um link para redefinir a senha, senão, não faz nada (E não avisa o usuário)
// Cadastra no banco de dados um UUID para o pedido de redefinição, um protocolo, que seja.
// Junto, cria uma data de expiração para o pedido de redefinição. Vamos colocar 30 min.
// Quando o pedido de redefinição for concluido, marque como concluido.
