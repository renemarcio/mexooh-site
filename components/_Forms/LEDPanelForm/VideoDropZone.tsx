import { Group, Image, Paper, Text } from "@mantine/core";
import {
  Dropzone,
  DropzoneAccept,
  DropzoneIdle,
  DropzoneReject,
  FileWithPath,
} from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { IconPlayerPlay, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { LEDPanelFormValues } from ".";

interface Props {
  form: UseFormReturnType<LEDPanelFormValues>;
}

export default function VideoDropZone({ form }: Props) {
  const [file, setFile] = useState<FileWithPath>();
  const preview = file
    ? () => {
        const imgURL = URL.createObjectURL(file);
        return (
          <Image src={imgURL} onLoad={() => URL.revokeObjectURL(imgURL)} /> //Swap this for video afterwards
        );
      }
    : undefined;
  return (
    <Dropzone
      // accept={{ "video/*": [] }}
      accept={{ "image/*": [] }} // Just testing with images, if it works, should work with video too
      onDrop={(file) => {
        setFile(file[0]);
        form.setFieldValue("file", file[0]);
      }}
      h={220}
      multiple={false}
    >
      <Paper withBorder p={"sm"} h={220}>
        <Group justify="center" h={"100%"}>
          <DropzoneIdle>
            <IconPlayerPlay
              color="var(--mantine-color-midiagreen-3)"
              size={80}
            />
          </DropzoneIdle>
          <DropzoneAccept>
            <IconUpload color="var(--mantine-color-midiagreen-7)" size={80} />
          </DropzoneAccept>
          <DropzoneReject>
            <IconX color="var(--mantine-color-red-7)" size={80} />
          </DropzoneReject>
          <div>
            <DropzoneIdle>
              <Text ta={"center"}>Envie seu vídeo aqui!</Text>
            </DropzoneIdle>
            <DropzoneAccept>
              <Text ta={"center"}>Agora é só soltar!</Text>
            </DropzoneAccept>
            <DropzoneReject>
              <Text ta={"center"}>Drop inválido!</Text>
            </DropzoneReject>
            <Text c={"dimmed"} size="sm" ta={"center"}>
              Tamanho máximo de 5GB, apenas 1 arquivo de vídeo.
            </Text>
          </div>
        </Group>
      </Paper>
    </Dropzone>
  );
}
