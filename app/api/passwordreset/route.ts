import { CadGeral, ProtocolosTrocaDeSenha } from "@/types/databaseTypes";
import { query } from "@/utils/mysqlConnection";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

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
    console.log(
      "Sending an email to " +
        email +
        " with a link to reset password, uuid = " +
        UUID +
        "."
    );
  } else {
    console.log("Email not found: ", email);
  }
  return NextResponse.json("OK", { status: 200 });
}

// Usuário manda request para redefinir a senha
// Se o e-mail existir, envia um link para redefinir a senha, senão, não faz nada (E não avisa o usuário)
// Cadastra no banco de dados um UUID para o pedido de redefinição, um protocolo, que seja.
// Junto, cria uma data de expiração para o pedido de redefinição. Vamos colocar 30 min.
// Quando o pedido de redefinição for concluido, marque como concluido.
