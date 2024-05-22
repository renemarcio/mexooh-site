import { Box, Center, Title, Text, Group, Image } from "@mantine/core";
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
        <Group grow w={"100%"} justify="center">
          <Image src={"https://source.unsplash.com/random"} h={"600px"}></Image>
          <Box h={"600px"} p={"lg"} className={classes.tableBody} ta={"center"}>
            <BillboardTable />
          </Box>
        </Group>
      </Center>
    </Box>
  );
}
