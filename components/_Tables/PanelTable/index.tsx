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
  Flex,
  Code,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useContext, useEffect, useState } from "react";
import Map from "../../Map";
import { modals } from "@mantine/modals";
import PanelRentForm from "../../_Forms/PanelRentForm";
import { InfoOOHPanelInfoType, Panel } from "@/types/websiteTypes";
import { CartContext } from "@/contexts/CartContext";
import styles from "./styles.module.css";
import InfoOOHDisplay from "../../InfoOOHDisplay";
import ThumbnailWithZoomModal from "@/components/ThumbnailWithZoomModal";

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
  const [city, setCity] = useState<string | null>(null);
  const cart = useContext(CartContext);
  const [infoOOHStats, setInfoOOHStats] = useState<InfoOOHPanelInfoType>();

  async function fetchPanels() {
    try {
      const response = await fetch(
        `/api/panels?activePage=${activePage}&pageSize=20&address=${debouncedAddress}&city=${city ?? ""}`
      );
      const json = await response.json();
      setTotalPages(json?.totalPages || 0);
      setPanels(json?.data || []);
    } catch (err) {
      console.error("Erro ao buscar painéis:", err);
      setPanels([]);
      setTotalPages(0);
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

    const json = await response.json();

    console.log("API response de cities:", json); // <-- AQUI!

    if (!json || !Array.isArray(json.data)) {
      console.error("Resposta inesperada da API (esperado array):", json);
      setCities([]);
      return;
    }

    setCities(json.data);

    if (json.data.length > 0 && json.data[0].value) {
      setCity(json.data[0].value);
    } else {
      setCity("");
    }
  } catch (error) {
    console.error("Erro inesperado ao buscar cidades (LED):", error);
    setCities([]);
  }
}





  async function fetchInfoOOHStats(panelId: number) {
    try {
      const response = await fetch(`/api/infooh/panels?id=${panelId}`);
      const json = await response.json();
      setInfoOOHStats(json?.data?.[0]);
    } catch (err) {
      console.error("Erro ao buscar infoOH stats:", err);
    }
  }

  async function fetchThumbnail(panelId: number) {
    try {
      const response = await fetch(`/api/panels?id=${panelId}`);
      const json = await response.json();
      setThumbnailUrl(json?.data?.[0]?.thumbnailUrl || "");
    } catch (err) {
      console.error("Erro ao buscar thumbnail:", err);
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
      key={panel.id}
      className={cart.cart.find((e) => e.item.id === panel.id) ? styles.inCart : ""}
      onMouseEnter={() => {
        const [latitude, longitude] = (panel.coordinates || "0,0").split(",").map(Number);
        setLat(latitude);
        setLong(longitude);
        fetchInfoOOHStats(panel.id);
        fetchThumbnail(panel.id);
      }}
      onClick={() => {
        modals.open({
          children: (
            <PanelRentForm
              panel={panel}
              //@ts-ignore
              thumbnailUrl={panel.thumbnailUrl}
              closeFn={() => modals.closeAll()}
            />
          ),
          centered: true,
          size: "lg",
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <Table.Td ta="left">
        <Text lineClamp={1} tt="capitalize">
          {panel.address?.toLowerCase()}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder w="80vw" p="lg" m="auto" my="lg">
      <Grid>
        <Grid.Col span={5} visibleFrom="lg">
          <Stack h="100%" gap={0}>
            <ThumbnailWithZoomModal
              src={thumbnailUrl}
              fallbackDarkSrc="https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Foto"
              fallbackLightSrc="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
              h="300px"
            />
            <Box h="250px">
              <Map lat={lat} long={long} />
            </Box>
            <Paper withBorder h="300px">
              <InfoOOHDisplay data={infoOOHStats} />
            </Paper>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ lg: 7, xs: 12 }}>
          <Stack h="100%" justify="space-between" gap={5}>
            <Table highlightOnHover striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Box>
                      <Flex gap={5} p={0} direction={{ base: "column", md: "row" }}>
                        <TextInput
                          flex={3}
                          placeholder="Endereço..."
                          onBlur={fetchPanels}
                          onChange={(e) => setAddress(e.currentTarget.value)}
                        />
                        <Select
                          flex={1}
                          placeholder="Cidade..."
                          data={cities}
                          searchable
                          onChange={(value) => setCity(value)}
                          allowDeselect
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
                {tableRows.length > 0 ? (
                  tableRows
                ) : (
                  <Table.Tr>
                    <Table.Td>
                      <Text fs="italic" ta="center" c="dimmed">
                        Nenhum resultado encontrado
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
            <Center w="100%">
              <Pagination pb="xs" total={totalPages} value={activePage} onChange={setPage} />
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
