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
  HoverCard,
  Button,
} from "@mantine/core";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import React from "react";

type ShoppingCartDrawerProps = {
  entry: CartEntryType;
};

export default function CartEntry({ entry }: ShoppingCartDrawerProps) {
  const [needsProduction, setNeedsProduction] = React.useState(
    entry.needsProduction
  );
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
      <Text size="sm">{entry.item.address}</Text>
      <Group grow gap={0}>
        {entry.value > 0 && (
          <Text size="sm">
            R$ {entry.value},00 / {entry.periodStart ? "Mês" : "Bi-Semana"}
          </Text>
        )}
        <Text ta={"right"}>
          {entry.fortnights === undefined ? null : (
            <HoverCard>
              <HoverCard.Target>
                <Text>
                  {entry.fortnights.length > 1
                    ? `${entry.fortnights.length} Bi-Semanas`
                    : `${entry.fortnights.length} Bi-Semana`}
                </Text>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                {entry.fortnights.map((fortnight) => (
                  <Text>{`BI-${fortnight.number} ${String(fortnight.year).slice(
                    2
                  )} (${new Date(fortnight.start).toLocaleDateString(
                    "pt-BR"
                  )} - ${new Date(fortnight.finish).toLocaleDateString(
                    "pt-BR"
                  )})`}</Text>
                ))}
              </HoverCard.Dropdown>
            </HoverCard>
          )}

          {entry.periodStart != undefined && entry.periodFinish != undefined ? (
            <div>
              Inicio: {new Date(entry.periodStart).toLocaleDateString("pt-BR")}
              <br />
              Fim: {new Date(entry.periodFinish).toLocaleDateString("pt-BR")}
            </div>
          ) : null}
        </Text>
      </Group>
      <Button
        size="xs"
        fullWidth
        onClick={() => {
          setNeedsProduction(!needsProduction);
          entry.needsProduction = !needsProduction;
          cartContext.setCart([...cartContext.cart]);
        }}
        leftSection={needsProduction ? <IconCheck size={16} /> : null}
        variant={needsProduction ? "light" : "subtle"}
      >
        Produção
      </Button>
      <Center>
        <Text size="lg" fw={700} c={"midiagreen.8"}>
          {entry.totalValue > 0 ? (
            <NumberFormatter
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              value={entry.totalValue}
            />
          ) : (
            <>À negociar</>
          )}
          {needsProduction ? " (+ Produção)" : ""}
        </Text>
      </Center>
    </Paper>
  );
}
