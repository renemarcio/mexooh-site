import db from "@/utils/mysqlConnection";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const SQL = `SELECT id_bisemana FROM alugadas ${
    searchParams.get("id") !== null
      ? "WHERE inventario = " + searchParams.get("id")
      : ""
  }`;
  const SQLTest =
    "Select Pontos.pon_codigo as Codigo, Pontos.pon_compl As Localizacao,Pontos.pon_iluminado,  Upper(cidades.cid_nome) as Cidade From pontos Left Join Cidades   On Pontos.Cidades_cid_codigo = Cidades.cid_codigo Where Pontos.pon_outd_pain = 'O'        ## Só Outdoors And   pontos.pon_alugado = 'S' And   pontos.pon_codigo NOT IN ( Select itensnegocios.Pontos_pon_codigo from   itensnegocios  Where  itensnegocios.biSemana_bi_codigo In (500, 522)   # linha 10 And    itensnegocios.Tipo In ('L','B','C','D','T','M') ) Order by Codigo;";
  const [results] = await db.query<RowDataPacket[]>(SQL);
  const data = results.map(
    (obj: RowDataPacket) => (obj as { id_bisemana: number }).id_bisemana
  );
  return NextResponse.json({ data: data });
}

// Select Pontos.pon_codigo as Codigo, Pontos.pon_compl As Localizacao,Pontos.pon_iluminado,
//        Upper(cidades.cid_nome) as Cidade
// From pontos
// Left Join Cidades   On Pontos.Cidades_cid_codigo = Cidades.cid_codigo
// Where Pontos.pon_outd_pain = 'O'        ## Só Outdoors
// And   pontos.pon_alugado = 'S'
// And   pontos.pon_codigo NOT IN
// (
//  Select itensnegocios.Pontos_pon_codigo
//   from   itensnegocios
//   Where  itensnegocios.biSemana_bi_codigo In (500, 522)   # linha 10
//   And    itensnegocios.Tipo In ('L','B','C','D','T','M')
// )
// Order by Codigo;
