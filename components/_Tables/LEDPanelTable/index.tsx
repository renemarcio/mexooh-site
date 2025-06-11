import { useCityContext } from "@/contexts/CityContext";
import {
  Box,
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
import { modals } from "@mantine/modals";
import { LEDPanel } from "@/types/websiteTypes";
import LEDPanelForm from "../../_Forms/LEDPanelForm";

export default function LEDPanelTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [LEDpanels, setLEDPanels] = useState<LEDPanel[]>([]);
  const [cities, setCities] = useState<ComboboxData>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [videoURL, setVideoURL] = useState("");
  const [city, setCity] = useState<string | null>(""); // ✅ Aceita string ou null


  async function fetchLEDPanels() {
    try {
      // const response = await fetch(
      //   `/api/LEDpanels?activePage=${activePage}&pageSize=17&endereco=${address}&cidade=${city}`
      // );
      // const data = await response.json();
      // setTotalPages(data.totalPages);
      // setLEDPanels(data.data);
      // This works, but the database is still not supporting this. In the meantime, faux data will be used.

      setLEDPanels([
        {
          id: 1,
          address:
            "LED Av. Antonio Carlos Comitre nº 275 - Campolim - Sentido Sam's Club - Em Frente Telha Norte",
          coordinates: "0, 0",
        },
        {
          id: 2,
          address: "LED Av. Juscelino Kubitschek - Esquina Centro Médico",
          coordinates: "0, 0",
        },
        {
          id: 3,
          address: "led av. dom aguirre nº 525 - centro",
          coordinates: "0, 0",
        },
      ]);
      setTotalPages(1);
    } catch {
      setLEDPanels([]);
      setTotalPages(0);
      console.log("Couldn't fetch panels.");
    }
  }

async function fetchCities() {
  try {
    const response = await fetch("/api/cities?asCombobox=true&type=O");


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

if (Array.isArray(data.data) && data.data.length > 0 && data.data[0]?.value) {
  setCities(data.data);
  setCity(data.data[0].value);
} else {
  setCities([]);
  setCity(""); // ou null
}

  } catch (error) {
    console.error("Erro inesperado ao buscar cidades (OUTDOOR):", error);
    setCities([]);
  }
}


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
        setLat(Number(LEDPanel.coordinates?.split(",")[0]));
        setLong(Number(LEDPanel.coordinates?.split(",")[1]));
        modals.open({
          title: <p>{LEDPanel.address}</p>,
          centered: true,
          // children: <p>WIP</p>,
          children: (
            <LEDPanelForm panel={LEDPanel} closeFn={() => modals.closeAll()} />
          ),
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <Table.Td ta={"left"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {LEDPanel.address?.toLowerCase()}
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
                        </Flex>
                      </Box>
                    </Table.Th>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>Endereço</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {LEDpanels && LEDpanels.length > 0 ? (
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
        {/* TESTE
        <LEDPanelForm panel={LEDpanels[0]} closeFn={() => {}} /> */}
      </Paper>
    </>
  );
}
