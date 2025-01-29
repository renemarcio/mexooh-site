"use client";

import InventoryDisplay from "@/components/InventoryDisplay";
import { Tabs } from "@mantine/core";
import { useState } from "react";

type invTypes = "panels" | "mup" | "billboards" | "LEDpanels";

enum InventoryType {
  Panels = "panels",
  Mup = "mup",
  Billboards = "billboards",
  LEDPanels = "LEDpanels",
}

export default function TestPage() {
  const [typeOfInventory, setTypeOfInventory] = useState<invTypes>("panels");

  return (
    <>
      <Tabs
        // defaultValue={"panels"}
        w={"80%"}
        mx={"auto"}
        value={typeOfInventory}
      >
        <Tabs.List>
          <Tabs.Tab value="panels">Painéis</Tabs.Tab>
          <Tabs.Tab value="mup">Mupis</Tabs.Tab>
          <Tabs.Tab value="billboards">Outdoors</Tabs.Tab>
          <Tabs.Tab value="LEDpanels">Painéis de LED</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <InventoryDisplay typeOfInventory={typeOfInventory} />
    </>
  );
}
