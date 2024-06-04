"use client";
import { useCartContext } from "@/contexts/CartContext";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Drawer,
  Group,
  NumberFormatter,
  NumberInput,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

type ShoppingCartDrawerProps = {
  opened: boolean;
  close: () => void;
  //   open: () => void;
};

export default function ShoppingCartDrawer({
  opened,
  close,
}: ShoppingCartDrawerProps) {
  const cartContext = useCartContext();

  const billboardList = cartContext.cart.map((billboard) => (
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
        <Text size="sm">R$ 1000,00 / bisemana</Text>
        <NumberInput defaultValue={1} size="xs" min={1} />
      </Group>
      <Center>
        <Text size="lg" fw={700} c={"midiagreen.8"}>
          <NumberFormatter
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            value={100}
          />
        </Text>
      </Center>
    </Paper>
  ));

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Carrinho"
      position="right"
      // size={"sm"}
    >
      <Stack justify="space-between" h={"calc(100vh - 70px)"}>
        <Box style={{ flexGrow: 1 }}>
          {cartContext.cart.length > 0 ? (
            billboardList
          ) : (
            <>
              <Center>
                <Text
                  c={"dimmed"}
                  fs={"italic"}
                  ta={"center"}
                  top={"50%"}
                  pos={"absolute"}
                >
                  Seu carrinho está vazio :( <br /> Que tal adicionar alguns
                  outdoors?
                </Text>
              </Center>
            </>
          )}
        </Box>
        <Button
          component={Link}
          href="/checkout"
          onClick={close}
          variant="gradient"
          fullWidth
          gradient={{ from: "midiagreen", to: "midiagreen.8" }}
        >
          Ir para Checkout
        </Button>
      </Stack>
    </Drawer>
  );
}
