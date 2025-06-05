
import { Autoplay as AutoplayPlugin } from "@/lib/carouselPlugins";
import type { EmblaPluginType } from 'embla-carousel';


/**
 * Wrapper para tipagem correta do plugin Autoplay
 */

interface AutoplayOptions {
  delay?: number;
  stopOnInteraction?: boolean;
}

export function Autoplay(
  options?: AutoplayOptions,
  rootNode?: (root: HTMLElement) => HTMLElement | null
): EmblaPluginType {
  return AutoplayPlugin(options, rootNode) as unknown as EmblaPluginType;
}
