// src/lib/carouselPlugins.ts
export function createAutoplay(
  options: { delay: number; stopOnInteraction: boolean },
  rootNode?: (emblaRoot: HTMLElement) => HTMLElement
) {
  let timeout: any;
  let isPlaying = true;

  const play = (embla: any) => {
    stop();
    timeout = setTimeout(() => {
      if (!embla.canScrollNext()) embla.scrollTo(0);
      else embla.scrollNext();
    }, options.delay);
  };

  const stop = () => clearTimeout(timeout);

  const reset = (embla: any) => {
    stop();
    if (isPlaying) play(embla);
  };

  return (embla: any) => {
    embla.on("pointerDown", () => {
      if (options.stopOnInteraction) stop();
    });

    embla.on("init", () => play(embla));
    embla.on("pointerUp", () => reset(embla));
    embla.on("select", () => reset(embla));
    embla.on("destroy", stop);

    // ✅ Retorna um objeto com stop/reset
    const plugin = () => {};
    (plugin as any).name = "autoplay";
    (plugin as any).stop = stop;
    (plugin as any).reset = () => reset(embla);

    return plugin as any;
  };
}
