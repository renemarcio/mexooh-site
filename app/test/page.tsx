"use client";

import InventoryDisplay from "@/components/InventoryDisplay";
import BillboardIcon from "@/components/_Icons/billboard";
import LEDpanelIcon from "@/components/_Icons/ledpanel";
import MUPIcon from "@/components/_Icons/mup";
import PanelIcon from "@/components/_Icons/panel";
import { inventoryTypes } from "@/types/websiteTypes";
import { Tabs } from "@mantine/core";
import { useState } from "react";

export default function TestPage() {
  const [typeOfInventory, setTypeOfInventory] =
    useState<inventoryTypes>("panels");

  return (
    <>
      <Tabs
        // defaultValue={"panels"}
        w={"80%"}
        mx={"auto"}
        value={typeOfInventory}
        defaultValue={"panels"}
        onChange={(value) => {
          if (value !== null) {
            setTypeOfInventory(value as inventoryTypes);
          }
        }}
      >
        <Tabs.List>
          <Tabs.Tab leftSection={<PanelIcon size={16} />} value={"panels"}>
            Painéis
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<MUPIcon size={16} strokeWidth={0.6} />}
            value={"mup"}
          >
            Mupis
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<BillboardIcon size={16} />}
            value={"billboards"}
          >
            Outdoors
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<LEDpanelIcon size={16} />}
            value={"LEDpanels"}
          >
            Painéis de LED
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <InventoryDisplay typeOfInventory={typeOfInventory} />
    </>
  );
}
