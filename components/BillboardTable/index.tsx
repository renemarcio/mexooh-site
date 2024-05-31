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
import { useCityContext } from "../../contexts/CityContext";
import { bucket } from "@/utils/bucket";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export default function BillboardTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [billboards, setBillboards] = useState<inventarios[]>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const { city, setCity } = useCityContext();

  // async function fetchThumbnail() {
  //   console.log("Fetch Thumb");
  //   console.log(bucket);
  //   const { Body } = await bucket.send(
  //     new GetObjectCommand({
  //       Bucket: "mexooh-webapp-system-files",
  //       Key: "Photos/Outdoor/500169.jpg",
  //     })
  //   );
  //   if (Body) {
  //     console.log(await Body.transformToString());
  //   } else {
  //     console.log("Body is null");
  //   }
  //   // return Body;
  // }

  async function handleBillboardsFetch() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/billboards?p=${activePage}&endereco=${address}&cidade=${city}`
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

  async function handleBillboardFetch(id: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/billboards/${id}`
      );
      const data = await response.json();
      setThumbnailUrl(data.signedUrl);
    } catch {
      console.log("Couldn't fetch billboard.");
    }
  }

  useEffect(() => {
    handleBillboardsFetch();
  }, [debouncedAddress, city]);

  useEffect(() => {
    setPage(1);
  }, [city]);

  // useEffect(() => {
  //   fetchThumbnail();
  // }, []);

  const tableRows = billboards.map((billboard) => (
    <Table.Tr
      key={billboard.id}
      onClick={() => {
        setLat(Number(billboard.LinkGoogleMaps?.split(",")[0]));
        setLong(Number(billboard.LinkGoogleMaps?.split(",")[1]));
        handleBillboardFetch(billboard.id);
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
            <Stack h={"100%"} gap={0}>
              {/* <Image src={"https://picsum.photos/800/600"} height={"300px"} /> */}
              <Image
                src={
                  // "https://mexooh-webapp-system-files.s3.amazonaws.com/Photos/Outdoor/500169.jpg"
                  thumbnailUrl
                }
                height={"300px"}
              />
              <Map lat={lat} long={long} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={7} h={600}>
            <Stack h={"100%"} justify="space-between" gap={5}>
              <Box>
                <Group gap={5}>
                  <TextInput
                    flex={3}
                    value={address}
                    placeholder="Endereço..."
                    onBlur={() => {
                      handleBillboardsFetch();
                    }}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                  />
                  <Select
                    flex={1}
                    placeholder="Cidade..."
                    value={city}
                    data={["Itapetininga", "Sorocaba", "Tatuí"]}
                    allowDeselect={false}
                    onChange={(value) => {
                      setCity(value!);
                      handleBillboardsFetch();
                    }}
                  />
                </Group>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Endereço</Table.Th>
                      <Table.Th ta={"center"}>Cidade</Table.Th>
                      <Table.Th ta={"center"}>Estado</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody h={"100%"}>
                    {tableRows.length > 0 ? (
                      tableRows
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={3}>
                          <Text fs={"italic"} ta={"center"} c={"dimmed"}>
                            Nenhum resultado encontrado
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </Table.Tbody>
                </Table>
              </Box>
              <Center w={"100%"}>
                <Pagination
                  pb={"xs"}
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
