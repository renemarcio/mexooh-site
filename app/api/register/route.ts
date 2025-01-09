import { CadGeral } from "@/types/databaseTypes";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { query } from "@/utils/mysqlConnection";
import { UserRegisterData } from "@/types/userRegisterData";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = (await req.json()) as UserRegisterData;
  //Transform this into a compatible variable for the DB
  let userData;
  if (data.cpf) {
    userData = {
      nome: data.nome,
      email: data.email,
      password: data.password,
      pessoa: "F",
      fantasia: data.nome,
      cnpj_cpf: data.cpf,
    };
  } else {
    userData = {
      nome: data.nome,
      email: data.email,
      password: data.password,
      pessoa: "J",
      fantasia: data.fantasia,
      cnpj_cpf: data.cnpj,
    };
  }
  //Check if a client exists with the same document.
  const dbUserResponse = (await query(
    `SELECT * FROM cadgeral WHERE cli_cnpj_cpf = ${userData.cnpj_cpf}`
  )) as CadGeral[];

  //If there is only one record, update with missing info, if needed. Else, something's wrong.
  if (dbUserResponse.length === 1) {
    const dbUser = dbUserResponse[0] as CadGeral;
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    if (!dbUser.email) {
      //No e-mail, update it.
      //In the previous route, with prisma, we used to update this client with the email and a new password.
      //We would also check if phone exists, if not, we'd create it.
      try {
        const updateResponse = await query(
          `UPDATE cadgeral SET email = ?, password = ?, Cliente = 1 WHERE cli_cnpj_cpf = ?`,
          [userData.email, encryptedPassword, userData.cnpj_cpf]
        );
        console.log(updateResponse);
        //Return HTTP 200 OK
        return NextResponse.json(updateResponse, { status: 200 });
      } catch (error) {
        return NextResponse.json(error, { status: 500 });
      }
    } else {
      //E-mail already exists, do nothing.
      //In the previous route, with prisma, we threw an error.
      //Return HTTP 400 Bad Request
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 400 }
      );
    }
  } else {
    //If the client doesn't exist, create it.
    try {
      const encryptedPassword = await bcrypt.hash(data.password, 10);
      const insertResponse = await query(
        `INSERT INTO cadgeral (nome, email, password, cli_pessoa, cli_rz_social, cli_cnpj_cpf, Cliente) VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [
          userData.nome,
          userData.email,
          encryptedPassword,
          userData.pessoa,
          userData.fantasia,
          userData.cnpj_cpf,
        ]
      );
      console.log(insertResponse);
      //Return HTTP 201 Created
      return NextResponse.json(insertResponse, { status: 201 });
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }
}
