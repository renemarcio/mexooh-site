// components/_Nav/NavPills.tsx
"use client";

import { Group, UnstyledButton, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import useScrollToSection from "@/utils/useScrollToSection";

// seus ícones atuais
import BillboardIcon from "@/components/_Icons/billboard";
import PanelIcon from "@/components/_Icons/panel";
import LEDpanelIcon from "@/components/_Icons/ledpanel";
import MUPIIcon from "@/components/_Icons/mupi";

type Props = {
  /** compacta um pouco as pílulas (útil no SmallAppShell) */
  compact?: boolean;
};

export default function NavPills({ compact = false }: Props) {
  // navega/rola usando seu hook, preservando todo o fluxo já acertado
  const goBillboards = useScrollToSection("billboards");
  const goPanels     = useScrollToSection("panels");
  const goLED        = useScrollToSection("LEDpanels");
  const goMupi       = useScrollToSection("mupi");

  // estado visual “ativo” com base no hash
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const update = () => setActive(window.location.hash.replace("#", ""));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const Pill = ({
    label, Icon, onClick, value,
  }: { label: string; Icon: any; onClick: () => void; value: string }) => {
    const isActive = active === value;
    return (
      <UnstyledButton
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: compact ? "6px 12px" : "10px 16px",
          borderRadius: 999,
          border: "1px solid var(--mantine-color-gray-4)",
          background: isActive
            ? "linear-gradient(180deg,var(--mantine-primary-color-5),var(--mantine-primary-color-7))"
            : "var(--mantine-color-body)",
          color: isActive ? "white" : "var(--mantine-color-text)",
          boxShadow: isActive
            ? "0 8px 18px rgba(0,0,0,.12)"
            : "0 2px 6px rgba(0,0,0,.06)",
          transform: isActive ? "translateY(-1px)" : "none",
          transition: "all .15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 10px 20px rgba(0,0,0,.16)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = isActive
            ? "0 8px 18px rgba(0,0,0,.12)"
            : "0 2px 6px rgba(0,0,0,.06)";
        }}
      >
        <Icon size={18} />
        <Text fw={700} fz={compact ? "sm" : "md"}>
          {label}
        </Text>
      </UnstyledButton>
    );
  };

  return (
    <Group gap="xs" wrap="wrap">
      <Pill label="Outdoors"          Icon={BillboardIcon} onClick={goBillboards} value="billboards" />
      <Pill label="Painéis"           Icon={PanelIcon}     onClick={goPanels}     value="panels" />
      <Pill label="Painéis de LED"    Icon={LEDpanelIcon}  onClick={goLED}        value="LEDpanels" />
      <Pill label="Mobiliário Urbano" Icon={MUPIIcon}      onClick={goMupi}       value="mupi" />
    </Group>
  );
}
