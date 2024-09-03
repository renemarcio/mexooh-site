import { Box, Center, Text, Title } from "@mantine/core";
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
    </Box>
  );
}
