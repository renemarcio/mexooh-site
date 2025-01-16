import PasswordResetForm from "@/components/PasswordResetForm";
import { Button, Center, Paper, Text, TextInput, Title } from "@mantine/core";

export default function PasswordReset() {
  return (
    <Center h={"100%"}>
      <Paper withBorder shadow="xl" p={"xl"}>
        <Title>Recuperação de senha</Title>
        <PasswordResetForm />
      </Paper>
    </Center>
  );
}
