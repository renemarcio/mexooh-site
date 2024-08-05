import React from "react";
import MUPTable from "../MUPTable";
import { Title, Text, Box } from "@mantine/core";

export default function MUP() {
  return (
    <Box
      // bg="var(--mantine-primary-color-filled)"
      py={20}
      id="mup"
    >
      <Title ta={"center"}>Mobiliários Urbanos</Title>
      <Text ta={"center"}>Confira aqui nossos Mobiliários Urbanos</Text>
      <MUPTable />
    </Box>
  );
}
