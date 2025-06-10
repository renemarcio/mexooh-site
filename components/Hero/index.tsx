"use client";

import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import classes from "./styles.module.css";

import Slide from "./Slide";
import { SlideData } from "./slidedata";
import { inventoryTypes } from "@/types/websiteTypes";
import { createAutoplay } from "@/lib/carouselPlugins";

type HeroProps = {
  slides?: SlideData[];
  setTypeOfInventory?: (value: inventoryTypes) => void;
};

export default function Hero({ slides, setTypeOfInventory }: HeroProps) {
  const autoplay = useRef<any>(
    createAutoplay(
      { delay: 7000, stopOnInteraction: true },
      (emblaRoot: HTMLElement) => emblaRoot.parentElement!
    )
  );

  const cardsData: SlideData[] = [
    {
      src: "slides/MEX_SITE_painel.jpg",
      alt: "Painel",
      button: {
        text: "Veja as opções",
        link: "#inventory",
        onClick: () => setTypeOfInventory?.("panels"),
      },
    },
    {
      src: "slides/MEX_SITE_mupi_fix.jpg",
      alt: "MUPI",
      button: {
        text: "Veja as opções",
        link: "#inventory",
        onClick: () => setTypeOfInventory?.("mupi"),
      },
    },
    {
      src: "slides/MEX_SITE_OUTDOOR.jpg",
      alt: "OUTDOOR",
      button: {
        text: "Veja as opções",
        link: "#inventory",
        onClick: () => setTypeOfInventory?.("billboards"),
      },
    },
    {
      src: "slides/MEX_SITE_PAINEL_LED_FIX.jpg",
      alt: "LED",
      button: {
        text: "Veja as opções",
        link: "#inventory",
        onClick: () => setTypeOfInventory?.("LEDpanels"),
      },
    },
  ];

  const cards = cardsData.map((card) => (
    <Slide slide={card} key={card.alt} />
  ));

  return (
    <Carousel
      slideSize="90vw"
      slideGap="xs"
      withIndicators
      height="500px"

      plugins={[autoplay.current]}
      onMouseEnter={() => autoplay.current?.stop?.()}
      onMouseLeave={() => autoplay.current?.reset?.()}
      classNames={classes}
    >
      {cards}
    </Carousel>
  );
}
