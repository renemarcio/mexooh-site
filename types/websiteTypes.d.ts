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
