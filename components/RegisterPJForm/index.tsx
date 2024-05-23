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
      senha: "",
      confirmarSenha: "",
    },

    validate: {
      confirmarSenha: (value, values) =>
        value !== values.senha ? "As senhas precisam ser iguais" : null,
    },
  });

  function handleSubmit(values: any) {
    console.log(values);
    modals.closeAll();
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
            {...form.getInputProps("senha")}
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
