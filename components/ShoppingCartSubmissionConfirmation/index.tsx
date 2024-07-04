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
import BillboardTable from "../BillboardTable";
import { CartContext } from "@/contexts/CartContext";
import PanelTable from "../PanelTable";

export default function ShoppingCartSubmissionConfirmation() {
  const [needsMoreOutdoors, setNeedsMoreOutdoors] = useState(false);
  const cartContext = useContext(CartContext);

  const shoppingCartTable = cartContext.cart.map((entry) => {
    return (
      <Table.Tr key={entry.item.id}>
        <Table.Td>{entry.item.Localizacao}</Table.Td>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Table.Td ta={"center"}>{entry.fortnights.length}</Table.Td>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            {entry.fortnights.map((fortnight) => (
              <Text>
                BI-{fortnight.numero} (
                {Number(
                  new Date(fortnight.dtInicio).getUTCDate()
                ).toLocaleString("pt-BR", {
                  minimumIntegerDigits: 2,
                })}
                /
                {Number(
                  new Date(fortnight.dtInicio).getUTCMonth() + 1
                ).toLocaleString("pt-BR", {
                  minimumIntegerDigits: 2,
                })}
                /{new Date(fortnight.dtInicio).getUTCFullYear()} -
                {" " +
                  Number(
                    new Date(fortnight.dtFinal).getUTCDate()
                  ).toLocaleString("pt-BR", {
                    minimumIntegerDigits: 2,
                  })}
                /
                {Number(
                  new Date(fortnight.dtFinal).getUTCMonth() + 1
                ).toLocaleString("pt-BR", {
                  minimumIntegerDigits: 2,
                })}
                /{new Date(fortnight.dtFinal).getUTCFullYear()})
              </Text>
            ))}
          </HoverCard.Dropdown>
        </HoverCard>
        <Table.Td ta={"center"}>
          {
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
          }
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
                    sum + cartItem.value * cartItem.fortnights.length,
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
