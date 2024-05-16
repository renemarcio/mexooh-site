import { Table } from "@mantine/core";
import React from "react";

export default function BillboardTable() {
  return (
    <Table striped highlightOnHover withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Pesquisa e filtro</Table.Th>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Endereço</Table.Th>
          <Table.Th>Tipo</Table.Th>
          <Table.Th>Valor</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td ta={"left"}>Rua Marino Alves Palomo</Table.Td>
          <Table.Td>Outdoor</Table.Td>
          <Table.Td>R$ 1.325,00</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td ta={"left"}>Rua Marino Alves Palomo</Table.Td>
          <Table.Td>Outdoor</Table.Td>
          <Table.Td>R$ 1.325,00</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td ta={"left"}>Rua Marino Alves Palomo</Table.Td>
          <Table.Td>Outdoor</Table.Td>
          <Table.Td>R$ 1.325,00</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td ta={"left"}>Rua Marino Alves Palomo</Table.Td>
          <Table.Td>Outdoor</Table.Td>
          <Table.Td>R$ 1.325,00</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td ta={"left"}>Rua Marino Alves Palomo</Table.Td>
          <Table.Td>Outdoor</Table.Td>
          <Table.Td>R$ 1.325,00</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td ta={"left"}>Rua Marino Alves Palomo</Table.Td>
          <Table.Td>Outdoor</Table.Td>
          <Table.Td>R$ 1.325,00</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
