import {
  Paper,
  Stack,
  TextInput,
  Button,
  PasswordInput,
  InputBase,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import React from "react";
import { IMaskInput } from "react-imask";
import { isCPFValid } from "@/utils/documentValidation";

export default function RegisterPFForm() {
  const form = useForm({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
      password: "",
      confirmarSenha: "",
      telefone: "",
    },

    validate: {
      confirmarSenha: (value, values) =>
        value !== values.password ? "As senhas precisam ser iguais" : null,
      cpf: (value) => (isCPFValid(value) ? null : "CPF inválido"),
    },
    validateInputOnBlur: true,
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
          <TextInput required {...form.getInputProps("nome")} label="Nome" />
          <TextInput required {...form.getInputProps("email")} label="Email" />
          <InputBase
            required
            {...form.getInputProps("cpf")}
            component={IMaskInput}
            mask={"000.000.000-00"}
            unmask={true}
            label="CPF"
            onChange={() => {}}
            onAccept={(value) => form.setFieldValue("cpf", value)}
          />
          <TextInput {...form.getInputProps("telefone")} label="Telefone" />
          <PasswordInput
            required
            {...form.getInputProps("password")}
            label="Senha"
          />
          <PasswordInput
            required
            {...form.getInputProps("confirmarSenha")}
            onBlur={() => form.validateField("confirmarSenha")}
            onSelect={() => form.clearFieldError("confirmarSenha")}
            label="Repita a senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Stack>
      </form>
    </Paper>
  );
}
