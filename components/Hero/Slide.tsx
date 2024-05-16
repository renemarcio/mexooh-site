import React from "react";
import { SlideData } from "./slidedata";
import { Carousel } from "@mantine/carousel";
import { BackgroundImage, Center, Image, Overlay, Text } from "@mantine/core";
import classes from "./styles.module.css";
type SlideProps = {
  slide: SlideData;
};

export default function Slide({ slide }: SlideProps) {
  return (
    <Carousel.Slide>
      <BackgroundImage
        className={classes.bgImg}
        src={
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
        }
        h={"100%"}
      >
        <Center h={"100%"}>
          <Text c={"white"}>Teste Teste Teste</Text>
        </Center>
      </BackgroundImage>
    </Carousel.Slide>
  );
}
