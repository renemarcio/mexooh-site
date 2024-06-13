import { Button, Paper, Stack, TextInput } from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../Buttons/RegisterAnchor";
import { UseFormInput, useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
type LoginProps = {
  nextStepFn?: () => void;
};

export default function LoginForm({ nextStepFn }: LoginProps) {
  async function handleSubmit(values: any) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (response?.ok) {
      if (nextStepFn) {
        nextStepFn();
      }
    } else {
      console.log(response?.error);
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
