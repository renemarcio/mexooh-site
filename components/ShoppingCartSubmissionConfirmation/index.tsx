import {
  Title,
  Button,
  Text,
  Center,
  Divider,
  Table,
  Tooltip,
  NumberFormatter,
  HoverCard,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import BillboardTable from "../_Tables/BillboardTable";
import { CartContext } from "@/contexts/CartContext";
import PanelTable from "../_Tables/PanelTable";

export default function ShoppingCartSubmissionConfirmation() {
  const [needsMoreOutdoors, setNeedsMoreOutdoors] = useState(false);
  const cartContext = useContext(CartContext);

  const shoppingCartTable = cartContext.cart.map((entry) => {
    return (
      <Table.Tr key={entry.item.id}>
        <Table.Td>{entry.item.address}</Table.Td>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Table.Td ta={"center"}>
              {entry.fortnights ? entry.fortnights.length : 0}
            </Table.Td>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            {entry.fortnights ? (
              entry.fortnights.map((fortnight) => (
                <Text>
                  BI-{fortnight.number} (
                  {Number(
                    new Date(fortnight.start).getUTCDate()
                  ).toLocaleString("pt-BR", {
                    minimumIntegerDigits: 2,
                  })}
                  /
                  {Number(
                    new Date(fortnight.start).getUTCMonth() + 1
                  ).toLocaleString("pt-BR", {
                    minimumIntegerDigits: 2,
                  })}
                  /{new Date(fortnight.start).getUTCFullYear()} -
                  {" " +
                    Number(
                      new Date(fortnight.finish).getUTCDate()
                    ).toLocaleString("pt-BR", {
                      minimumIntegerDigits: 2,
                    })}
                  /
                  {Number(
                    new Date(fortnight.finish).getUTCMonth() + 1
                  ).toLocaleString("pt-BR", {
                    minimumIntegerDigits: 2,
                  })}
                  /{new Date(fortnight.finish).getUTCFullYear()})
                </Text>
              ))
            ) : (
              <Text>À negociar.</Text>
            )}
          </HoverCard.Dropdown>
        </HoverCard>
        <Table.Td ta={"center"}>
          {entry.fortnights ? (
            <>
              <NumberFormatter
                value={entry.value * entry.fortnights.length}
                prefix=" R$ "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
              />
              <Text c={"dimmed"} fs={"italic"} ta={"center"} size="xs">
                (
                <NumberFormatter
                  value={entry.value}
                  prefix="R$ "
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                />{" "}
                por Bi-Semana)
              </Text>
            </>
          ) : (
            <>
              <Text c={"dimmed"} fs={"italic"} ta={"center"} size="xs">
                À negociar.
              </Text>
            </>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      {!needsMoreOutdoors && (
        <>
          <Title ta={"center"}>Este é o seu carrinho</Title>
          <Text ta={"center"}>
            Coloque o mouse em cima do número de Bi-Semanas para ver quais foram
            alugadas.
          </Text>
          <Divider my={"md"} />
          <Table withTableBorder withRowBorders withColumnBorders striped>
            <Table.Caption c={"midiagreen"}>
              Total:
              <NumberFormatter
                value={cartContext.cart.reduce(
                  (sum, cartItem) =>
                    sum +
                    cartItem.value *
                      (cartItem.fortnights ? cartItem.fortnights.length : 0),
                  0
                )}
                prefix=" R$ "
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
              />
            </Table.Caption>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Localização</Table.Th>
                <Table.Th ta={"center"}>Bi-Semanas</Table.Th>
                <Table.Th ta={"center"}>Valor</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{shoppingCartTable}</Table.Tbody>
          </Table>
          <Center>
            <Button mt={"lg"} onClick={() => setNeedsMoreOutdoors(true)}>
              Quero reservar mais pontos!
            </Button>
          </Center>
        </>
      )}
      {needsMoreOutdoors && (
        <>
          <Title ta={"center"}>Outdoors</Title>
          <BillboardTable />
          <Divider my={"lg"} />
          <Title ta={"center"}>Painéis</Title>
          <PanelTable />
        </>
      )}
    </>
  );
}
