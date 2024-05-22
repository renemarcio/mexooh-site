import { Center, Image, Paper } from "@mantine/core";
import React from "react";
import classes from "./styles.module.css";
export default function AboutUsPhoto() {
  return (
    <Paper
      pos={"relative"}
      w={"35vw"}
      h={"28vw"}
      miw={"324px"}
      mih={"258px"}
      top={"-10px"}
      mx="auto"
      className={classes.polaroid}
      my={"lg"}
    >
      <Paper
        pos={"absolute"}
        bg={"gray"}
        w={"90%"}
        h={"75%"}
        left={"5%"}
        top={"5%"}
        className={classes.photo}
      >
        <Image h={"100%"} src="photos/aboutus.jpg" />
      </Paper>
    </Paper>
  );
}
