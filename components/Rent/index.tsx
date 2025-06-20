import { Box, Center, Title } from "@mantine/core";
import React from "react";
import BillboardTable from "../_Tables/BillboardTable";
import classes from "./styles.module.css";
import FortnightCalendarButton from "../FortnightCalendarButton";

// type Props = {
//   city: string;
//   setCity: (city: string) => void;
// };

export default function Rent() {
  return (
    <Box w={"100%"} className={classes.background} p={"lg"} id="rent">
      <Center my={"lg"}>
        <Title className={classes.title}>Reserve Outdoor Aqui!</Title>
      </Center>
      <Center>
        <FortnightCalendarButton />
      </Center>
      <Center>
        <BillboardTable />
      </Center>
    </Box>
  );
}
