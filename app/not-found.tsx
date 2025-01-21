import {
  Box,
  Center,
  Paper,
  Title,
  Text,
  Button,
  Divider,
} from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Center h={"100vh"}>
      <Paper withBorder shadow="md" p={"xl"}>
        <Title ta={"center"} size={80}>
          404
        </Title>
        <Text ta={"center"} fs={"italic"} c={"dimmed"}>
          Esta página não existe
        </Text>
        <Center>
          <Link href="/">Voltar para a home</Link>
        </Center>
      </Paper>
    </Center>
  );
}
