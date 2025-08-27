// components/Hero/slidedata.ts
export type SlideKind = "video" | "image";

export type SlideData = {
  src: string;
  alt: string;
  button: {
    text: string;
    link: string;
    onClick?: () => void;
  };
  /** opcional: se quiser forçar, senão detectamos pelo .mp4/.webm */
  kind?: SlideKind;
};
