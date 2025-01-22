import { Billboard, Panel } from "@/types/websiteTypes";
import {
  Button,
  ComboboxData,
  Image,
  Loader,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconSlideshow } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export default function PresentationForm() {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState<ComboboxData>();

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

  return (
    <form>
      <Stack gap={"xl"}>
        <Select
          leftSection={loading && <Loader size={"sm"} />}
          searchable
          data={inventory}
          label="Ponto"
          placeholder="Selecione o ponto..."
          nothingFoundMessage="Nenhum ponto encontrado..."
        />
        <Image
          src={"https://placehold.co/2212x1554?text=Imagem+do+Ponto+(Teste)"}
        />
        <TextInput
          label={"Subtexto"}
          placeholder="Custos - Veiculação Mensal - Período..."
        />
        <Button type="submit" leftSection={<IconSlideshow />}>
          Gerar apresentação
        </Button>
      </Stack>
    </form>
  );
}
