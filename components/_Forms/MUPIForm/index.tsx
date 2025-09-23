// components/_Forms/MUPIForm/index.tsx
import { CartContext } from "@/contexts/CartContext";
import { Inventory } from "@/types/websiteTypes";
import { Title, Text, Button, NumberInput, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React, { useContext, useState } from "react";

type Props = {
  mupi: Inventory;
  closeFn: () => void;
};

export default function MUPIForm({ mupi, closeFn }: Props) {
  // Mantemos Date | null
  const [periodStart, setPeriodStart] = useState<Date | null>(new Date());
  const [monthQuantity, setMonthQuantity] = useState<number>(1);
  const cart = useContext(CartContext);

  // ✅ Compatível com libs que mandam Date | string | null
  const handleDateChange = (val: Date | string | null) => {
    if (val === null) {
      setPeriodStart(null);
      return;
    }
    if (val instanceof Date) {
      setPeriodStart(val);
      return;
    }
    // veio string -> tenta parsear
    const parsed = new Date(val);
    setPeriodStart(Number.isNaN(parsed.getTime()) ? null : parsed);
  };

  return (
    <>
      <Title ta="center">{mupi.address}</Title>
      <Text ta="center">
        Os valores dos mupis são negociáveis, coloque no carrinho para que
        possamos entrar em contato e reservar seu mupi!.
      </Text>

      <Group grow my="md">
        <DatePickerInput
          label="Data"
          placeholder="Selecione uma data"
          valueFormat="DD/MM/YYYY"
          minDate={new Date()}
          value={periodStart}
          onChange={handleDateChange}  // ⬅️ aqui
        />

        <NumberInput
          label="Quantidade de meses"
          placeholder="Por quantos meses?"
          value={monthQuantity}
          min={1}
          // Mantine pode enviar number | string | null
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
          if (!periodStart) return; // garante data válida

          const periodFinish = new Date(
            periodStart.getFullYear(),
            periodStart.getMonth() + monthQuantity,
            periodStart.getDate()
          );

          cart.setCart([
            ...cart.cart,
            {
              item: mupi,
              value: 0, // TODO: valor real quando disponível
              totalValue: 0 * monthQuantity, // TODO
              periodStart,
              periodFinish,
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
