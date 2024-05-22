import {
  Center,
  Group,
  Pagination,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

export default function BillboardTable() {
  const [activePage, setPage] = useState(1);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);

  async function handleBillboardFetch() {
    const response = await fetch(
      `http://localhost:3000/api/billboards?p=${activePage}&endereco=${address}`
    );
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    handleBillboardFetch();
  }, [activePage, debouncedAddress]);

  return (
    <>
      <Group gap={0}>
        <TextInput
          flex={3}
          value={address}
          placeholder="Endereço..."
          onBlur={() => {
            setPage(1);
            handleBillboardFetch();
          }}
          onChange={(e) => setAddress(e.currentTarget.value)}
        />
        <Select flex={1} placeholder="Cidade..." />
      </Group>
      <Table striped highlightOnHover withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Endereço</Table.Th>
            <Table.Th ta={"center"}>Tipo</Table.Th>
            <Table.Th ta={"center"}>Valor</Table.Th>
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
      <Center w={"100%"} pt={"lg"}>
        <Pagination total={10} value={activePage} onChange={setPage} />
      </Center>
    </>
  );
}
