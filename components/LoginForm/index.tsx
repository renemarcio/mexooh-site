import { Button, Paper, Stack, TextInput } from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../Buttons/RegisterAnchor";

type LoginProps = {
  nextStepFn?: () => void;
};

export default function LoginForm({ nextStepFn }: LoginProps) {
  function handleSubmit() {
    if (nextStepFn) {
      nextStepFn();
    }
  }

  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form>
        <Stack gap={"md"}>
          <TextInput label="Email" placeholder="Email" />
          <PasswordInputWithRecovery />
          <Stack gap={"xs"}>
            <RegisterAnchor />
            <Button
              type="submit"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Entrar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
