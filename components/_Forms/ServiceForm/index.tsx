import {
  Button,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";

export default function ServiceForm() {
  return (
    <form>
      <Stack>
        <SegmentedControl
          data={["Papel", "Lona"]}
          fullWidth
          defaultValue="Papel"
          color="midiagreen"
        />
        <TextInput
          label="Link para imagem"
          description="Envie um link para a imagem em alta resolução"
        />
        <Text size="sm" c={"dimmed"} ta={"center"}>
          Caso haja algum problema, entraremos em contato!
        </Text>

        <Button fullWidth>Contratar</Button>
      </Stack>
    </form>
  );
}
