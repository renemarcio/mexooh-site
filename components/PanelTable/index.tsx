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
  ComboboxItem,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
// import { inventarios } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import Map from "../Map";
import { modals } from "@mantine/modals";
import PanelRentForm from "../PanelRentForm";
import { Panel } from "@/types/websiteTypes";
import { CartContext } from "@/contexts/CartContext";
import styles from "./styles.module.css";
export default function PanelTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [cities, setCities] = useState<ComboboxData>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [city, setCity] = useState<string | null>("");
  const cart = useContext(CartContext);

  // const { city, setCity } = useCityContext();

  async function fetchPanels() {
    try {
      const response = await fetch(
        `/api/panels?activePage=${activePage}&pageSize=20&address=${address}&city=${
          city === null ? "" : city
        }`
      );
      const data = await response.json();
      console.log("Call from fetchPanels: ");
      console.log(
        `/api/panels?activePage=${activePage}&pageSize=20&address=${address}&city=${
          city === null ? "" : city
        }`
      );
      console.log("Data from fetchPanels: ", data);
      setTotalPages(data.totalPages);
      setPanels(data.data);
    } catch {
      setPanels([]);
      setTotalPages(0);
      console.log("Couldn't fetch panels.");
    }
  }

  async function fetchCities() {
    try {
      const response = await fetch("/api/cities?asCombobox=true&type=P");
      const data: ComboboxItem[] = (await response.json()).data;
      setCities(data);
      setCity(
        data.find((element) => element.label === "ALPHAVILLE")?.value ?? null
      );
    } catch {
      setCities([]);
      console.log("Couldn't fetch cities.");
    }
  }

  useEffect(() => {
    fetchPanels();
  }, [debouncedAddress, activePage]);

  useEffect(() => {
    fetchPanels();
    setPage(1);
  }, [city]);

  useEffect(() => {
    fetchCities();
  }, []);

  const tableRows = panels.map((panel) => (
    <Table.Tr
      className={
        cart.cart.find((e) => e.item.id === panel.id) ? styles.inCart : ""
      }
      key={panel.id}
      onMouseEnter={() => {
        setLat(Number(panel.coordinates?.split(",")[0]));
        setLong(Number(panel.coordinates?.split(",")[1]));
      }}
      onClick={() => {
        modals.open({
          children: (
            <PanelRentForm panel={panel} closeFn={() => modals.closeAll()} />
          ),
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <Table.Td ta={"left"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {panel.address?.toLowerCase()}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

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
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <Box>
                        <Group gap={5} p={0}>
                          <TextInput
                            flex={3}
                            placeholder="Endereço..."
                            onBlur={() => {
                              fetchPanels();
                            }}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                          />
                          <Select
                            flex={1}
                            placeholder="Cidade..."
                            data={cities}
                            searchable
                            onChange={(value) => {
                              setCity(value);
                            }}
                            allowDeselect={true}
                            value={city}
                          />
                        </Group>
                      </Box>
                    </Table.Th>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Endereço</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {tableRows.length > 0 ? (
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
