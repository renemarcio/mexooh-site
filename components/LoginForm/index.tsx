import { Box, Button, Stack, TextInput } from "@mantine/core";
import React from "react";

export default function LoginForm() {
  return (
    <Box>
      <form>
        <Stack gap={"lg"}>
          <TextInput label="Email" />
          <TextInput label="Senha" type="password" />
          <Button type="submit" fullWidth>
            Entrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
