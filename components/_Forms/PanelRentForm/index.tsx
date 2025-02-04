import { CartContext } from "@/contexts/CartContext";
import {
  Title,
  Text,
  Button,
  MultiSelect,
  Skeleton,
  Code,
  Box,
  Paper,
  Group,
  NumberInput,
  Stack,
} from "@mantine/core";
import { Fortnight, InfoOOHPanelInfoType, Panel } from "@/types/websiteTypes";
import React, { useContext, useEffect, useState } from "react";
import InfoOOHDisplay from "../../InfoOOHDisplay";
import ThumbnailWithZoomModal from "@/components/ThumbnailWithZoomModal";
import { DatePickerInput } from "@mantine/dates";
import WeekPicker from "@/components/WeekPicker";

type Props = {
  panel: Panel;
  thumbnailUrl: string;
  closeFn: () => void;
};

export default function PanelRentForm({ panel, thumbnailUrl, closeFn }: Props) {
  const [infoOOHData, setInfoOOHData] = useState<InfoOOHPanelInfoType>();
  const [loading, setLoading] = useState(false);
  const [initialRentDate, setInitialRentDate] = useState(new Date());
  const [monthQuantity, setMonthQuantity] = useState<number>(1);

  const cart = useContext(CartContext);

  async function fetchInfoOOHData() {
    setLoading(true);
    const response = await fetch(`/api/infooh/panels?id=${panel.id}`);
    const data = await response.json();
    setInfoOOHData(data.data[0]);
    setLoading(false);
  }

  useEffect(() => {
    fetchInfoOOHData();
  }, []);

  return (
    <>
      <form>
        <Stack>
          <Title ta={"center"}>{panel.address}</Title>
          {/* <Text ta={"center"}>
        Os valores dos painéis são negociáveis, coloque no carrinho para que
        possamos entrar em contato e reservar seu painel.
      </Text> */}
          <ThumbnailWithZoomModal src={thumbnailUrl} />
          <Skeleton visible={loading}>
            <Paper withBorder p={"xs"}>
              <InfoOOHDisplay data={infoOOHData} />
            </Paper>
          </Skeleton>
          <Group justify="space-between" grow>
            <DatePickerInput
              label={"Data de aluguel"}
              placeholder={"Data..."}
              valueFormat="DD/MM/YYYY"
              minDate={new Date()}
              value={initialRentDate}
              onChange={(value) => setInitialRentDate(value!)}
            />
            <NumberInput
              min={1}
              defaultValue={1}
              label={"Quantidade de meses à alugar"}
              placeholder={"Quero alugar por..."}
              value={monthQuantity}
              onChange={(value) => setMonthQuantity(Number(value!))}
            />
          </Group>
          <Button
            fullWidth
            onClick={() => {
              cart.setCart([
                ...cart.cart,
                {
                  item: panel,
                  value: 0,
                  totalValue: 0,
                  periodStart: initialRentDate,
                  periodFinish: new Date(
                    new Date(initialRentDate).setMonth(
                      new Date(initialRentDate).getMonth() + monthQuantity
                    )
                  ),
                }, //TODO: Replace values when we have them
              ]);
              closeFn();
            }}
            disabled={
              cart.cart.find((e) => e.item.id === panel.id) ? true : false
            }
          >
            Quero reservar!
          </Button>
        </Stack>
      </form>
    </>
  );
}
