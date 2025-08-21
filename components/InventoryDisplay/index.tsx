"use client";
import { inventoryTypes } from "@/types/websiteTypes";
import { Tabs } from "@mantine/core";
import { useState } from "react";
import BillboardIcon from "../_Icons/billboard";
import LEDpanelIcon from "../_Icons/ledpanel";
import MUPIIcon from "../_Icons/mupi";
import PanelIcon from "../_Icons/panel";
import InventoryDisplayMainLayout from "./InventoryDisplayMainLayout";

interface Props {
  typeOfInventory: inventoryTypes;
  setTypeOfInventory: (value: inventoryTypes) => void;
}

export default function InventoryDisplay({
  setTypeOfInventory,
  typeOfInventory,
}: Props) {
  return (
    <>
      <Tabs
        w={"80%"}
        mx={"auto"}
        value={typeOfInventory}
        onChange={(value) => {
          if (value !== null) {
            setTypeOfInventory(value as inventoryTypes);
          }
        }}
      >
        <Tabs.List>
          <Tabs.Tab leftSection={<PanelIcon size={16} />} value={"panels"}>
            Rodovia
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<MUPIIcon size={16} strokeWidth={0.6} />}
            value={"mupi"}
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

      <InventoryDisplayMainLayout typeOfInventory={typeOfInventory} />
    </>
  );
}
