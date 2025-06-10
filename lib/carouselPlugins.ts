import Autoplay from "embla-carousel-autoplay";
import type { EmblaPluginType } from "embla-carousel";

export function createAutoplay(
  options?: ConstructorParameters<typeof Autoplay>[0],
  rootNode?: ConstructorParameters<typeof Autoplay>[1]
): EmblaPluginType {
  return new Autoplay(options, rootNode);
}
