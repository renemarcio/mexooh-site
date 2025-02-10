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
import InventoryDisplay from "../InventoryDisplay";
import { inventoryTypes } from "@/types/websiteTypes";

export default function ShoppingCartSubmissionConfirmation() {
  const [needsMoreOutdoors, setNeedsMoreOutdoors] = useState(false);
  const [typeOfInventory, setTypeOfInventory] =
    useState<inventoryTypes>("panels");
  const cartContext = useContext(CartContext);

  const shoppingCartTable = cartContext.cart.map((entry) => {
    return (
      <Table.Tr key={entry.item.id}>
        <Table.Td>{entry.item.address}</Table.Td>
        {entry.fortnights ? (
          <HoverCard shadow="md">
            <HoverCard.Target>
              <Table.Td ta={"center"}>
                {entry.fortnights.length}{" "}
                {entry.fortnights.length > 1 ? "Bi-Semanas" : "Bi-Semana"}
              </Table.Td>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              {entry.fortnights.map((fortnight) => (
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
              ))}
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          entry.periodStart &&
          entry.periodFinish && (
            <Table.Td ta="center">
              {new Date(entry.periodFinish).getMonth() -
                new Date(entry.periodStart).getMonth() +
                12 *
                  (new Date(entry.periodFinish).getFullYear() -
                    new Date(entry.periodStart).getFullYear())}{" "}
              {new Date(entry.periodFinish).getMonth() -
                new Date(entry.periodStart).getMonth() +
                12 *
                  (new Date(entry.periodFinish).getFullYear() -
                    new Date(entry.periodStart).getFullYear()) >
              1
                ? "meses"
                : "mês"}
            </Table.Td>
          )
        )}
        <Table.Td ta={"center"}>
          {entry.value ? (
            <>
              {entry.fortnights && (
                <>
                  <NumberFormatter
                    // value={entry.value * entry.fortnights.length}
                    value={entry.totalValue}
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
              )}
              {entry.periodStart && entry.periodFinish && (
                <>
                  <NumberFormatter
                    value={entry.totalValue}
                    prefix="R$ "
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
                    por mês)
                  </Text>
                  <Text c={"dimmed"} fs={"italic"} ta={"center"} size="xs">
                    {`${new Date(entry.periodStart).toLocaleDateString(
                      "pt-BR"
                    )} - ${new Date(entry.periodFinish).toLocaleDateString(
                      "pt-BR"
                    )}`}
                  </Text>
                </>
              )}
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
              {cartContext.cart.reduce(
                (sum, cartItem) => sum + cartItem.totalValue,
                0
              ) > 0 ? (
                <Text>
                  Total:
                  <NumberFormatter
                    value={cartContext.cart.reduce(
                      (sum, cartItem) => sum + cartItem.totalValue,
                      // sum + cartItem.value * (cartItem.fortnights ? cartItem.fortnights.length : 0),
                      0
                    )}
                    prefix=" R$ "
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </Text>
              ) : (
                <Text>À negociar</Text>
              )}
            </Table.Caption>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Localização</Table.Th>
                <Table.Th ta={"center"}>Período</Table.Th>
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
          <InventoryDisplay
            setTypeOfInventory={setTypeOfInventory}
            typeOfInventory={typeOfInventory}
          />
          {/* <Title ta={"center"}>Outdoors</Title>
          <BillboardTable />
          <Divider my={"lg"} />
          <Title ta={"center"}>Painéis</Title>
          <PanelTable /> */}
        </>
      )}
    </>
  );
}
