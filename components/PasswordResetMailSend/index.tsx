import { Text } from "@mantine/core";
import { useEffect } from "react";

interface Props {
  email: string;
}

export default function PasswordResetMailSend({ email }: Props) {
  useEffect(() => {
    console.log("Sending mail to " + email);
    fetch("/api/passwordreset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }, []);
  return (
    <>
      <Text ta={"center"} size="lg" fw={500}>
        Um link para redefinir a senha foi enviado para seu e-mail!
      </Text>
      <Text c={"dimmed"} size="sm" ta={"center"} fs={"italic"}>
        Você já pode fechar esta janela.
      </Text>
    </>
  );
}
