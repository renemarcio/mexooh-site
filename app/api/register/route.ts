import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const userPF = {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    pessoa: data.pessoa,
    fantasia: data.nome,
    cnpj_cpf: data.cpf,
  };

  const userPJ = {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    pessoa: data.pessoa,
    fantasia: data.fantasia,
    cnpj_cpf: data.cnpj,
  };

  async function createPhoneNumber(id: number) {
    //First, check if the phone already exists
    const phone = await prisma.telefones_clientes.findFirst({
      where: {
        cliente_id: id,
        Numero: data.telefone,
      },
    });
    //if it exists, do nothing, else, create it
    if (!phone) {
      const entry = await prisma.telefones_clientes.create({
        data: {
          cliente_id: id,
          Numero: data.telefone,
        },
      });
    }
  }

  // If there is a cpf coming in, pessoa == F, else pessoa == J
  delete data.confirmarSenha;

  let userData;
  if (data.cpf) {
    userData = userPF;
    userData.pessoa = "F";
    data.pessoa = "F";
    data.fantasia = data.nome;
    data.cnpj_cpf = data.cpf;
    delete data.cpf;
  } else {
    userData = userPJ;
    userData.pessoa = "J";
    data.pessoa = "J";
    data.cnpj_cpf = data.cnpj;
    delete data.cnpj;
  }

  // Check if a client already exists with the same document
  console.log("Client data:", data);
  const dbUser = await prisma.clientes.findFirst({
    where: {
      cnpj_cpf: data.cnpj_cpf,
    },
  });
  if (dbUser) {
    // If so, we'll check if it has an email, if it doesn't, update it, if it does, return an error
    if (!dbUser.email) {
      console.log("Client already exists with the same document");
      const user = await prisma.clientes.update({
        where: {
          cnpj_cpf: data.cnpj_cpf,
        },
        data: {
          email: data.email,
          password: data.password ? await bcrypt.hash(data.password, 10) : null,
        },
      });
      await createPhoneNumber(dbUser.id);
      return NextResponse.json(user, { status: 200 });
    } else {
      console.log(
        "Client already exists with the same document and email isn't empty"
      );
      return new NextResponse(
        JSON.stringify({
          error:
            "Client already exists with the same document and email isn't empty",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    // If not, create a new client
    console.log("Client does not exist with the same document");
    const user = await prisma.clientes.create({
      data: {
        ...userData,
        password: data.password ? await bcrypt.hash(data.password, 10) : null,
      },
    });
    await createPhoneNumber(user.id);
    return NextResponse.json(user, { status: 201 });
  }
}
