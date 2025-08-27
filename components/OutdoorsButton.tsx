import { useEffect } from "react";
import { inventoryTypes } from "@/types/websiteTypes";

type OutdoorsButtonProps = {
  setTab: (tab: inventoryTypes) => void;
};

export function OutdoorsButton({ setTab }: OutdoorsButtonProps) {
  useEffect(() => {
    // Força a aba Outdoors e scrolla para a seção correta
    window.history.replaceState(null, "", "#billboards");

    const el = document.getElementById("billboards");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // Opcionalmente, força o estado novamente para garantir renderização
    setTimeout(() => {
      setTab("billboards");
    }, 300);
  }, [setTab]);

  return null; // Botão invisível, só aciona o efeito
}
