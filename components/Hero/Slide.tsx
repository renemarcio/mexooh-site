// components/Hero/Slide.tsx
import React from "react";
import { Carousel } from "@mantine/carousel";
import type { SlideData } from "./slidedata";
import classes from "./styles.module.css";

export type SlideProps = {
  slide: SlideData;
  /** classe extra para o CTA (ex.: brilho dos LEDs) */
  ctaClassName?: string;
};

export default function Slide({ slide, ctaClassName }: SlideProps) {
  const isVideo =
    slide.kind === "video" ||
    /\.(mp4|webm|ogg)$/i.test(slide.src ?? "");

  return (
    <Carousel.Slide>
      <div className={classes.slide}>
        {isVideo ? (
          <video
            className={classes.media}
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img className={classes.media} src={slide.src} alt={slide.alt} />
        )}

        <a
          href={slide.button.link}
          onClick={(e) => {
            // mantém o comportamento existente
            slide.button.onClick?.();
          }}
          className={`${classes.cta} ${ctaClassName ?? ""}`}
        >
          {slide.button.text}
        </a>
      </div>
    </Carousel.Slide>
  );
}
