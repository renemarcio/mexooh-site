import { Group, Anchor, Text, PasswordInput, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";

type Props = {
  form: UseFormReturnType<any>;
};

export default function PasswordInputWithRecovery({ form }: Props) {
  return (
    <Stack gap={0}>
      <Group justify="space-between" my={0}>
        <Text component="label" htmlFor="your-password" size="sm" fw={500}>
          Senha
        </Text>
        <Anchor
          href="#"
          onClick={(event) => event.preventDefault()}
          pt={2}
          fw={500}
          fz="xs"
          tabIndex={3}
        >
          Esqueci a senha
        </Anchor>
      </Group>
      <PasswordInput
        placeholder="Senha"
        {...form.getInputProps("password")}
        tabIndex={2}
      />
    </Stack>
  );
}
