"use client";

import React, { useMemo } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from 'embla-carousel-autoplay'; // ✅ sem AutoplayType
import classes from "./styles.module.css";

import Slide from "./Slide";
import { SlideData } from "./slidedata";
import { inventoryTypes } from "@/types/websiteTypes";

type HeroProps = {
  slides?: SlideData[];
  setTypeOfInventory?: (value: inventoryTypes) => void;
};

export default function Hero({ slides, setTypeOfInventory }: HeroProps) {
  const autoplay = useMemo(() => {
    return Autoplay(
      { delay: 7000, stopOnInteraction: true },
      (emblaRoot) => emblaRoot?.parentElement ?? emblaRoot
    );
  }, []) as ReturnType<typeof Autoplay> & {
    stop?: () => void;
    reset?: () => void;
  };


  const cardsData: SlideData[] = slides ?? [
    {
      src: "slides/PainesLed.mp4",
      alt: "Painel",
      button: {
        text: "Veja as opções",
        link: "#inventory",
        onClick: () => setTypeOfInventory?.("panels"),
      },
    },

    {
      src: "slides/PainelDigital.mp4",
      alt: "Painel",
      button: {
        text: "Veja as opções",
        link: "#inventory",
        onClick: () => setTypeOfInventory?.("panels"),
      },
    },


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

  //const cards = cardsData.map((card) => <Slide slide={card} key={card.alt} />);
  const cards = cardsData.map((card) => (
  <Slide slide={card} key={`${card.alt}-${card.src}`} />
  ));

  if (!cards?.length) return null;

  return (
    <Carousel
      slideSize="90vw"
      slideGap="xs"
      withIndicators
      height="500px"
      plugins={[autoplay as any]}
      onMouseEnter={() => autoplay.stop?.()}
      onMouseLeave={() => autoplay.reset?.()}
    >
      {cards}
    </Carousel>
  );
}
