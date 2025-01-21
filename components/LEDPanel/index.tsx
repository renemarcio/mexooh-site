import { Box, Button, Center, Text, Title } from "@mantine/core";
import React from "react";
import LEDPanelTable from "../_Tables/LEDPanelTable";

export default function LEDPanel() {
  return (
    <Box id="ledpanels" p={"lg"}>
      <Center>
        <Title>Painéis de LED</Title>
      </Center>
      {/* <Text ta={"center"} px={"10vw"}>
        Os painéis de LED garantem uma ótima visualização, e permitem que
        animações sejam utilizadas.
      </Text> */}
      <Text ta={"center"} pt={"1vw"}>
        Clique para saber mais:
      </Text>
      <Center>
        <Button
          mt={"lg"}
          component="a"
          href="downloads/apresentacao_painel_digital.pdf"
          target="_blank"
          // download
        >
          Mídia Kit
        </Button>
      </Center>
      <LEDPanelTable />
    </Box>
  );
}
