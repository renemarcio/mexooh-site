// components/InventoryDisplay/index.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs } from "@mantine/core";
import BillboardIcon from "../_Icons/billboard";
import LEDpanelIcon from "../_Icons/ledpanel";
import MUPIIcon from "../_Icons/mupi";
import PanelIcon from "../_Icons/panel";
import InventoryDisplayMainLayout from "./InventoryDisplayMainLayout";
import { inventoryTypes } from "@/types/websiteTypes";
import { LEDPanelsButton } from "@/components/LEDPanelsButton";
import { OutdoorsButton } from "@/components/OutdoorsButton";

type Props = {
  /** Se informado, o componente vira controlado pelo pai (valor da aba) */
  typeOfInventory?: inventoryTypes;
  /** Se informado junto com o typeOfInventory, usamos como setter controlado */
  setTypeOfInventory?: React.Dispatch<React.SetStateAction<inventoryTypes>>;
};

const validTabs: inventoryTypes[] = ["panels", "mupi", "billboards", "LEDpanels"];

// Mapa explícito para preservar o case de LEDpanels
const tabToDomId = (tab: inventoryTypes) =>
  ({ panels: "panels", mupi: "mupi", billboards: "billboards", LEDpanels: "LEDpanels" } as const)[tab];

export default function InventoryDisplay(props: Props) {
  const { typeOfInventory: controlledTab, setTypeOfInventory: externalSetTab } = props;

  const isControlled = useMemo(
    () => controlledTab !== undefined && typeof externalSetTab === "function",
    [controlledTab, externalSetTab]
  );

  // Estado interno (usado quando não for controlado)
  const [internalTab, setInternalTab] = useState<inventoryTypes>("panels");

  // Valor e setter unificados (controlado x não-controlado)
  const activeTab: inventoryTypes = (controlledTab ?? internalTab) as inventoryTypes;
  const setTab = (value: inventoryTypes) => {
    if (isControlled) {
      externalSetTab!(value);
    } else {
      setInternalTab(value);
    }
  };

  const [mounted, setMounted] = useState(false);

  // Hash inicial -> seleciona a aba
  useEffect(() => {
    const h = window.location.hash.slice(1) as inventoryTypes;
    if (validTabs.includes(h)) {
      setTab(h);
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mudança de hash (cliques no header/botões externos)
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1) as inventoryTypes;
      if (validTabs.includes(h)) setTab(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll suave quando a aba ativa muda (robusto: tenta até montar)
  useEffect(() => {
    if (!mounted) return;

    const domId = tabToDomId(activeTab);
    let cancelled = false;
    let tries = 0;
    const maxTries = 40; // ~2s (40 x 50ms)

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(domId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (tries++ < maxTries) setTimeout(tryScroll, 50);
    };

    tryScroll();

    // Fallback adicional: observa o DOM até o alvo aparecer
    const obs = new MutationObserver(() => {
      const el = document.getElementById(domId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        obs.disconnect();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      obs.disconnect();
    };
  }, [mounted, activeTab]);

  // Evita hidratação errada
  if (!mounted) return null;

  return (
    <>
      <Tabs
        w="80%"
        mx="auto"
        value={activeTab}
        onChange={(value) => {
          if (!value) return;
          const tab = value as inventoryTypes;
          setTab(tab);
          // mantém a URL coerente (#billboards, #LEDpanels, etc.)
          window.history.replaceState(null, "", `#${tab}`);
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="panels" leftSection={<PanelIcon size={16} />}>
            Rodovia
          </Tabs.Tab>
          <Tabs.Tab value="mupi" leftSection={<MUPIIcon size={16} />}>
            Mupis
          </Tabs.Tab>
          <Tabs.Tab value="billboards" leftSection={<BillboardIcon size={16} />}>
            Outdoors
          </Tabs.Tab>
          <Tabs.Tab value="LEDpanels" leftSection={<LEDpanelIcon size={16} />}>
            Painéis de LED
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* “Booster” invisível — igual ao LED, também para Outdoors */}
      {activeTab === "LEDpanels" && <LEDPanelsButton setTab={setTab} />}
      {activeTab === "billboards" && <OutdoorsButton setTab={setTab} />}

      <InventoryDisplayMainLayout typeOfInventory={activeTab} />
    </>
  );
}
