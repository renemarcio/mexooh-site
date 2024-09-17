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
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { inventarios } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import { modals } from "@mantine/modals";
import MUPForm from "../MUPForm";
// import PanelRentForm from "../PanelRentForm";

export default function LEDPanelTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [LEDpanels, setLEDPanels] = useState<inventarios[]>([]);
  const [cities, setCities] = useState<ComboboxData>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [videoURL, setVideoURL] = useState("");
  const { city, setCity } = useCityContext();

  async function fetchLEDPanels() {
    try {
      const response = await fetch(
        `/api/LEDPanels?p=${activePage}&endereco=${address}&cidade=${city}`
      );
      const data = await response.json();
      setTotalPages(data.totalPages);
      setLEDPanels(data.panels);
    } catch {
      setLEDPanels([]);
      setTotalPages(0);
      console.log("Couldn't fetch panels.");
    }
  }

  async function fetchCities() {
    try {
      const response = await fetch("/api/cities/select?type=4");
      const data = await response.json();
      setCities(data);
      setCity(data[0].value);
    } catch {
      setCities([]);
      console.log("Couldn't fetch cities.");
    }
  }
  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchLEDPanels();
  }, [debouncedAddress, city, activePage]);

  useEffect(() => {
    setPage(1);
  }, [city]);

  const tableRows = LEDpanels.map((LEDPanel) => (
    <Table.Tr
      key={LEDPanel.id}
      onClick={() => {
        setLat(Number(LEDPanel.LinkGoogleMaps?.split(",")[0]));
        setLong(Number(LEDPanel.LinkGoogleMaps?.split(",")[1]));
        modals.open({
          title: <p>{LEDPanel.Localizacao}</p>,
          children: <p>WIP</p>,
          //   children: <MUPForm mup={LEDPanel} closeFn={() => modals.closeAll()} />,
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <Table.Td ta={"left"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {LEDPanel.Localizacao?.toLowerCase()}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Paper withBorder w={"80vw"} p={"lg"} m={"auto"} my={"lg"}>
        <Grid>
          <Grid.Col span={5}>
            <Stack h={"100%"} gap={0}>
              {/* <Image
                src={thumbnailUrl}
                height={"300px"}
                fallbackSrc="https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Foto"
                lightHidden
                h={"50%"}
              />
              <Image
                src={thumbnailUrl}
                height={"300px"}
                fallbackSrc="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
                darkHidden
                h={"50%"}
              /> */}
              <Image
                src={"photos/led.jpeg"}
                // w={"auto"}
                // fit="contain"

                fallbackSrc="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
              />
              {/* <video loop muted height={"300px"}> //Reenable when we have videos for this.
                <source src={videoURL} type="video/mp4" />
                <Image
                  height={"300px"}
                  src="https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Video"
                  lightHidden
                  h={"50%"}
                />
                <Image
                  height={"300px"}
                  src="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Video"
                  darkHidden
                  h={"50%"}
                />
                Vídeo indisponível
              </video> */}
              {/* <Map lat={lat} long={long} />  // Reenable this when we have coordinates for panels.*/}
            </Stack>
          </Grid.Col>
          <Grid.Col span={7}>
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
                              fetchLEDPanels();
                            }}
                            onChange={(e) => setAddress(e.currentTarget.value)}
                          />
                          <Select
                            flex={1}
                            placeholder="Cidade..."
                            data={cities}
                            onChange={(value) => {
                              setCity(value!);
                              fetchLEDPanels();
                            }}
                            allowDeselect={false}
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
