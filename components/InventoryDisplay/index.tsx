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
    if (isControlled) externalSetTab!(value);
    else setInternalTab(value);
  };

  const [mounted, setMounted] = useState(false);

  /** 🔒 NOVO: só rolar quando houver hash válido (inicial ou via hashchange) */
  const [shouldScroll, setShouldScroll] = useState(false);

  // Hash inicial -> seleciona a aba e permite scroll apenas se houver hash
  useEffect(() => {
    const h = window.location.hash.slice(1) as inventoryTypes;
    if (validTabs.includes(h)) {
      setTab(h);
      setShouldScroll(true); // só agora vamos rolar
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mudança de hash (cliques no header/botões externos)
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1) as inventoryTypes;
      if (validTabs.includes(h)) {
        setTab(h);
        setShouldScroll(true); // rolar após mudar a aba por hash
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll suave quando a aba ativa muda — MAS somente se houve hash válido pedindo scroll
  useEffect(() => {
    if (!mounted || !shouldScroll) return;

    const domId = tabToDomId(activeTab);
    const currentHash = window.location.hash.slice(1);

    if (currentHash !== domId) return; // hash não corresponde à aba atual -> não rola

    let done = false;
    const tryScroll = () => {
      const el = document.getElementById(domId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        done = true;
        setShouldScroll(false); // evita repetir sem novo hash
      }
    };

    // tenta já e, se não der, re-tenta/observa o DOM por pouco tempo
    tryScroll();
    if (done) return;

    const t = setInterval(() => {
      if (!done) tryScroll();
    }, 50);

    const obs = new MutationObserver(() => {
      if (!done) tryScroll();
    });
    obs.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      clearInterval(t);
      obs.disconnect();
    }, 800);

    return () => {
      clearInterval(t);
      obs.disconnect();
    };
  }, [mounted, shouldScroll, activeTab]);

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
          // ⚠️ não ligamos shouldScroll aqui de propósito — clicar na tab local não deve dar “pulo”
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

      {/* Mantido exatamente como no seu arquivo */}
      {activeTab === "LEDpanels" && <LEDPanelsButton setTab={setTab} />}
      {activeTab === "billboards" && <OutdoorsButton setTab={setTab} />}

      <InventoryDisplayMainLayout typeOfInventory={activeTab} />
    </>
  );
}
