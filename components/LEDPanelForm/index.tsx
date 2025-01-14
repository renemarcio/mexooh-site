import { Fortnight, LEDPanel } from "@/types/websiteTypes";
import VideoDropZone from "./VideoDropZone";
import { Code, MultiSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";

interface Props {
  panel: LEDPanel;
  closeFn: () => void;
}
export interface LEDPanelFormValues {
  videoFile: FileWithPath;
  fortnights: string[];
}
export default function LEDPanelForm({ panel, closeFn }: Props) {
  const form = useForm<LEDPanelFormValues>({
    // mode: "uncontrolled",
    initialValues: {
      videoFile: {} as FileWithPath,
      fortnights: [],
    },
  });
  return (
    <>
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
    </>
  );
}
