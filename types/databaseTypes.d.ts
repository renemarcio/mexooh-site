export enum Tabelas {
  bisemana = "bisemana",
  pontos = "pontos",
  cadGeral = "cadGeral",
}

export interface Bisemana {
  //bisemana
  bi_codigo: number;
  bi_numero: number;
  bi_ano: number;
  bi_inicio: Date;
  bi_final: Date;
}

export interface Pontos {
  //pontos
  //pon_out_pain P = Painel | O = Outdoor | L = LED | M = MUP
  pon_codigo: number;
  Empresas_Emp_codigo: number; //Empresas_Emp_codigo
  EmpresaCtaPagar: number; //EmpresaCtaPagar
  Cadgeral_Cad_codigo: number; //Cadgeral_Cad_codigo
  Cidades_cid_codigo: number; //Cidades_cid_codigo
  DimLonas_lon_codigo?: number; //DimLonas_lon_codigo
  Estruturas_est_codigo: number; //Estruturas_est_codigo
  Dimensoes_dim_codigo: number; //Dimensoes_dim_codigo
  Parceria: boolean; //Parceria
  pon_compl: string; //pon_compl
  pon_urbana: boolean; //pon_urbana
  pon_iluminado: string; //pon_iluminado
  pon_publico?: number; //pon_publico
  Referencias?: string; //Referencias
  pon_obs?: string; //pon_obs
  pon_alugado: boolean; //pon_alugado
  Aluguel: number; //Aluguel (OBS: Aluguel para o Proprietário)
  PagarSohComAnuncio: boolean; //PagarSohComAnuncio
  pon_alu_vei_sim: number; // ???
  pon_alu_vei_nao: number; // ???
  temIPTU: boolean; //pon_IPTU
  pon_energia: boolean; //pon_energia
  reservado: boolean; //pon_reservado (Vendedor reservou para o cliente)
  pon_nr_codigo: number; //pon_nr_codigo
  dataFimDaReserva?: Date;
  Permuta: boolean; //Permuta
  PermutaCodigo: number; //PermutaCodigo
  TpPagamentos_idTPPagamentos: number; //TpPagamentos_idTPPagamentos
  frequencia: number; //frequencia
  ProxPagto: Date; //ProxPagto
  DiaPagto: number; //DiaPagto
  Identificacao?: string; //Identificacao
  pon_mes_reajuste: boolean; //pon_mes_reajuste
  indices_codigo: number; //indices_codigo
  UltReajuste: Date; //UltReajuste
  vlrMesAnterior?: number; //vlrMesAnterior
  SCheckin?: number; //SCheckin
  LinkMapa?: string; //LinkMapa
  dtaInsercao: Date; //dtaInsercao
  dtaAtivacao: Date; //dtaAtivacao
  UserID: number; //UserID
  BiImpar: boolean; //BiImpar
  pon_face?: string; //pon_face
  VlrInventario?: number; //VlrInventario
  VlrDepreciacao?: number; //VlrDepreciacao
  VlrNegocio?: number; //VlrNegocio
}

export interface Cidade {
  cid_codigo: number;
  cid_nome: string;
  cid_uf: string;
}

export interface Cliente {}

export interface Negocio {}
