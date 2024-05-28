import React from "react";
import { SlideData } from "./slidedata";
import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  BackgroundImage,
  Box,
  Center,
  Image,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import classes from "./styles.module.css";
import Link from "next/link";
type SlideProps = {
  slide: SlideData;
};

export default function Slide({ slide }: SlideProps) {
  return (
    <Carousel.Slide key={slide.alt}>
      <BackgroundImage className={classes.bgImg} src={slide.src} h={"100%"}>
        <Anchor
          href={slide.button.link}
          underline="never"
          onClick={slide.button.onClick}
        >
          <Box
            w={"80vw"}
            h={"70%"}
            pos={"relative"}
            mx={"auto"}
            maw={"1920 * 0.8px"}
          >
            <Text
              size={"4rem"}
              w={400}
              // c={`rgb(${slide.txtRgb})`}
              c={"white"}
              style={{ WebkitTextStroke: "2px black" }}
            >
              {slide.alt}
            </Text>
          </Box>
        </Anchor>
      </BackgroundImage>
    </Carousel.Slide>
  );
}
