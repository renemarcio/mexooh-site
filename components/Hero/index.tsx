"use client";
import classes from "./styles.module.css";
import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import Slide from "./Slide";
import { SlideData } from "./slidedata";
type HeroProps = {
  slides?: SlideData[];
};

export default function Hero({ slides }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: 7000 } as AutoplayOptionsType));

  const cardsData: SlideData[] = [
    {
      src: "slides/MEX_SITE_painel.jpg",
      alt: "",
      button: {
        text: "Veja as opções",
        link: "#panels",
      },
    },
    {
      src: "slides/MEX_SITE_mupi_fix.jpg",
      alt: "MUPI",
      button: {
        text: "Veja as opções",
        link: "#mupi",
      },
    },
    {
      src: "slides/MEX_SITE_OUTDOOR.jpg",
      alt: "OUTDOOR",
      button: {
        text: "Veja as opções",
        link: "#rent",
      },
    },
    {
      src: "slides/MEX_SITE_PAINEL_LED_FIX.jpg",
      alt: "LED",
      button: {
        text: "Veja as opções",
        link: "#ledpanels",
      },
    },
  ];

  const cards = cardsData.map((card) => <Slide slide={card} key={card.alt} />);

  return (
    <Carousel
      slideSize={"90vw"}
      slideGap={"xs"}
      withIndicators
      height={"500px"}
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      speed={5}
      classNames={classes}
    >
      {cards}
    </Carousel>
  );
}
