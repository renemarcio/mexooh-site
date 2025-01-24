import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { PageOrientation, TDocumentDefinitions } from "pdfmake/interfaces";
import {
  CoverImageBase64,
  SecondImageBase64,
  ThirdImageBase64,
  PlaceholderImage,
} from "./PresentationImages";
import { MexLogoWhiteBase64 } from "@/public/logos/LogosBase64";
import { InfoOOHPanelInfoType, Inventory } from "@/types/websiteTypes";

export interface PresentationValuesType {
  inventory: Inventory;
  description: string;
  image: string;
}

// export default function GeneratePresentationPDF({
//   inventory,
//   description,
//   image,
// }: PresentationValuesType) {
export default function GeneratePresentationPDF(
  inventory: Inventory,
  description: string,
  image: string
) {
  pdfMake.vfs = vfsFonts.vfs;

  const blackBGHeight = 1047;
  const docWidth = 1600;
  const docHeight = 1132;
  const infoTitleFontSize = 19;
  const yellowColor = "#FFBD24";
  const greenColor = "#71D141";
  const lightGreenColor = "#A8D41E";
  const blueColor = "#2491D5";
  const orangeColor = "#FF9940";
  const redColor = "#FF6D39";

  const docDefinition: TDocumentDefinitions = {
    pageSize: {
      width: docWidth,
      height: docHeight,
    },
    pageMargins: [0, 0, 0, 0],
    pageOrientation: "landscape" as PageOrientation,
    defaultStyle: {
      color: "#FFFFFF",
      fontSize: 25,
      alignment: "center",
    },
    background: [
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 1600,
            h: blackBGHeight,
            color: "#000",
          },
          {
            type: "rect",
            x: 0,
            y: blackBGHeight,
            w: 1600,
            h: 1132 - blackBGHeight,
            color: "#00652E",
          },
        ],
      },
      {
        image: "logo",
        width: 96,
        marginTop: -65,
        marginRight: 17,
        alignment: "right",
      },
    ],
    content: [
      { image: "coverImage" },
      { image: "secondImage" },
      { image: "thirdImage", pageBreak: "after" },
      {
        // text: "Ponto 544 - Rod. Castello Branco, km 31+900m – Face Sorocaba - Jandira",
        text: inventory.address,
        alignment: "center",
        bold: true,
        marginTop: 40,
        marginBottom: 20,
        fontSize: 28,
      },
      {
        image: "placeholderImage",
        alignment: "center",
        cover: {
          width: docWidth - 2 * 50,
          height: 650,
        },
      },
      {
        table: {
          widths: [docWidth / 3 - 30, docWidth / 3 - 30, docWidth / 3 - 30],
          body: [
            [
              {
                table: {
                  widths: ["auto", "auto"],
                  body: [
                    [
                      {
                        text: [
                          {
                            text: "FREQUÊNCIA VISUALIZAÇÃO\n",
                            style: { fontSize: infoTitleFontSize },
                          },
                          {
                            text: [
                              { text: "25,97 ", style: { color: "#FFBD24" } },
                              // { text: infoOOH.,  color: yellowColor  },
                              {
                                text: "VISUALIZAÇÕES",
                                style: {
                                  fontSize: infoTitleFontSize,
                                  color: yellowColor,
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        text: [
                          {
                            text: "IMPACTOS | VISUALIZAÇÕES TOTAL\n",
                            style: { fontSize: infoTitleFontSize },
                          },
                          { text: "9.100.477", color: greenColor },
                        ],
                      },
                    ],
                    [
                      {
                        text: [
                          { text: "G.R.P.\n", fontSize: infoTitleFontSize },
                          { text: "20", style: { color: yellowColor } },
                        ],
                      },
                      {
                        text: [
                          {
                            text: "IMPACTOS | VISUALIZAÇÕES MÉDIA POR LOCAL\n",
                            fontSize: infoTitleFontSize,
                          },
                          { text: "9.100.477", style: { color: greenColor } },
                        ],
                      },
                    ],
                  ],
                },
              },
              {
                table: {
                  widths: ["auto", "auto", "auto"],
                  body: [
                    [
                      {
                        colSpan: 3,
                        text: ["CPM TOTAL"],
                        alignment: "left",
                      },
                      {},
                      {},
                    ],
                    [
                      {
                        text: [
                          "CPM 30\n",
                          { text: "R$ 0,99", style: { color: greenColor } },
                        ],
                      },
                      {
                        text: [
                          "CPM 14\n",
                          {
                            text: "R$ 2,12",
                            style: { color: lightGreenColor },
                          },
                        ],
                      },
                      {},
                    ],
                    [
                      {
                        text: [
                          "CPM 7\n",
                          { text: "R$ 4,24", style: { color: yellowColor } },
                        ],
                      },
                      {
                        text: [
                          "CPM 1\n",
                          { text: "R$ 29,67", style: { color: orangeColor } },
                        ],
                      },
                      {
                        text: [
                          "CPM VISUALIZAÇÕES\n",
                          { text: "R$ 0,99", style: { color: redColor } },
                        ],
                      },
                    ],
                  ],
                },
              },
              {
                text: [
                  {
                    text: "Dimensões:5,00 x 15,00 = 75,00m² - Frontlight\n",
                    alignment: "left",
                  },
                  {
                    text: "Coordenadas: -23.5169662 -46.9295337\n",
                    alignment: "left",
                  },
                  {
                    text: "Link: https://maps.app.goo.gl/nH7oxUdnzyNGU3X47\n",
                    alignment: "left",
                    noWrap: true,
                  },
                ],
              },
            ],
          ],
        },
        marginLeft: 45,
      },
      {
        // text: "Custos Líquidos - Veiculação Mensal: R$ 9.000,00 – Período Contratual 12 (meses) Com Disponibilidade a partir de 01/03/2025",
        text: description,
        alignment: "center",
        bold: true,
        fontSize: 28,
        margin: [100, 0, 100, 0],
      },
    ],
    images: {
      logo: MexLogoWhiteBase64,
      coverImage: CoverImageBase64,
      secondImage: SecondImageBase64,
      thirdImage: ThirdImageBase64,
      placeholderImage: image,
      // placeholderImage: PlaceholderImage,
    },
  };
  pdfMake.createPdf(docDefinition).open();
}
