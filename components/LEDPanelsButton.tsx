import { useEffect } from "react";
import { inventoryTypes } from "@/types/websiteTypes";

type LEDPanelsButtonProps = {
  setTab: (tab: inventoryTypes) => void;
};

export function LEDPanelsButton({ setTab }: LEDPanelsButtonProps) {
  useEffect(() => {
    // Força a aba LEDpanels e scrolla para a seção correta
    window.history.replaceState(null, "", "#LEDpanels");

    const el = document.getElementById("LEDpanels");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // Opcionalmente, força o estado novamente para garantir renderização
    setTimeout(() => {
      setTab("LEDpanels");
    }, 300);
  }, [setTab]);

  return null; // Botão invisível, só aciona o efeito
}
