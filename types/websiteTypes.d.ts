export interface Fortnight {
  //bisemana -> fortnight
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
}

export interface Billboard extends Inventory {
  value: number;
}

export interface MUP {
  id: number;
  address: string;
  coordinates: string;
}

export interface Panel {
  id: number;
  address: string;
  coordinates: string;
}

export interface LEDPanel {
  id: number;
  address: string;
  coordinates: string;
}

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
