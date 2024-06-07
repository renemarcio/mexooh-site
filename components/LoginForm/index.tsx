import { Button, Code, Paper, Stack, TextInput } from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../Buttons/RegisterAnchor";
import { UseFormInput, useForm } from "@mantine/form";
import { login } from "./LoginForm.server";
import { auth, signIn } from "@/auth";

type LoginProps = {
  nextStepFn?: () => void;
};

export default function LoginForm({ nextStepFn }: LoginProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  });

  const handleSubmit = async (values: any) => {
    const { email, password } = values;
    await login({ email, password });
  };

  return (
    <Paper mx={"auto"} maw={"400px"} withBorder shadow="md" p={"lg"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form.values);
        }}
      >
        <Stack gap={"md"}>
          <TextInput
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
            <Code>{JSON.stringify(auth, null, 2)}</Code>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
