import { Paper, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import React from "react";

export default function RegisterPJForm() {
  const form = useForm({
    initialValues: {
      nome: "",
      fantasia: "",
      email: "",
      cnpj: "",
      password: "",
      confirmarSenha: "",
    },

    validate: {
      confirmarSenha: (value, values) =>
        value !== values.password ? "As senhas precisam ser iguais" : null,
    },
  });

  async function handleSubmit(values: any) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(res);
    if (res.ok) {
      modals.closeAll();
    } else {
      console.log("Error");
      console.log(await res.json());
    }
  }

  return (
    <Paper w={"400px"} withBorder p={"lg"}>
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Stack>
          <TextInput
            required
            {...form.getInputProps("nome")}
            label="Nome da empresa"
          />
          <TextInput
            required
            {...form.getInputProps("fantasia")}
            label="Nome fantasia da empresa"
          />
          <TextInput required {...form.getInputProps("email")} label="Email" />
          <TextInput required {...form.getInputProps("cnpj")} label="CNPJ" />
          <PasswordInput
            required
            {...form.getInputProps("password")}
            label="Senha"
          />
          <PasswordInput
            required
            {...form.getInputProps("confirmarSenha")}
            label="Repita a senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Stack>
      </form>
    </Paper>
  );
}
