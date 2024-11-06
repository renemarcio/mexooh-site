export interface Bisemana {
  id: number;
  numero: number;
  ano: number;
  inicio: Date;
  fim: Date;
}

export interface Painel {
  id: number;
  address: string;
  currentAnnouncerID?: string;
}

export interface Outdoor {
  id: number;
  address: string;
  currentAnnouncersIDs: string[];
}

export interface PainelLED {}

export interface Cliente {}

export interface Negocio {}
