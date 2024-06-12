import { Button, Paper, Stack, TextInput } from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../Buttons/RegisterAnchor";
import { UseFormInput, useForm } from "@mantine/form";
type LoginProps = {
  nextStepFn?: () => void;
};

export default function LoginForm({ nextStepFn }: LoginProps) {
  function handleSubmit(values: any) {
    if (nextStepFn) {
      nextStepFn();
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  });

  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={"md"}>
          <TextInput
            tabIndex={1}
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInputWithRecovery form={form} />
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
