"use client";

import InventoryDisplay from "@/components/InventoryDisplay";
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
          <Tabs.Tab value={"panels"}>Painéis</Tabs.Tab>
          <Tabs.Tab value={"mup"}>Mupis</Tabs.Tab>
          <Tabs.Tab value={"billboards"}>Outdoors</Tabs.Tab>
          <Tabs.Tab value={"LEDpanels"}>Painéis de LED</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <InventoryDisplay typeOfInventory={typeOfInventory} />
    </>
  );
}
