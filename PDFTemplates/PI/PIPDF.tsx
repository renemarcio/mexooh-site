import { PIValuesType } from "@/components/_Forms/PIForm/PIForm";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import {
  Content,
  PageOrientation,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
export default function GeneratePIPDF(PIValues: PIValuesType) {
  const rows = PIValues.inventarios.map((inventario) => {
    return [
      {
        text: inventario.codigo.toString(),
        bold: true,
        alignment: "center",
      },
      // "Av. Juscelino Kubitschek - Painel LED - Esquina Centro Médico",
      inventario.localizacao,
      // "-23.5059244, -47.4606713",
      inventario.geolocalizacao,
      // "Bruto R$ 17.100,00 - Subsidio R$ 3.129,00 - Liquido - R$ 13.971,90",
      inventario.valor,
    ];
  });

  // pdfMake.vfs = vfsFonts.pdfMake.vfs;
  pdfMake.vfs = vfsFonts.vfs;

  pdfMake.tableLayouts = {
    PILayout: {
      vLineWidth: () => 0,
    },
  };
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [70, 60, 70, 60],
    pageOrientation: "landscape" as PageOrientation,
    defaultStyle: {
      fontSize: 8,
    },
    background: [
      {
        canvas: [
          {
            type: "rect",
            x: 841.995 - 75 - 25,
            y: 25,
            w: 75,
            h: 75,
            color: "#00652E",
          },
          {
            type: "rect",
            x: 25,
            y: 595.35 - 75 - 25,
            w: 75,
            h: 75,
            color: "#00652E",
          },
          {
            type: "rect",
            color: "white",
            x: (842.995 - 720) / 2,
            y: (595.35 - 472.355) / 2,
            w: 720,
            h: 472.355,
          },
        ],
      },
      {
        image:
          "data:image/png;base64,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",
        absolutePosition: {
          x: 80,
          y: 35,
        },
        width: 100,
      },
      {
        image:
          "data:image/png;base64,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",
        absolutePosition: {
          x: 842.995 - 220,
          y: 595.35 - 50,
        },
        width: 175,
      },
    ],
    content: [
      {
        text: "PI",
        bold: true,
        fontSize: 50,
        absolutePosition: {
          x: (842.995 - 50) / 2,
          y: 30,
        },
      },
      {
        text: "FAT: " + PIValues.faturamento,
        bold: true,
        fontSize: 10,
        absolutePosition: {
          x: 842.995 / 2 + 150,
          y: 55,
        },
      },
      {
        table: {
          widths: ["*", 300],
          body: [
            [
              {
                text: [
                  { text: "ANUNCIANTE: ", bold: true },
                  PIValues.anunciante,
                ],
              },
              {
                text: [
                  { text: "AUTORIZANTE: ", bold: true },
                  PIValues.autorizante,
                ],
              },
            ],
            [
              {
                text: [
                  { text: "RAZÃO SOCIAL: ", bold: true },
                  PIValues.razaoSocial,
                ],
              },
              { text: [{ text: "TELEFONE: ", bold: true }, PIValues.telefone] },
            ],
            [
              { text: [{ text: "ENDEREÇO: ", bold: true }, PIValues.endereco] },
              { text: [{ text: "EMAIL: ", bold: true }, PIValues.email] },
            ],
            [
              { text: [{ text: "CNPJ/CPF: ", bold: true }, PIValues.cnpjcpf] },
              { text: [{ text: "DATA: ", bold: true }, PIValues.data] },
            ],
            [
              {
                text: [
                  { text: "PLANEJADOR: ", bold: true },
                  PIValues.planejador,
                ],
              },
              "",
            ],
            [
              { text: [{ text: "AGENCIA: ", bold: true }, PIValues.agencia] },
              "",
            ],
            [
              {
                text: [
                  { text: "TÍTULO/CAMPANHA: ", bold: true },
                  PIValues.campanha,
                ],
              },
              {
                text: [
                  { text: "PERÍODO VEICULAÇÃO: ", bold: true },
                  PIValues.periodo,
                ],
              },
            ],
            [
              {
                text: [
                  { text: "ARQUIVO A SER INSERIDO: ", bold: true },
                  PIValues.arquivo,
                ],
              },
              {
                text: [
                  { text: "ESPAÇO NA GRADE Á OCUPAR: ", bold: true },
                  PIValues.grade,
                ],
              },
            ],
            [
              {
                text: [
                  { text: "NÚMERO DE PARCELAS: ", bold: true },
                  PIValues.parcelas,
                ],
              },
              {
                text: [
                  { text: "VENCIMENTO: ", bold: true },
                  PIValues.vencimento,
                ],
              },
            ],
            [
              {
                text: [
                  { text: "QUANTIDADE DE INSERÇÕES: ", bold: true },
                  PIValues.insercoes,
                ],
              },
              {
                text: [{ text: "CPM30: ", bold: true }, PIValues.cpm30],
              },
            ],
          ],
        },
        margin: [0, 30, 0, 20],
        layout: {
          vLineWidth: function (i, node) {
            return i === 0 || i === 2 ? 1 : 0;
          },
        },
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto"],
          body: [
            [
              { text: "CÓDIGO", bold: true, alignment: "center" },
              { text: "LOCALIZAÇÃO", bold: true, alignment: "center" },
              { text: "GEOLOCALIZAÇÃO", bold: true, alignment: "center" },
              { text: "VALOR", bold: true, alignment: "center" },
            ],
            // [
            //   {
            //     text: PIValues.inventarios[0].codigo.toString(),
            //     bold: true,
            //     alignment: "center",
            //   },
            //   // "Av. Juscelino Kubitschek - Painel LED - Esquina Centro Médico",
            //   PIValues.inventarios[0].localizacao,
            //   // "-23.5059244, -47.4606713",
            //   PIValues.inventarios[0].geolocalizacao,
            //   // "Bruto R$ 17.100,00 - Subsidio R$ 3.129,00 - Liquido - R$ 13.971,90",
            //   PIValues.inventarios[0].valor,
            // ],
            ...rows,
          ],
        },
        margin: [0, 0, 0, 20],
      },
      {
        text: [
          "Cláusulas Contratuais: Por este instrumento e na melhor forma de direito, o signatário do presente qualificado e doravante designado ANUNCIANTE e de outro lado, a ",
          {
            text: "MANCHESTER OUTDOOR LTDA, CNPJ: 30.750.153/0001-17,",
            bold: true,
          },
          " doravante designada EXIBIDORA, têm, entre si, justo e contratado, o presente instrumento que reger-se-á pelas cláusulas seguintes:\n1 – A EXIBIDORA prestará ao ANUNCIANTE o serviço de locação em painel de led cujos local, período de exibição, preço e modalidade de pagamento estão especificados acima.\n2 – O presente instrumento é documento hábil para comprovar negociação ora celebrada e legitimar os pagamentos decorrentes, ficando autorizada a cobrança dos valores devidos por intermédio de documento bancário. O atraso nos pagamentos acarretará a cobrança de multa no valor de 9% ao mês, sobre o valor da parcela e juros de mora.\n3 – A Rescisão contratual unilateral pela ANUNCIANTE, antes de findado o período contratado, acarretará na obrigação da mesma pagar à EXIBIDORA multa correspondente à 20% (vinte por cento) do valor remanescente não pago.\n4 – Construir-se-á causa de rompimento deste contrato o inadimplemento, por qualquer das partes, de quaisquer das obrigações que lhes competem, aqui previstas, ressalvadas as disposições pertinentes estabelecidas neste instrumento e respondendo pelas obrigações decorrentes deste contrato.\n5 – O signatário especificado acima designado como autorizante declara ser legal e formalmente habilitado para assinar este instrumento respondendo inclusive pessoal e solidariamente, pelas obrigações decorrentes deste contrato.",
        ],
        // marginTop: 10,
      },
      {
        marginTop: 60,
        columns: [
          {
            width: "*",
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: "AUTORIZANTE",
                    bold: true,
                    alignment: "center",
                    fontSize: 10,
                  },
                ],
              ],
            },
            layout: {
              vLineWidth: function () {
                return 0;
              },
              hLineWidth: function (i) {
                return i === 0 ? 1 : 0;
              },
            },
          },
          {
            width: "25%",
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: "CPF",
                    bold: true,
                    alignment: "center",
                    fontSize: 10,
                  },
                ],
              ],
            },
            layout: {
              vLineWidth: function () {
                return 0;
              },
              hLineWidth: function (i) {
                return i === 0 ? 1 : 0;
              },
            },
          },
          {
            width: "*",
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    text: "ASSINATURA",
                    bold: true,
                    alignment: "center",
                    fontSize: 10,
                  },
                ],
              ],
            },
            layout: {
              vLineWidth: function () {
                return 0;
              },
              hLineWidth: function (i) {
                return i === 0 ? 1 : 0;
              },
            },
          },
        ],
        columnGap: 10,
      },
    ],
  };
  pdfMake.createPdf(docDefinition).open();
}
