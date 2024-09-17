import { Box, Button, Center, Text, Title } from "@mantine/core";
import React from "react";
import LEDPanelTable from "../LEDPanelTable";

export default function LEDPanel() {
  return (
    <Box id="ledpanels" p={"lg"}>
      <Center>
        <Title>Painéis de LED</Title>
      </Center>
      <Text ta={"center"} px={"10vw"}>
        Os painéis de LED garantem uma ótima visualização, e permitem que
        animações sejam utilizadas.
      </Text>
      <LEDPanelTable />
      <Center>
        <Button
          mt={"lg"}
          component="a"
          href="downloads/apresentacao_painel_digital.pdf"
          download
        >
          Mídia Kit
        </Button>
      </Center>
    </Box>
  );
}
