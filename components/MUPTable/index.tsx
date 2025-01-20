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
// import { inventarios } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import { modals } from "@mantine/modals";
import MUPForm from "../MUPForm";
import { MUP } from "@/types/websiteTypes";
import { useCartContext } from "@/contexts/CartContext";
import classes from "./styles.module.css";
// import PanelRentForm from "../PanelRentForm";

export default function MUPTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [MUPs, setMUPs] = useState<MUP[]>([]);
  const [cities, setCities] = useState<ComboboxData>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [city, setCity] = useState<string | null>("");
  const cartContext = useCartContext();
  // const { city, setCity } = useCityContext();

  async function fetchMUPs() {
    try {
      const response = await fetch(
        `/api/mup?activePage=${activePage}&pageSize=20&address=${address}&city=${
          city === null ? "" : city
        }`
      );
      const data = await response.json();
      setTotalPages(data.totalPages);
      setMUPs(data.data);
    } catch {
      setMUPs([]);
      setTotalPages(0);
      console.log("Couldn't fetch MUPs.");
    }
  }

  async function fetchCities() {
    try {
      const response = await fetch("/api/cities?asCombobox=true&type=M");
      const data = await response.json();
      setCities(data.data);
      setCity(data.data[0]?.value);
    } catch (error) {
      setCities([]);
    }
  }
  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchMUPs();
  }, [debouncedAddress, city, activePage]);

  useEffect(() => {
    setPage(1);
  }, [city]);

  const tableRows = MUPs ? (
    MUPs.map((MUP) => (
      <Table.Tr
        key={MUP.id}
        onMouseEnter={() => {
          setLat(Number(MUP.coordinates?.split(",")[0]));
          setLong(Number(MUP.coordinates?.split(",")[1]));
        }}
        onClick={() => {
          setLat(Number(MUP.coordinates?.split(",")[0]));
          setLong(Number(MUP.coordinates?.split(",")[1]));
          if (!cartContext.cart.find((e) => e.item.id === MUP.id)) {
            modals.open({
              children: <MUPForm mup={MUP} closeFn={() => modals.closeAll()} />,
              centered: true,
            });
          }
        }}
        style={{ cursor: "pointer" }}
        className={
          cartContext.cart.find((e) => e.item.id === MUP.id)
            ? classes.inCart
            : ""
        }
      >
        <Table.Td ta={"left"}>
          <Text lineClamp={1} tt={"capitalize"}>
            {MUP.address?.toLowerCase()}
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
              <Table>
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
                              fetchMUPs();
                            }}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                          />
                          <Select
                            flex={1}
                            placeholder="Cidade..."
                            data={cities}
                            onChange={(value) => {
                              setCity(value!);
                              fetchMUPs();
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
                  {MUPs && MUPs.length > 0 ? (
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
