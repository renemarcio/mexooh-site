// components/Billboard.tsx
"use client";

import React from "react";
import { Box, Button, Center, Text, Title } from "@mantine/core";
import BillboardTable from "../_Tables/BillboardTable";

export default function Billboard() {
  return (
    <Box id="billboards" p={"lg"}>
      <Center>
        <Title>Outdoors</Title>
      </Center>

      <Text ta="center" pt="1vw">
        Clique para saber mais:
      </Text>

      <Center>
        <Button
          mt="lg"
          component="a"
          href="downloads/painel_led.pdf"  // use o PDF que você já usa no menu
          target="_blank"
        >
          Mídia Kit
        </Button>
      </Center>

      <BillboardTable />
    </Box>
  );
}
