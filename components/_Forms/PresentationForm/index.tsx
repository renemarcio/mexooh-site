import GeneratePresentationPDF from "@/PDFTemplates/Presentation/PresentationPDF";
import { Panel } from "@/types/websiteTypes";
import {
  Button,
  ComboboxData,
  Image,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSlideshow } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export default function PresentationForm() {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState<ComboboxData>();
  const form = useForm({
    initialValues:{
      inventoryID: "",
      complementaryText: "",
    }
  });
  
  async function fetchInventory() {
    const response = await fetch("/api/panels");
    const data = await response.json();
    console.log("Data from fetchInventory in PresentationForm: ", data);
    const select = data.data.map((obj: Panel) => {
      return {
        value: obj.id.toString(),
        label: obj.address,
      };
    });
    setInventory(select);
    return select;
  }

  useMemo(() => {
    setLoading(true);
    fetchInventory();
    setLoading(false);
  }, []);

  function handleSubmit(){
    GeneratePresentationPDF();
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
          src={"https://placehold.co/2212x1554?text=Imagem+do+Ponto+(Teste)"}
        />
        <TextInput
          label={"Texto complementar"}
          placeholder="Custos - Veiculação Mensal - Período..."
          {...form.getInputProps("complementaryText")}
        />
        <Button type="submit" leftSection={<IconSlideshow />}>
          Gerar apresentação
        </Button>
      </Stack>
    </form>
  );
}
