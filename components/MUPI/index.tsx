import React from "react";
import MUPITable from "../_Tables/MUPITable";
import { Title, Text, Box } from "@mantine/core";
import classes from "./styles.module.css";
export default function MUPI() {
  return (
    <Box
      // bg="var(--mantine-primary-color-filled)"
      py={20}
      id="mupi"
    >
      <Title ta={"center"} className={classes.title}>
        Mobiliário Urbano
      </Title>
      <Text ta={"center"}>Confira aqui nossos Mobiliários Urbanos</Text>
      <MUPITable />
    </Box>
  );
}
