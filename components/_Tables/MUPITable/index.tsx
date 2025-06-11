import { useCityContext } from "@/contexts/CityContext";
import {
  Box,
  Group,
  Paper,
  Select,
  Table,
  TextInput,
  Text,
  Center,
  Pagination,
  Grid,
  Stack,
  Image,
  ComboboxData,
  Title,
  Flex,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import Map from "../../Map";
import { modals } from "@mantine/modals";
import MUPIForm from "../../_Forms/MUPIForm";
import { MUPI } from "@/types/websiteTypes";
import { useCartContext } from "@/contexts/CartContext";
import classes from "./styles.module.css";

export default function MUPITable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [MUPIs, setMUPIs] = useState<MUPI[]>([]);
  const [cities, setCities] = useState<ComboboxData>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [city, setCity] = useState<string | null>("");
  const cartContext = useCartContext();

async function fetchMUPIs() {
  try {
    const response = await fetch(
      `/api/mupi?activePage=${activePage}&pageSize=20&address=${address}&city=${city === null ? "" : city}`
    );

    if (!response.ok) {
      console.error("Erro ao buscar MUPIs:", response.statusText);
      setMUPIs([]);
      setTotalPages(0);
      return;
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data)) {
      console.error("Dados inválidos da API de MUPIs:", data);
      setMUPIs([]);
      setTotalPages(0);
      return;
    }

    setTotalPages(data.totalPages ?? 1);
    setMUPIs(data.data);
  } catch (error) {
    console.error("Erro inesperado ao buscar MUPIs:", error);
    setMUPIs([]);
    setTotalPages(0);
  }
}

async function fetchCities() {
  try {
    const response = await fetch("/api/cities?asCombobox=true&type=L");

    if (!response.ok) {
      console.error("Erro ao buscar cidades (LED):", response.statusText);
      setCities([]);
      return;
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data)) {
      console.error("Dados inválidos da API (LED):", data);
      setCities([]);
      return;
    }

    setCities(data.data);

    if (data.data.length > 0) {
      setCity(data.data[0].value);
    } else {
      setCity(null);
    }
  } catch (error) {
    console.error("Erro inesperado ao buscar cidades (LED):", error);
    setCities([]);
  }
}



  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchMUPIs();
  }, [debouncedAddress, city, activePage]);

  useEffect(() => {
    setPage(1);
  }, [city]);

  const tableRows = MUPIs ? (
    MUPIs.map((MUPI) => (
      <Table.Tr
        key={MUPI.id}
        onMouseEnter={() => {
          setLat(Number(MUPI.coordinates?.split(",")[0]));
          setLong(Number(MUPI.coordinates?.split(",")[1]));
        }}
        onClick={() => {
          setLat(Number(MUPI.coordinates?.split(",")[0]));
          setLong(Number(MUPI.coordinates?.split(",")[1]));
          if (!cartContext.cart.find((e) => e.item.id === MUPI.id)) {
            modals.open({
              children: (
                <MUPIForm mupi={MUPI} closeFn={() => modals.closeAll()} />
              ),
              centered: true,
            });
          }
        }}
        style={{ cursor: "pointer" }}
        className={
          cartContext.cart.find((e) => e.item.id === MUPI.id)
            ? classes.inCart
            : ""
        }
      >
        <Table.Td ta={"left"}>
          <Text lineClamp={1} tt={"capitalize"}>
            {MUPI.address?.toLowerCase()}
          </Text>
        </Table.Td>
      </Table.Tr>
    ))
  ) : (
    <></>
  );

  return (
    <>
      <Paper withBorder w={"80vw"} p={"lg"} m={"auto"} my={"lg"}>
        <Grid>
          <Grid.Col span={5} visibleFrom="lg">
            <Stack h={"100%"} gap={0}>
              <Image
                src={thumbnailUrl}
                height={"600px"}
                fallbackSrc="https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Foto"
                lightHidden
              />
              <Image
                src={thumbnailUrl}
                height={"600px"}
                fallbackSrc="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
                darkHidden
              />
              <Box h={"250px"}>
                <Map lat={lat} long={long} />
              </Box>
              <Paper withBorder h={"300px"}>
                <Center h={"100%"}>
                  <Title c={"dimmed"}>InfoOOH</Title>
                </Center>
              </Paper>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ lg: 7, xs: 12 }}>
            <Stack h={"100%"} justify="space-between" gap={5}>
              <Table highlightOnHover striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <Box>
                        <Flex
                          gap={5}
                          p={0}
                          direction={{ base: "column", sm: "row" }}
                        >
                          <TextInput
                            flex={3}
                            placeholder="Endereço..."
                            onBlur={() => {
                              fetchMUPIs();
                            }}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                          />
                          <Select
                            flex={1}
                            placeholder="Cidade..."
                            data={cities}
                            onChange={(value) => {
                              setCity(value!);
                              fetchMUPIs();
                            }}
                            allowDeselect={true}
                            value={city}
                          />
                        </Flex>
                      </Box>
                    </Table.Th>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Endereço</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {MUPIs && MUPIs.length > 0 ? (
                    tableRows
                  ) : (
                    <Table.Tr>
                      <Table.Td>
                        <Text fs={"italic"} ta={"center"} c={"dimmed"}>
                          Nenhum resultado encontrado
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
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
