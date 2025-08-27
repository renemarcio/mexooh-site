"use client";

import React, { useMemo, useRef } from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaPluginType } from "embla-carousel";

import classes from "./styles.module.css";
import Slide from "./Slide";
import type { SlideData } from "./slidedata";
import type { inventoryTypes } from "@/types/websiteTypes";

type HeroProps = {
  slides?: SlideData[];
  setTypeOfInventory?: (value: inventoryTypes) => void;
  scrollToInventory?: (type: inventoryTypes) => void;
};

  // plugin do Embla + métodos opcionais do autoplay
  type AutoplayPlugin = EmblaPluginType & {
    stop?: () => void;
    reset?: () => void;
  };

  export default function Hero({ slides, setTypeOfInventory, scrollToInventory }: any) {
    // ✅ inicialização correta (objeto fechado, parênteses fechados, cast no final)
    const autoplay = useRef<AutoplayPlugin>(
      Autoplay({ delay: 6000, stopOnInteraction: true }) as unknown as AutoplayPlugin
    );

  const cardsData: SlideData[] =
    slides ??
    [
      {
        src: "slides/PainesLed.mp4",
        alt: "Painel (Rodovia)",
        button: {
          text: "Veja as opções",
          link: "#inventory",
          onClick: () => {
            setTypeOfInventory?.("panels");
            scrollToInventory?.("panels");
          },
        },
      },
      {
        src: "slides/PainelDigital.mp4",
        alt: "Painéis de LED",
        button: {
          text: "Veja as opções",
          link: "#inventory",
          onClick: () => {
            setTypeOfInventory?.("LEDpanels");
            scrollToInventory?.("LEDpanels");
          },
        },
      },
      {
        src: "slides/MEX_SITE_painel.jpg",
        alt: "Painel",
        button: {
          text: "Veja as opções",
          link: "#inventory",
          onClick: () => {
            setTypeOfInventory?.("panels");
            scrollToInventory?.("panels");
          },
        },
      },
      {
        src: "slides/outdoors_3_9.jpg",
        alt: "OUTDOOR",
        button: {
          text: "Veja as opções",
          link: "#inventory",
          onClick: () => {
            setTypeOfInventory?.("billboards");
            scrollToInventory?.("billboards");
          },
        },
      },
    ];

  return (
    <Carousel
      slideSize="90vw"
      slideGap="xs"
      withIndicators
      height="500px"

      // ✅ o Mantine espera EmblaPluginType — nossa instância é compatível
      plugins={[autoplay.current]}

      // ✅ envolvemos em funções para o TS não reclamar e para manter o this/closure correto
      onMouseEnter={() => autoplay.current.stop?.()}
      onMouseLeave={() => autoplay.current.reset?.()}
    >
      {cardsData.map((card) => (
        <Slide key={`${card.alt}-${card.src}`} 
        slide={card} 
          // brilho especial só nos slides de LED
          ctaClassName={/LED/i.test(card.alt) ? classes.ledGlow : undefined}
        />
      ))}
    </Carousel>
  );
}
