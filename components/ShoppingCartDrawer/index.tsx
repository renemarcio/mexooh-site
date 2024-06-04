"use client";
import { useCartContext } from "@/contexts/CartContext";
import { Box, Button, Center, Drawer, Stack, Text } from "@mantine/core";
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

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Carrinho"
      position="right"
      size={"sm"}
    >
      <Stack justify="space-between" h={"calc(100vh - 70px)"}>
        <Box style={{ flexGrow: 1 }}>
          {cartContext.cart.length > 0 ? (
            <>Mostremos os itens.</>
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
