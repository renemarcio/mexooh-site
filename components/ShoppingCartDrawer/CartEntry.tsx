import { useCartContext } from "@/contexts/CartContext";
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
  billboard: inventarios;
};

export default function CartEntry({ billboard }: ShoppingCartDrawerProps) {
  const cartContext = useCartContext();
  return (
    <Paper withBorder p={"sm"} my={"sm"} key={billboard.id} pos={"relative"}>
      <ActionIcon
        //disabled={if is paying already, disable removal, make them leave the payment page}
        pos={"absolute"}
        top={0}
        right={0}
        onClick={() =>
          cartContext.setCart(
            cartContext.cart.filter((b) => b.id !== billboard.id)
          )
        }
        // variant="transparent"
        color="red"
        size="sm"
      >
        <IconTrash />
      </ActionIcon>
      <Text size="sm">{billboard.Localizacao}</Text>
      <Group grow gap={0}>
        <Text size="sm">
          {/* R$ {billboard.Iluminado == "S" ? 1190 : 1090},00 / bisemana */}
          {/* @ts-ignore */}
          R$ {billboard.valor},00 / bisemana
        </Text>
        <Text ta={"right"}>
          {
            //@ts-ignore
            billboard.fortnights.length > 1
              ? //@ts-ignore
                `${billboard.fortnights.length} bisemanas`
              : //@ts-ignore
                `${billboard.fortnights.length} bisemana`
          }
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
            // @ts-ignore (Also, change 1 to quantity of fortnights)
            value={billboard.valor * billboard.fortnights.length}
          />
        </Text>
      </Center>
    </Paper>
  );
}
