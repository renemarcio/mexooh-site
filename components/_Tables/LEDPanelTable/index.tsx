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
  const [city, setCity] = useState<string | null>("");

  async function fetchLEDPanels() {
    try {
      // Dados simulados enquanto a API real não está disponível
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
    console.log("API response de cities", data);

    if (!Array.isArray(data)) {
      console.error("Resposta inesperada da API (esperado array):", data);
      setCities([]);
      return;
    }

    setCities(data);

    if (data.length > 0 && data[0].value) {
      setCity(data[0].value);
    } else {
      setCity("");
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
    <Paper withBorder w={"80vw"} p={"lg"} m={"auto"} my={"lg"}>
      <Grid>
        <Grid.Col span={5} visibleFrom="lg">
          <Stack h={"100%"} gap={0}>
            <Image
              src={"photos/led.jpeg"}
              fallbackSrc="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
            />
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
                          onBlur={fetchLEDPanels}
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
                {LEDpanels.length > 0 ? (
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
  );
}
