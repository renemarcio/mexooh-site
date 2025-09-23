import { CartContext } from "@/contexts/CartContext";
import {
  Title,
  Button,
  Skeleton,
  Paper,
  Group,
  NumberInput,
  Stack,
} from "@mantine/core";
import { InfoOOHPanelInfoType, Panel } from "@/types/websiteTypes";
import React, { useContext, useEffect, useState } from "react";
import InfoOOHDisplay from "../../InfoOOHDisplay";
import ThumbnailWithZoomModal from "@/components/ThumbnailWithZoomModal";
import { DatePickerInput } from "@mantine/dates";

type Props = {
  panel: Panel;
  thumbnailUrl: string;
  closeFn: () => void;
};

export default function PanelRentForm({ panel, thumbnailUrl, closeFn }: Props) {
  const [infoOOHData, setInfoOOHData] = useState<InfoOOHPanelInfoType>();
  const [loading, setLoading] = useState(false);

  // ✅ permitir Date | null e tratar string vinda do Mantine
  const [initialRentDate, setInitialRentDate] = useState<Date | null>(new Date());
  const [monthQuantity, setMonthQuantity] = useState<number>(1);

  const cart = useContext(CartContext);

  useEffect(() => {
    async function fetchInfoOOHData() {
      setLoading(true);
      const response = await fetch(`/api/infooh/panels?id=${panel.id}`);
      const data = await response.json();
      setInfoOOHData(data.data[0]);
      setLoading(false);
    }
    fetchInfoOOHData();
  }, [panel.id]);

  // ✅ Handler compatível com Date | string | null
  const handleInitialDateChange = (val: Date | string | null) => {
    if (val === null) {
      setInitialRentDate(null);
      return;
    }
    if (val instanceof Date) {
      setInitialRentDate(val);
      return;
    }
    const parsed = new Date(val);
    setInitialRentDate(Number.isNaN(parsed.getTime()) ? null : parsed);
  };

  return (
    <form>
      <Stack>
        <Title ta="center">{panel.address}</Title>

        <ThumbnailWithZoomModal src={thumbnailUrl} />

        <Skeleton visible={loading}>
          <Paper withBorder p="xs">
            <InfoOOHDisplay data={infoOOHData} />
          </Paper>
        </Skeleton>

        <Group justify="space-between" grow>
          <DatePickerInput
            label="Data de aluguel"
            placeholder="Data..."
            valueFormat="DD/MM/YYYY"
            minDate={new Date()}
            value={initialRentDate}
            onChange={handleInitialDateChange}
          />

          <NumberInput
            min={1}
            defaultValue={1}
            label="Quantidade de meses à alugar"
            placeholder="Quero alugar por..."
            value={monthQuantity}
            onChange={(val) => {
              const n =
                typeof val === "number"
                  ? val
                  : typeof val === "string"
                  ? Number(val)
                  : NaN;
              const normalized = Number.isNaN(n) ? 1 : Math.max(1, n);
              setMonthQuantity(normalized);
            }}
          />
        </Group>

        <Button
          fullWidth
          onClick={() => {
            if (!initialRentDate) return; // garante data válida

            const periodFinish = new Date(
              initialRentDate.getFullYear(),
              initialRentDate.getMonth() + monthQuantity,
              initialRentDate.getDate()
            );

            cart.setCart([
              ...cart.cart,
              {
                item: panel,
                value: 0,         // TODO: valor real quando disponível
                totalValue: 0,    // TODO
                periodStart: initialRentDate,
                periodFinish,
              },
            ]);
            closeFn();
          }}
          disabled={!!cart.cart.find((e) => e.item.id === panel.id)}
        >
          Quero reservar!
        </Button>
      </Stack>
    </form>
  );
}
