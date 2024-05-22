import { Group, Anchor, Text, PasswordInput, Stack } from "@mantine/core";
import React from "react";

export default function PasswordInputWithRecovery() {
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
        >
          Esqueci a senha
        </Anchor>
      </Group>
      <PasswordInput placeholder="Senha" />
    </Stack>
  );
}
