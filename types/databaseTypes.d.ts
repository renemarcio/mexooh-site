export interface Bisemana {
  //bisemana
  id: number;
  numero: number;
  ano: number;
  inicio: Date;
  fim: Date;
}

export interface Pontos {
  //pontos
  //pon_out_pain P = Painel | O = Outdoor | L = LED | M = MUP
  id: number;
  empresaPertencenteID: number; //Empresas_Emp_codigo
  empresaPaganteID: number; //EmpresaCtaPagar
  proprietarioID: number; //Cadgeral_Cad_codigo
  cidadeID: number; //Cidades_cid_codigo
  lonaDimensoesID?: number; //DimLonas_lon_codigo
  estruturaID: number; //Estruturas_est_codigo
  dimensaoEstruturaID: number; //Dimensoes_dim_codigo
  parceria: boolean; //Parceria
  address: string; //pon_compl
  isUrban: boolean; //pon_urbana
  isLit: boolean; //pon_iluminado
  publico?: number; //pon_publico
  referencias?: string; //Referencias
  observacoes?: string; //pon_obs
  isAtivo: boolean; //pon_alugado
  valorAluguel: number; //Aluguel (OBS: Aluguel para o Proprietário)
  pagarSoComAnuncio: boolean; //PagarSohComAnuncio
  pon_alu_vei_sim: number; // ???
  pon_alu_vei_nao: number; // ???
  temIPTU: boolean; //pon_IPTU
  temEnergia: boolean; //pon_energia
  reservado: boolean; //pon_reservado (Vendedor reservou para o cliente)
  negocioID: number; //pon_nr_codigo
  dataFimDaReserva?: Date;
  permuta: boolean; //Permuta
  permutaID: number; //PermutaCodigo
  pagamentoTipoID: number; //TpPagamentos_idTPPagamentos
  frequencia: number; //frequencia
  proximoPagamento: Date; //ProxPagto
  diaPagamento: number; //DiaPagto
  identificacao?: string; //Identificacao
  mesReajuste: boolean; //pon_mes_reajuste
  indiceReajudeID: number; //indices_codigo
  ultimoReajuste: Date; //UltReajuste
  valorMesAnterior?: number; //vlrMesAnterior
  sequenciaDoCheckIn?: number; //SCheckin
  coordenadas?: string; //LinkMapa
  dataDeInserção: Date; //dtaInsercao
  dataDeAtivação: Date; //dtaAtivacao
  ultimoUsuarioAAlterar: number; //UserID
  podeUsarBisemanaImpar: boolean; //BiImpar
  face?: string; //pon_face
  valorInventario?: number; //VlrInventario
  valorDepreciacao?: number; //VlrDepreciacao
  valorNegocio?: number; //VlrNegocio
}

export interface Cliente {}

export interface Negocio {}
