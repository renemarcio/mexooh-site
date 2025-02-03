"use client";
import LoginForm from "@/components/_Forms/Login/LoginForm";
import {
  Button,
  ButtonGroup,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <Center h={"100vh"}>
      <Paper withBorder shadow="md" p={"xl"}>
        <Stack gap={"md"}>
          <Title ta={"center"} size={50}>
            Acesso negado
          </Title>
          <Text ta={"center"} fs={"italic"} c={"dimmed"}>
            Pagina restrita apenas para colaboradores. Realize o login e tente
            novamente.
          </Text>
          <Center>
            <Group gap={"sm"}>
              <Button component={Link} href="/">
                Home
              </Button>
              <Button
                onClick={() => {
                  modals.open({
                    centered: true,
                    size: "md",
                    children: <LoginForm />,
                  });
                }}
              >
                Login
              </Button>
            </Group>
          </Center>
        </Stack>
      </Paper>
    </Center>
  );
}
