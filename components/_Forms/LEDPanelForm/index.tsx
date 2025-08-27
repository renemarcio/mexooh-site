// components/_Forms/LEDPanelForm.tsx
"use client";

import React from "react";
import {
  Button,
  Text,
  Stack,
  NumberInput,
  Fieldset,
  Grid,
  Chip,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import VideoDropZone from "./VideoDropZone";
import type { LEDPanel } from "@/types/websiteTypes";

type Props = {
  panel: LEDPanel;
  closeFn: () => void;

  /** opcionais: use se quiser fechar e rolar para alguma seção após ações */
  scrollToInventory?: () => void;   // geralmente rolar para #LEDpanels
  scrollToBillboards?: () => void;  // geralmente rolar para #billboards
};

export interface LEDPanelFormValues {
  file: File | null;
  grid: string[];           // horários selecionados
  startDate: Date | null;   // data de início
  fortnights: number;       // quantidade de quinzenas
}

export default function LEDPanelForm({
  panel,
  closeFn,
  scrollToInventory,
  scrollToBillboards,
}: Props) {
  const form = useForm<LEDPanelFormValues>({
    initialValues: {
      file: null,
      grid: [],
      startDate: null,
      fortnights: 1,
    },
    validate: {
      file: (v) => (!!v ? null : "Selecione um arquivo de vídeo"),
      startDate: (v) => (!!v ? null : "Informe a data de início"),
      fortnights: (v) => (v >= 1 ? null : "Mínimo de 1 quinzena"),
    },
  });

  const gridSize = Array.from({ length: 18 });

  async function handleSubmit(values: LEDPanelFormValues) {
    try {
      const formData = new FormData();
      if (values.file) formData.append("file", values.file);
      formData.append("grid", JSON.stringify(values.grid));
      if (values.startDate)
        formData.append("startDate", values.startDate.toISOString());
      formData.append("fortnights", String(values.fortnights));
      formData.append("panelId", String((panel as any)?.id ?? ""));

      const res = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        // não quebra a UI – mostre um alerta/toast se preferir
        console.error("Falha no upload:", await res.text());
        return;
      }

      // sucesso: fecha e (opcional) rola para onde você quiser
      closeFn();
      // exemplo: após reservar, voltar para LED ou ir para outdoors
      // scrollToInventory?.();
      // scrollToBillboards?.();
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Text c="dimmed" fs="italic" size="sm" ta="center" mb="xl">
        Envie seu vídeo e selecione os horários desejados.
      </Text>

      <Stack gap="lg">
        {/* upload */}
        <VideoDropZone
          form={form}
          // se o componente espera uma prop específica para setar o arquivo,
          // ele deve chamar form.setFieldValue("file", file)
        />

        {/* data de início */}
        <DatePickerInput
          label="Data de início do aluguel"
          placeholder="Data..."
          valueFormat="DD/MM/YYYY"
          minDate={new Date()}
          {...form.getInputProps("startDate")}
        />

        {/* quantidade de quinzenas */}
        <NumberInput
          min={1}
          label="Quantidade de quinzenas a alugar"
          placeholder="Quero alugar por..."
          {...form.getInputProps("fortnights")}
        />

        {/* grade de horários */}
        <Fieldset legend="Grade de horários">
          <Chip.Group multiple {...form.getInputProps("grid")}>
            <Grid>
              {gridSize.map((_, index) => (
                <Grid.Col key={`grid-col-${index}`} span={4}>
                  <Center>
                    <Chip value={`${index + 1}`}>{index + 1}</Chip>
                  </Center>
                </Grid.Col>
              ))}
            </Grid>
          </Chip.Group>
        </Fieldset>

        {/* ações */}
        <Stack gap="sm">
          <Button type="submit" fullWidth>
            Enviar vídeo e reservar
          </Button>

          {/* Botões auxiliares/opcionais; remova se não usar */}
          {scrollToInventory && (
            <Button
              variant="light"
              fullWidth
              onClick={() => {
                closeFn();
                scrollToInventory?.();
              }}
            >
              Voltar para Painéis de LED
            </Button>
          )}

          {scrollToBillboards && (
            <Button
              variant="light"
              fullWidth
              onClick={() => {
                closeFn();
                scrollToBillboards?.();
              }}
            >
              Ir para Outdoors
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}
