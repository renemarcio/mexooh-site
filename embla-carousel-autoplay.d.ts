declare module 'embla-carousel-autoplay' {
  import { EmblaCarouselType } from 'embla-carousel';

  export interface AutoplayOptions {
    delay?: number;
    stopOnInteraction?: boolean;
    stopOnMouseEnter?: boolean;
    rootNode?: (root: HTMLElement) => HTMLElement | null;
  }

  export default function Autoplay(
    options?: AutoplayOptions,
    rootNode?: (root: HTMLElement) => HTMLElement | null
  ): (embla: EmblaCarouselType) => void;
}
