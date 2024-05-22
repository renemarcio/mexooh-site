import { Paper, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

export default function RegisterPJForm() {
  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          modals.closeAll();
        }}
      >
        <Stack>
          <TextInput label="Nome da empresa" />
          <TextInput label="Nome fantasia da empresa" />
          <TextInput label="Email" />
          <TextInput label="CNPJ" />
          <PasswordInput label="Senha" />
          <PasswordInput label="Repita a senha" />
          <Button type="submit">Cadastrar</Button>
        </Stack>
      </form>
    </Paper>
  );
}
