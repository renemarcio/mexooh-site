"use client";
import classes from "./styles.module.css";
import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import Slide from "./Slide";
import { SlideData } from "./slidedata";
import { useCityContext } from "../../contexts/CityContext";
type HeroProps = {
  slides?: SlideData[];
  // setCity: (city: string) => void;
};

export default function Hero({ slides }: HeroProps) {
  const autoplay = useRef(Autoplay({ delay: 7000 } as AutoplayOptionsType));

  // const { city, setCity } = useCityContext();

  const cardsData: SlideData[] = [
    {
      src: "slides/MEX_SITE_painel_fix.jpg",
      alt: "",
      button: {
        text: "Veja as opções",
        link: "#panels",
      },
    },
    {
      src: "slides/MEX_SITE_mup_fix.jpg",
      alt: "",
      button: {
        text: "Veja as opções",
        link: "#mup",
      },
    },
    {
      src: "slides/testbanner.jpeg",
      alt: "Outdoors",
      button: {
        text: "Veja as opções",
        link: "#rent",
      },
    },
  ];

  const cards = cardsData.map((card) => <Slide slide={card} key={card.alt} />);

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
      {cards}
      {/* ...other slides */}
    </Carousel>
  );
}
