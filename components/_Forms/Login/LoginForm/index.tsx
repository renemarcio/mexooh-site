import { Button, Paper, Stack, TextInput, Text, Code } from "@mantine/core";
import React from "react";
import PasswordInputWithRecovery from "../../../Inputs/PasswordInputWithRecovery";
import RegisterAnchor from "../../../_Buttons/RegisterAnchor";
import { UseFormInput, isEmail, useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
type LoginProps = {
  nextStepFn?: () => void;
};

export default function LoginForm({ nextStepFn }: LoginProps) {
  async function handleSubmit(values: any) {
    form.setErrors({ credentials: "" });
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
      form.setErrors({ credentials: "Credenciais incorretas" });
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Email inválido"),
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
            {form.errors.credentials && (
              <Text ta={"center"} c={"red"} fs="italic">
                Credenciais incorretas
              </Text>
            )}
            <Button type="submit" fullWidth>
              Entrar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
