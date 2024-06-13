import { Group, NumberFormatter, Paper, Text } from "@mantine/core";
import React from "react";

type Props = {
  item: any;
};

export default function MailCartEntry({ item }: Props) {
  return (
    <Paper withBorder p={"xl"}>
      <Group w={"100%"} justify="space-between">
        <Text>{item.Localizacao}</Text>
        <Text>
          <NumberFormatter
            prefix="R$ "
            fixedDecimalScale
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            value={item.valor}
          />
        </Text>
        <Text>{item.fortnights.length} Bi-Semana(s)</Text>
        <Text>
          Valor total:{" "}
          <NumberFormatter
            prefix="R$ "
            fixedDecimalScale
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            value={item.fortnights.length * item.valor}
          />
        </Text>
      </Group>
    </Paper>
  );
}
