import { Paper, Stack, TextInput, Button, PasswordInput } from "@mantine/core";
import React from "react";

export default function RegisterPFForm() {
  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form>
        <Stack>
          <TextInput label="Nome" />
          <TextInput label="Email" />
          <TextInput label="CPF" />
          <PasswordInput label="Senha" />
          <PasswordInput label="Repita a senha" />
          <Button type="submit">Cadastrar</Button>
        </Stack>
      </form>
    </Paper>
  );
}
