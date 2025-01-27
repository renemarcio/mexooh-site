import GeneratePresentationPDF from "@/PDFTemplates/Presentation/PresentationPDF";
import {
  MyDocument,
  RenderPDF,
} from "@/PDFTemplates/Presentation/reactpdftext";
import { Panel } from "@/types/websiteTypes";
import { toDataURL } from "@/utils/toDataURL";
import {
  Button,
  Code,
  ComboboxData,
  Image,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// import ReactPDF, { pdf, usePDF } from "@react-pdf/renderer";
import { IconSlideshow } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

export default function PresentationForm() {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState<ComboboxData>();
  const [panelThumbnail, setPanelThumbnail] = useState("");
  // const [instance, update] = usePDF();
  const form = useForm({
    initialValues: {
      inventoryID: "",
      complementaryText: "",
    },
  });

  async function fetchInventory() {
    const response = await fetch("/api/panels");
    const data = await response.json();

    const select = data.data.map((obj: Panel) => {
      return {
        value: obj.id.toString(),
        label: obj.address,
      };
    });
    setInventory(select);
    return select;
  }

  async function fetchPanelThumbnail() {
    // const response = await fetch(`/api/panels?id=${form.values.inventoryID}`);
    // const data = await response.json();
    toDataURL(
      "/photos/Paineis/" +
        String(form.values.inventoryID).padStart(6, "0") +
        ".jpg",
      (base64Panel) => {
        setPanelThumbnail(base64Panel);
      }
    );

    // setPanelThumbnail(data.data[0].signedUrl);
  }

  useEffect(() => {
    fetchPanelThumbnail();
  }, [form.values.inventoryID]);

  useMemo(() => {
    setLoading(true);
    fetchInventory();
    setLoading(false);
  }, []);

  //   const handleGeneratePDF = async () => {
  //     const blob = await pdf(<MyDocument />).toBlob();
  //     const url = URL.createObjectURL(blob);
  //     const newTab = window.open(url, '_blank');
  //     if (newTab) newTab.focus();
  //   };

  const handleReactPDFGeneration = async () => {
    // const blob = await pdf(<MyDocument />).toBlob();
    // const url = URL.createObjectURL(blob);
    // const newTab = window.open(url, "_blank");
    const newTab = window.open("www.google.com", "_blank");
    if (newTab) newTab.focus();
  };

  // async function handleReactPDFGenTest() {
  //   handleReactPDFGeneration();
  // }

  // const openPdfInNewTab = async () => {
  //   try {
  //     // Generate the PDF as a Blob asynchronously
  //     const blob = await pdf(<MyDocument />).toBlob();

  //     // Create a temporary URL for the Blob
  //     const url = URL.createObjectURL(blob);

  //     // Open the URL in a new browser tab
  //     window.open(url, "_blank");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  async function fetchPanel(id: string) {
    const response = await fetch(`/api/panels?id=${id}`);
    const data = await response.json();
    return data.data[0];
  }

  async function handleSubmit() {
    const panel = await fetchPanel(form.values.inventoryID);
    const description = form.values.complementaryText;
    const image = panelThumbnail;
    GeneratePresentationPDF(panel, description, image);
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={"xl"}>
        <Select
          leftSection={loading && <Loader size={"sm"} />}
          searchable
          data={inventory}
          label="Ponto"
          placeholder="Selecione o ponto..."
          nothingFoundMessage="Nenhum ponto encontrado..."
          {...form.getInputProps("inventoryID")}
        />
        <Image
          src={panelThumbnail}
          fallbackSrc={"https://placehold.co/2212x1554?text=Imagem+do+Ponto"}
        />
        <TextInput
          label={"Texto complementar"}
          placeholder="Custos - Veiculação Mensal - Período..."
          {...form.getInputProps("complementaryText")}
        />
        <Button type="submit" leftSection={<IconSlideshow />}>
          Gerar apresentação
        </Button>
        {/* <Button
          color="blue"
          leftSection={<IconSlideshow />}
          onClick={openPdfInNewTab}
        >
          Teste React-PDF
        </Button> */}
      </Stack>
    </form>
  );
}
