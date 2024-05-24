import { Box, Center, Title } from "@mantine/core";
import React from "react";
import BillboardTable from "../BillboardTable";
import classes from "./styles.module.css";
export default function Rent() {
  return (
    <Box w={"100%"} className={classes.background} p={"lg"}>
      <Center my={"lg"}>
        <Title className={classes.title}>Alugue seus pontos aqui!</Title>
      </Center>
      <Center>
        <BillboardTable />
      </Center>
    </Box>
  );
}
