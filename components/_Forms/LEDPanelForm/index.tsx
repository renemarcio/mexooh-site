import { Fortnight, LEDPanel } from "@/types/websiteTypes";
import VideoDropZone from "./VideoDropZone";
import {
  Button,
  Code,
  MultiSelect,
  Space,
  TextInput,
  Text,
  Stack,
  NumberInput,
  Fieldset,
  Grid,
  Radio,
  Chip,
  Group,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";
import { DatePickerInput } from "@mantine/dates";

interface Props {
  panel: LEDPanel;
  closeFn: () => void;
}
export interface LEDPanelFormValues {
  file: File;
  grid: string[];
}
export default function LEDPanelForm({ panel, closeFn }: Props) {
  const form = useForm<LEDPanelFormValues>({
    // mode: "uncontrolled",
    initialValues: {
      file: {} as File,
      grid: [],
    },
  });
  const gridSize = Array(18).fill(undefined);
  async function handleSubmit(values: LEDPanelFormValues) {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("grid", JSON.stringify(values.grid));
    const res = await fetch("/api/uploadFile", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    });
    console.log(await res.json());
  }

  return (
    <form
      // onSubmit={form.onSubmit(handleSubmit)}
      onSubmit={form.onSubmit(() => console.log(":0)"))}
    >
      {/* <Text>
        Olá! Nosso banco de dados ainda não tem suporte para o upload de vídeos.
        Nosso especialista em Banco de Dados está trabalhando duro para
        adicionar essa funcionalidade. Quando estiver pronto, ficará parecido
        com isto:
      </Text> */}
      <Text c={"dimmed"} fs={"italic"} size="sm" ta={"center"} mb={"xl"}>
        Em breve, novas funcionalidades! O que esperar:
      </Text>
      <Stack gap={"lg"}>
        <VideoDropZone form={form} />
        {/* <Space h={"xl"} /> */}
        <DatePickerInput
          label={"Data de aluguel"}
          placeholder={"Data..."}
          valueFormat="DD/MM/YYYY"
        />
        <NumberInput
          min={1}
          defaultValue={1}
          label={"Quantidade de meses à alugar"}
          placeholder={"Quero alugar por..."}
        />
        <Fieldset legend={"Grade de horários"}>
          <Chip.Group multiple {...form.getInputProps("grid")}>
            <Grid>
              {gridSize.map((_, index) => (
                <Grid.Col span={4}>
                  <Center>
                    <Chip value={`${index + 1}`}>{`${index + 1}`}</Chip>
                  </Center>
                </Grid.Col>
              ))}
            </Grid>
          </Chip.Group>
        </Fieldset>
        {/* <Code>{JSON.stringify(form.getValues(), null, 2)}</Code> */}
        <Button type="submit" fullWidth>
          Enviar vídeo e reservar
        </Button>
      </Stack>
    </form>
  );
}
