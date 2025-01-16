"use client";

import { Text, TextInput, Button, Stack } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useState } from "react";
import PasswordResetMailSend from "../PasswordResetMailSend";

export default function PasswordResetForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: isEmail("Email inválido"),
    },
  });

  async function handleSubmit(values: any) {
    setLoading(true);
    modals.open({
      title: "Pronto!",
      //Component that sends mail to incoming e-mail, if it exists. Tell nothing to user.
      children: <PasswordResetMailSend email={values.email} />,
      centered: true,
      onClose: () => modals.closeAll(),
    });
    // form.setErrors({ credentials: "" });
    // const response = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    // if (response?.ok) {
    //   modals.closeAll();
    // } else {
    //   console.log(response?.error);
    //   form.setErrors({ credentials: "Credenciais incorretas" });
    // }

    setLoading(false);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={"sm"}>
        <Text size="lg" ta={"center"}>
          Tudo bem! Só inserir seu e-mail, mandaremos um link de redefinição
          para você!
        </Text>
        <TextInput
          placeholder="E-mail"
          //   label="E-mail"
          {...form.getInputProps("email")}
        />
        <Button type="submit" fullWidth loading={loading}>
          Quero redefinir minha senha!
        </Button>
      </Stack>
    </form>
  );
}
