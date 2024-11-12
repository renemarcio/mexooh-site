export interface Fortnight {
  //bisemana -> fortnight
  id: number;
  number: number;
  year: number;
  start: Date;
  finish: Date;
}

export interface Billboard {
  id: number;
  address: string;
  coordinates: string;
  value: number;
}

export interface City {
  id: number;
  name: string;
  state: string;
}
