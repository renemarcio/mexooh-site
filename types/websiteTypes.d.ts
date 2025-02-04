// INTERFACES

//#region Interfaces
export interface Fortnight {
  id: number;
  number: number;
  year: number;
  start: Date;
  finish: Date;
}

export interface Inventory {
  id: number;
  address: string;
  coordinates: string;
  thumbnailUrl?: string;
}

export interface Billboard extends Inventory {
  value: number;
}

export interface MUPI extends Inventory {}

export interface Panel extends Inventory {}

export interface LEDPanel extends Inventory {}

export interface City {
  id: number;
  name: string;
  state: string;
}

export interface MatrixDataType {
  id: string;
  address: string;
  coordinates: string;
  type: string;
  media: string;
}

export interface InfoOOHPanelInfoType {
  id: number;
  latitude: number;
  longitude: number;
  dailyImpacts: number;
  monthlyImpacts: number;
  value: number;
  CPM30: number;
  CPM14: number;
  CPM7: number;
  CPM1: number;
}
//#endregion

// UNION TYPES

//#region UnionTypes

export type inventoryTypes = "panels" | "mupi" | "billboards" | "LEDpanels";

//#endregion

// ENUMS

//#region Enums

export enum InventoryType {
  panels = "panels",
  mupi = "mupi",
  billboards = "billboards",
  LEDpanels = "LEDpanels",
}

//#endregion
