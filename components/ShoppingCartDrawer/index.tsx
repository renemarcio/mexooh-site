"use client";
import { useCartContext } from "@/contexts/CartContext";
import {
  Box,
  Button,
  Center,
  Drawer,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import Link from "next/link";
import React from "react";
import CartEntry from "./CartEntry";

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
    <CartEntry key={billboard.id} billboard={billboard} />
    // <Paper withBorder p={"sm"} my={"sm"} key={billboard.id} pos={"relative"}>
    //   <ActionIcon
    //     //disabled={if is paying already, disable removal, make them leave the payment page}
    //     pos={"absolute"}
    //     top={0}
    //     right={0}
    //     onClick={() =>
    //       cartContext.setCart(
    //         cartContext.cart.filter((b) => b.id !== billboard.id)
    //       )
    //     }
    //     // variant="transparent"
    //     color="red"
    //     size="sm"
    //   >
    //     <IconTrash />
    //   </ActionIcon>
    //   <Text size="sm">{billboard.Localizacao}</Text>
    //   <Group grow gap={0}>
    //     <Text size="sm">
    //       {/* R$ {billboard.Iluminado == "S" ? 1190 : 1090},00 / bisemana */}
    //       {/* @ts-ignore */}
    //       R$ {billboard.valor},00 / bisemana
    //     </Text>
    //     <NumberInput defaultValue={1} size="xs" min={1} />
    //   </Group>
    //   <Center>
    //     <Text size="lg" fw={700} c={"midiagreen.8"}>
    //       <NumberFormatter
    //         prefix="R$ "
    //         thousandSeparator="."
    //         decimalSeparator=","
    //         decimalScale={2}
    //         fixedDecimalScale
    //         // @ts-ignore (Also, change 1 to quantity of fortnights)
    //         value={billboard.valor * 1}
    //       />
    //     </Text>
    //   </Center>
    // </Paper>
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
            <ScrollArea h={"80vh"} pr={"sm"}>
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
        <Button component={Link} href="/checkout" onClick={close} fullWidth>
          Ir para Checkout
        </Button>
        {cartContext.cart.length > 0 && (
          <Button
            color="red"
            // component={Link}
            // href="/checkout"
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
        )}
      </Stack>
    </Drawer>
  );
}
