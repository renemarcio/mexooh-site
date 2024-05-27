import { Box, Center, Title } from "@mantine/core";
import React from "react";
import BillboardTable from "../BillboardTable";
import classes from "./styles.module.css";

type Props = {
  city: string;
  setCity: (city: string) => void;
};

export default function Rent({ city, setCity }: Props) {
  return (
    <Box w={"100%"} className={classes.background} p={"lg"} id="rent">
      <Center my={"lg"}>
        <Title className={classes.title}>Alugue seus pontos aqui!</Title>
      </Center>
      <Center>
        <BillboardTable city={city} setCity={setCity} />
      </Center>
    </Box>
  );
}
