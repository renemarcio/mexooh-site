import React from "react";
import { SlideData } from "./slidedata";
import { Carousel } from "@mantine/carousel";
import { Anchor, Image } from "@mantine/core";
import classes from "./styles.module.css";

type SlideProps = {
  slide: SlideData;
};

export default function Slide({ slide }: SlideProps) {
  console.log("Slide renderizado:", slide);
  return (
    <Carousel.Slide key={slide.alt}>
      <Anchor href={slide.button.link} onClick={slide.button.onClick}>
        <Image
          className={classes.bgImg}
          fit="contain"
          src={slide.src}
          h="100%"
          style={{ cursor: "pointer" }}
        />
      </Anchor>
    </Carousel.Slide>
  );
}
