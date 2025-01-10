import React from "react";
import MUPTable from "../MUPTable";
import { Title, Text, Box } from "@mantine/core";
import classes from "./styles.module.css";
export default function MUP() {
  return (
    <Box
      // bg="var(--mantine-primary-color-filled)"
      py={20}
      id="mup"
    >
      <Title ta={"center"} className={classes.title}>
        Mobiliário Urbano
      </Title>
      <Text ta={"center"}>Confira aqui nossos Mobiliários Urbanos</Text>
      <MUPTable />
    </Box>
  );
}
