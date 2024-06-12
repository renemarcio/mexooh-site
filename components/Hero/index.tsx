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

  const { city, setCity } = useCityContext();

  const cardsData: SlideData[] = [
    {
      src: "https://picsum.photos/1920/600",
      alt: "Anuncie em Itapetininga!",
      button: {
        text: "Veja as opções",
        link: "#rent",
        onClick: () => {
          setCity("Itapetininga");
        },
      },
    },
    {
      src: "https://picsum.photos/1920/600?&random=2",
      alt: "Anuncie em Tatuí!",
      button: {
        text: "Veja as opções",
        link: "#rent",
        onClick: () => {
          setCity("Tatuí");
        },
      },
    },
    {
      src: "https://picsum.photos/1920/600?random=3",
      alt: "Anuncie em Sorocaba!",
      button: {
        text: "Veja as opções",
        link: "#rent",
        onClick: () => {
          setCity("Sorocaba");
        },
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
