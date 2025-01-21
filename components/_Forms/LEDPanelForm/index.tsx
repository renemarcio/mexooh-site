import { Fortnight, LEDPanel } from "@/types/websiteTypes";
import VideoDropZone from "./VideoDropZone";
import { Button, Code, MultiSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";

interface Props {
  panel: LEDPanel;
  closeFn: () => void;
}
export interface LEDPanelFormValues {
  file: File;
  fortnights: string[];
}
export default function LEDPanelForm({ panel, closeFn }: Props) {
  const form = useForm<LEDPanelFormValues>({
    // mode: "uncontrolled",
    initialValues: {
      file: {} as File,
      fortnights: [],
    },
  });

  async function handleSubmit(values: LEDPanelFormValues) {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("fortnights", JSON.stringify(values.fortnights));
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <VideoDropZone form={form} />
      <Space h={"xl"} />
      <MultiSelect
        data={[
          { label: "Semanal", value: "1" },
          { label: "Bi-Semanal", value: "2" },
          { label: "Semanal 2", value: "3" },
          { label: "Bi-Semanal 2", value: "4" },
          { label: "Semanal 3", value: "5" },
          { label: "Bi-Semanal 3", value: "6" },
        ]}
        label="Bi-Semanas"
        {...form.getInputProps("fortnights")}
      />
      <Code>{JSON.stringify(form.getValues(), null, 2)}</Code>
      <Button type="submit" fullWidth>
        Enviar vídeo e reservar
      </Button>
    </form>
  );
}
