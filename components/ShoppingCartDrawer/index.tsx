"use client";
import { useCartContext } from "@/contexts/CartContext";
import {
  Box,
  Button,
  Center,
  Drawer,
  Highlight,
  NumberFormatter,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import Link from "next/link";
import React from "react";
import CartEntry from "./CartEntry";
import ServiceButton from "../ServiceButton";

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
  const total = cartContext.cart.reduce(
    (sum, cartItem) => sum + cartItem.value * cartItem.fortnights.length,
    0
  );

  const billboardList = cartContext.cart.map((entry) => (
    <CartEntry key={entry.item.id} entry={entry} />
  ));

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Carrinho"
      position="right"
      // size={"sm"}
    >
      <Stack justify="space-between" h={"600px"} gap={0} m={0}>
        {/* <Box style={{ flexGrow: 1 }}> */}
        <Box>
          {cartContext.cart.length > 0 ? (
            <ScrollArea h={"68vh"} pr={"sm"}>
              {billboardList}
            </ScrollArea>
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
        {cartContext.cart.length > 0 && (
          <Text size="lg" fw={700} c={"midiagreen.8"} ta={"center"}>
            Total:{" "}
            <NumberFormatter
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              value={total}
            />
          </Text>
        )}
        {cartContext.cart.length > 0 && (
          <Text ta={"center"}>
            O valor acima{" "}
            <Text
              size={"lg"}
              component="span"
              fw={800}
              variant="gradient"
              gradient={{
                from: "var(--mantine-primary-color-9)",
                to: "var(--mantine-primary-color-6)",
                deg: 45,
              }}
            >
              NÃO
            </Text>{" "}
            inclui impressão da lona ou papel. Para contratar este serviço,
            clique no botão "Produção", abaixo.
          </Text>
        )}
        {cartContext.cart.length > 0 && (
          <Button.Group orientation="vertical">
            <ServiceButton />
            <Button component={Link} href="/checkout" onClick={close} fullWidth>
              Ir para Checkout
            </Button>
            <Button
              color="red"
              onClick={() =>
                modals.openConfirmModal({
                  title: "Limpar o carrinho?",
                  centered: true,
                  groupProps: { justify: "center" },
                  children: (
                    <Text ta={"center"}>
                      Tem certeza que deseja limpar o carrinho?
                    </Text>
                  ),
                  labels: {
                    confirm: "Sim, limpar o carrinho",
                    cancel: "Não, quero voltar",
                  },
                  confirmProps: {
                    color: "red",
                  },
                  onCancel: () => {},
                  onConfirm: () => {
                    cartContext.setCart([]);
                    close();
                  },
                })
              }
              fullWidth
            >
              Limpar o Carrinho
            </Button>
          </Button.Group>
        )}
      </Stack>
    </Drawer>
  );
}
