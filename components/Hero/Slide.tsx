import React from "react";
import { SlideData } from "./slidedata";
import { Carousel } from "@mantine/carousel";
import { Anchor, Image } from "@mantine/core";
import classes from "./styles.module.css";

type SlideProps = {
  slide: SlideData;
};

export default function Slide({ slide }: SlideProps) {
  const isVideo = slide.src.endsWith(".mp4") || slide.src.endsWith(".webm");

  return (
    <Carousel.Slide key={slide.alt}>
      <Anchor href={slide.button.link} onClick={slide.button.onClick}>
        {isVideo ? (
         <video
        src={slide.src}
        autoPlay
        muted
        loop
        playsInline
        className={classes.video}
      />
        ) : (
          <Image
            className={classes.bgImg}
            fit="contain"
            src={slide.src}
            h="100%"
            style={{ cursor: "pointer" }}
          />
        )}
      </Anchor>
    </Carousel.Slide>
  );
}
