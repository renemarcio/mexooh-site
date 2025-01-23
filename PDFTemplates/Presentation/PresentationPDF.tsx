import { PIValuesType } from "@/components/_Forms/PIForm/PIForm";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import {
  Content,
  PageOrientation,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { CoverImageBase64, SecondImageBase64, ThirdImageBase64 } from "./PresentationImages";
import { imageBase64 } from "@/public/logos/base64logo";
import { MexLogoWhiteBase64 } from "@/public/logos/LogosBase64";
export default function GeneratePresentationPDF() {
  
  pdfMake.vfs = vfsFonts.vfs;

  const blackBGHeight = 1047

  const docDefinition: TDocumentDefinitions = {
    pageSize: {
      width: 1600,
      height: 1132
    },
    pageMargins: [0, 0, 0, 0],
    pageOrientation: "landscape" as PageOrientation,
    defaultStyle: {
      color: "#FFFFFF",
      fontSize: 8,
    },
    background:[
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
      {image: "logo", width:96, marginTop: -65, marginRight:17, alignment: "right"},
    ],
    content:[
      {image: "coverImage"},
      {image: "secondImage"},
      {image: "thirdImage"},
      "MUSTAAAAAAAAAAAAAAAAAAAAAAAAAAAARD"
    ],
    images:{
      logo: MexLogoWhiteBase64,
      coverImage: CoverImageBase64,
      secondImage: SecondImageBase64,
      thirdImage: ThirdImageBase64,
    } 
  };
  pdfMake.createPdf(docDefinition).open();
}
