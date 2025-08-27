"use client";

import { useCallback } from "react";

type ScrollOptions = {
  behavior?: ScrollBehavior;    // "smooth" (default) | "auto"
  scrollMarginTopPx?: number;   // compensar header fixo, se quiser
  waitFor?: number;             // ms para aguardar montagem do alvo
};

export default function useScrollToSection(rawId: string, opts: ScrollOptions = {}) {
  const {
    behavior = "smooth",
    scrollMarginTopPx,
    waitFor = 600, // tenta por até ~600ms
  } = opts;

  return useCallback(() => {
    // 1) Atualiza o hash preservando o case (ex.: #LEDpanels)
    const hash = `#${rawId}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      // força o efeito mesmo se já estiver no mesmo hash
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    // 2) Tenta localizar o alvo por id (case exato e minúsculo como fallback)
    const candidates = [rawId, rawId.toLowerCase()];

    const scrollTo = (el: HTMLElement) => {
      if (typeof scrollMarginTopPx === "number") {
        const top = el.getBoundingClientRect().top + window.scrollY - scrollMarginTopPx;
        window.scrollTo({ top, behavior });
      } else {
        el.scrollIntoView({ behavior, block: "start" });
      }
    };

    const tryNow = () => {
      for (const id of candidates) {
        const el = document.getElementById(id);
        if (el) {
          scrollTo(el);
          return true;
        }
      }
      return false;
    };

    if (tryNow()) return;

    // 3) Re-tenta por tempo limitado + observa o DOM
    const start = performance.now();
    const timer = window.setInterval(() => {
      if (tryNow() || performance.now() - start > waitFor) {
        clearInterval(timer);
        observer.disconnect();
      }
    }, 50);

    const observer = new MutationObserver(() => {
      if (tryNow()) {
        clearInterval(timer);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }, [rawId, behavior, scrollMarginTopPx, waitFor]);
}
