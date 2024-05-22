import { Button, Paper, Stack, TextInput } from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../Buttons/RegisterAnchor";

export default function LoginForm() {
  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form>
        <Stack gap={"md"}>
          <TextInput label="Email" placeholder="Email" />
          <PasswordInputWithRecovery />
          <Stack gap={"xs"}>
            <RegisterAnchor />
            <Button type="submit" fullWidth>
              Entrar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
