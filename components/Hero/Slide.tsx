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
import { handelGoth } from "@/styles/fonts/fonts";
import { randomId } from "@mantine/hooks";
type SlideProps = {
  slide: SlideData;
};

export default function Slide({ slide }: SlideProps) {
  return (
    <Carousel.Slide key={randomId()}>
      <Anchor href={slide.button.link} onClick={slide.button.onClick}>
        <Image
          className={classes.bgImg}
          fit="contain"
          src={slide.src}
          h={"100%"}
          // component={Link}
          // href={slide.button.link}
          style={{ cursor: "pointer" }}
        />
      </Anchor>

      {/* <Anchor
          href={slide.button.link}
          underline="never"
          onClick={slide.button.onClick}
        >
          <Box
          // w={"80vw"}
          // h={"70%"}
          // pos={"relative"}
          // mx={"auto"}
          // maw={"1920 * 0.8px"}
          >
            <Text
              size={"4rem"}
              w={400}
              // c={`rgb(${slide.txtRgb})`}
              c={"white"}
              style={{
                WebkitTextStroke: "2px black",
                fontFamily: `${handelGoth.style.fontFamily}, Segoe UI, sans-serif`,
              }}
            >
              {slide.alt}
            </Text>
          </Box>
        </Anchor> */}
    </Carousel.Slide>
  );
}
