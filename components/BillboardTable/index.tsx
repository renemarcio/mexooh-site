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
  Image,
  Grid,
  Paper,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { inventarios } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Map from "../Map";

export default function BillboardTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [billboards, setBillboards] = useState<inventarios[]>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  async function handleBillboardFetch() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/billboards?p=${activePage}&endereco=${address}`
      );
      const data = await response.json();
      setTotalPages(data.totalPages);
      setBillboards(data.billboards);
    } catch {
      setBillboards([]);
      setTotalPages(0);
      console.log("Couldn't fetch billboards.");
    }
  }

  useEffect(() => {
    handleBillboardFetch();
  }, [activePage, debouncedAddress]);

  const tableRows = billboards.map((billboard) => (
    <Table.Tr
      key={billboard.id}
      onClick={() => {
        setLat(Number(billboard.LinkGoogleMaps?.split(",")[0]));
        setLong(Number(billboard.LinkGoogleMaps?.split(",")[1]));
      }}
      style={{ cursor: "pointer" }}
    >
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
    <>
      <Paper withBorder h={600} w={"80vw"}>
        <Grid p={"sm"}>
          <Grid.Col span={5} h={600}>
            <Stack h={"100%"} bg={"cyan"} gap={0}>
              <Image
                src={"https://source.unsplash.com/random"}
                height={"300px"}
              />
              <Map lat={lat} long={long} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={7} h={600}>
            <Stack h={600} justify="center" gap={5}>
              <Group gap={5}>
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
              <Center w={"100%"}>
                <Pagination
                  // withEdges
                  total={totalPages}
                  value={activePage}
                  onChange={setPage}
                />
              </Center>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
