import { Button, TextInput, Title, Text, Paper, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useState } from "react";

export default function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  function validateLogin() {
    if (username && password === "admin") {
      window.location.href = "/admin";
      modals.closeAll();
    } else {
      setError("Credenciais incorretas. Tente novamente.");
    }
  }
  return (
    <Paper withBorder p={"lg"} w={"350px"}>
      {/* <Title>Login</Title> */}
      <form>
        <Stack gap={"sm"}>
          <TextInput
            label="Usuário"
            onChange={(e) => {
              setError(undefined);
              setUsername(e.target.value);
            }}
          />
          <TextInput
            label="Senha"
            type="password"
            onChange={(e) => {
              setError(undefined);
              setPassword(e.target.value);
            }}
          />
          {error && (
            <Text c="red" size="sm" ta="center" mt="sm">
              {error}
            </Text>
          )}
          <Button
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              validateLogin();
            }}
            type="submit"
          >
            Entrar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
