import { CartContext } from "@/contexts/CartContext";
import { Inventory } from "@/types/websiteTypes";
import { Title, Text, Button, NumberInput, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
// import { bisemanas, inventarios } from "@prisma/client";
import React, { useContext, useState } from "react";

type Props = {
  mupi: Inventory;
  closeFn: () => void;
};

export default function MUPIForm({ mupi, closeFn }: Props) {
  const [periodStart, setPeriodStart] = useState<Date>(new Date());
  const [monthQuantity, setMonthQuantity] = useState<number>(1);
  const cart = useContext(CartContext);
  return (
    <>
      <Title ta={"center"}>{mupi.address}</Title>
      <Text ta={"center"}>
        Os valores dos mupis são negociáveis, coloque no carrinho para que
        possamos entrar em contato e reservar seu mupi!.
      </Text>
      <Group grow my={"md"}>
        <DatePickerInput
          label="Data"
          placeholder="Selecione uma data"
          valueFormat="DD/MM/YYYY"
          minDate={new Date()}
          value={periodStart}
          onChange={(value) => setPeriodStart(value!)}
        />
        <NumberInput
          label="Quantidade de meses"
          placeholder="Por quantos meses?"
          value={monthQuantity}
          min={1}
          onChange={(value) => setMonthQuantity(Number(value!))}
        />
      </Group>
      <Button
        fullWidth
        onClick={() => {
          cart.setCart([
            ...cart.cart,
            {
              item: mupi,
              value: 0, //TODO: Change to actual value when we have mupi value
              totalValue: 0 * monthQuantity, //TODO: Change to actual value when we have mupi value
              periodStart: periodStart,
              periodFinish: new Date(
                periodStart.getFullYear(),
                periodStart.getMonth() + monthQuantity,
                periodStart.getDate()
              ),
            },
          ]);
          closeFn();
        }}
      >
        Quero reservar!
      </Button>
    </>
  );
}
