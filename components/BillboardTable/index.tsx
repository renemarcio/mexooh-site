import {
  Center,
  Group,
  Pagination,
  Select,
  Table,
  TextInput,
  Text,
  Stack,
  Box,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { inventarios } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function BillboardTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [billboards, setBillboards] = useState<inventarios[]>([]);

  async function handleBillboardFetch() {
    const response = await fetch(
      `http://localhost:3000/api/billboards?p=${activePage}&endereco=${address}`
    );
    const data = await response.json();
    setTotalPages(data.totalPages);
    setBillboards(data.billboards);
  }

  useEffect(() => {
    handleBillboardFetch();
  }, [activePage, debouncedAddress]);

  const tableRows = billboards.map((billboard) => (
    <Table.Tr key={billboard.id}>
      <Table.Td ta={"left"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {billboard.Localizacao?.toLowerCase()}
        </Text>
      </Table.Td>
      <Table.Td ta={"center"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {billboard.cidade?.toLowerCase()}
        </Text>
      </Table.Td>
      <Table.Td ta={"center"}>
        <Text lineClamp={1}>{billboard.uf}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack justify="space-between" gap={0} h={"100%"} w={"100%"}>
      <Box>
        <Group gap={0}>
          <TextInput
            flex={3}
            value={address}
            placeholder="Endereço..."
            onBlur={() => {
              handleBillboardFetch();
            }}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
          <Select flex={1} placeholder="Cidade..." />
        </Group>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Endereço</Table.Th>
              <Table.Th ta={"center"}>Cidade</Table.Th>
              <Table.Th ta={"center"}>Estado</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody h={"100%"}>{tableRows}</Table.Tbody>
        </Table>
      </Box>
      <Box>
        <Center w={"100%"}>
          <Pagination
            withEdges
            total={totalPages}
            value={activePage}
            onChange={setPage}
          />
        </Center>
      </Box>
    </Stack>
  );
}
