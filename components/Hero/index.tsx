"use client";
import classes from "./styles.module.css";
import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import { Center, Paper } from "@mantine/core";
import Slide from "./Slide";
import { SlideData } from "./slidedata";

type HeroProps = {
  slides?: any[];
};

export default function Hero({ slides }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: 7000 } as AutoplayOptionsType));

  const cardsData: SlideData[] = [
    {
      src: "https://source.unsplash.com/random",
      alt: "random image",
      button: {
        text: "Learn more",
        link: "https://mantine.dev",
      },
    },
    {
      src: "https://source.unsplash.com/random",
      alt: "random image",
      button: {
        text: "Learn more 2",
        link: "https://mantine.dev",
      },
    },
    {
      src: "https://source.unsplash.com/random",
      alt: "random image",
      button: {
        text: "Learn more 3",
        link: "https://mantine.dev",
      },
    },
  ];

  const cards = cardsData.map((card) => <Slide slide={card} />);

  return (
    <Carousel
      slideSize={"1920px"}
      slideGap={"xs"}
      withIndicators
      height={500}
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      speed={5}
      classNames={classes}
    >
      <Carousel.Slide>
        <Center h="100%" bg={"blue"}>
          Slide 1
        </Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center h="100%" bg={"orange"}>
          Slide 2
        </Center>
      </Carousel.Slide>
      <Carousel.Slide>
        <Center h="100%" bg={"green"}>
          Slide 3
        </Center>
      </Carousel.Slide>
      {cards}
      {/* ...other slides */}
    </Carousel>
  );
}
