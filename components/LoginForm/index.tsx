import {
  Anchor,
  Box,
  Button,
  ButtonGroup,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Text,
} from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../Buttons/RegisterAnchor";

export default function LoginForm() {
  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form>
        <Stack gap={"md"}>
          <TextInput label="Email" placeholder="Email" />
          {/* <PasswordInput label="Senha" /> */}
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
