import { useCartContext } from "@/contexts/CartContext";
import { CartEntry as CartEntryType } from "@/types/cartEntry";
import {
  Paper,
  ActionIcon,
  Group,
  NumberInput,
  Center,
  NumberFormatter,
  Text,
  Code,
} from "@mantine/core";
import { inventarios } from "@prisma/client";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

type ShoppingCartDrawerProps = {
  entry: CartEntryType;
};

export default function CartEntry({ entry }: ShoppingCartDrawerProps) {
  const cartContext = useCartContext();
  return (
    <Paper
      withBorder
      p={"sm"}
      my={"sm"}
      key={entry.item.id}
      pos={"relative"}
      w={"100%"}
      m={"auto"}
    >
      <ActionIcon
        pos={"absolute"}
        top={0}
        right={0}
        onClick={() =>
          cartContext.setCart(
            cartContext.cart.filter((b) => b.item.id !== entry.item.id)
          )
        }
        color="red"
        size="sm"
      >
        <IconTrash />
      </ActionIcon>
      <Text size="sm">{entry.item.Localizacao}</Text>
      <Group grow gap={0}>
        <Text size="sm">R$ {entry.value},00 / Bi-Semana</Text>
        <Text ta={"right"}>
          {entry.fortnightIDs.length > 1
            ? `${entry.fortnightIDs.length} Bi-Semanas`
            : `${entry.fortnightIDs.length} Bi-Semana`}
        </Text>
      </Group>
      <Center>
        <Text size="lg" fw={700} c={"midiagreen.8"}>
          <NumberFormatter
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            value={entry.value * entry.fortnightIDs.length}
          />
        </Text>
      </Center>
    </Paper>
  );
}
