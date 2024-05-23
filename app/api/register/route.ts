import bcrypt from "bcrypt";
import prisma from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { clientes } from "@prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  // If there is a cpf coming in, pessoa == F, else pessoa == J
  delete data.confirmarSenha;

  if (data.cpf) {
    data.pessoa = "F";
    data.fantasia = data.nome;
    data.cnpj_cpf = data.cpf;
    delete data.cpf;
  } else {
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
        ...data,
        password: data.password ? await bcrypt.hash(data.password, 10) : null,
      },
    });
    return NextResponse.json(user, { status: 201 });
  }

  //   try {
  //     const user = await prisma.clientes.create({
  //       data: {
  //         ...data,
  //         password: data.senha ? await bcrypt.hash(data.senha, 10) : null,
  //       },
  //     });

  //     return NextResponse.json(user, { status: 201 });
  //   } catch (err: any) {
  //     if (err instanceof PrismaClientKnownRequestError) {
  //       const errorMessage = JSON.stringify({
  //         error: "Prisma Error: " + err.message,
  //       });
  //       return new NextResponse(errorMessage, {
  //         status: 500,
  //         headers: { "Content-Type": "application/json" },
  //       });
  //     }

  //     // Handle other errors
  //     const errorMessage = JSON.stringify({
  //       error: "Unknown Error: " + (err.message || "Unknown error"),
  //     });
  //     return new NextResponse(errorMessage, {
  //       status: 500,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   }
}
