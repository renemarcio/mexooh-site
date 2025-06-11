import {
  Center,
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
  Button,
  NumberFormatter,
  ComboboxData,
  Title,
  Flex,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import Map from "../../Map";
import { useCartContext } from "@/contexts/CartContext";
import {
  IconShoppingCartMinus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import RentBillboardModal from "../../_Forms/RentBillboardModal";
import classes from "./styles.module.css";
import { Billboard } from "@/types/websiteTypes";
import ThumbnailWithZoomModal from "@/components/ThumbnailWithZoomModal";

export default function BillboardTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [activeBillboard, setActiveBillboard] = useState<any>();
  const [fortnights, setFortnights] = useState<any[]>([]);
  const [selectedFortnight, setSelectedFortnight] = useState<string>("");
  const [cities, setCities] = useState<ComboboxData>([]);
  const pageSize = 22;

  const [city, setCity] = useState<string | null>(""); // ✅ Aceita string ou null

  const cartContext = useCartContext();

  async function handleBillboardsFetch() {
    try {
      const response = await fetch(
        `/api/billboards?activePage=${activePage}&pageSize=${pageSize}&address=${address}&city=${
          city === null ? "" : city
        }&fortnights=${selectedFortnight}`
      );
      const data = await response.json();
      setTotalPages(data.totalPages);
      setBillboards(data.data);
    } catch {
      setBillboards([]);
      setTotalPages(0);
      console.log("Couldn't fetch billboards.");
    }
  }

  async function handleBillboardFetch(id: number) {
    try {
      const response = await fetch(`/api/billboards?id=${id}`);
      const data = await response.json();
      setThumbnailUrl(data.data[0].thumbnailUrl);
    } catch {
      console.log("Couldn't fetch billboard.");
    }
  }

  async function fetchFortnights() {
    const today = new Date();
    const url = `/api/fortnights?currentDate=${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}&years=${new Date().getFullYear()},${
      new Date().getFullYear() + 1
    }&asCombobox`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      const response = await res.json();
      setFortnights(response.data);
    } else {
      console.log("Server unreachable.");
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

    setCities(data.data);

    if (
      Array.isArray(data.data) &&
      data.data.length > 0 &&
      data.data[0]?.value
    ) {
      setCity(data.data[0].value);
    } else {
      setCity(""); // ou null, se seu estado aceitar null
    }
  } catch (error) {
    console.error("Erro inesperado ao buscar cidades (OUTDOOR):", error);
    setCities([]);
  }
}

  useEffect(() => {
    handleBillboardsFetch();
  }, [debouncedAddress, city, activePage, selectedFortnight]);

  useEffect(() => {
    setPage(1);
  }, [city, address, selectedFortnight]);

  useEffect(() => {
    fetchFortnights();
    fetchCities();
  }, []);

  const tableRows = billboards.map((billboard) => (
    <Table.Tr
      key={billboard.id}
      onMouseEnter={() => {
        setLat(Number(billboard.coordinates?.split(",")[0]));
        setLong(Number(billboard.coordinates?.split(",")[1]));
        handleBillboardFetch(billboard.id);
        // setThumbnailUrl(`/photos/Outdoors/${billboard.id}.jpg`);
      }}
      onClick={() => {
        setLat(Number(billboard.coordinates?.split(",")[0]));
        setLong(Number(billboard.coordinates?.split(",")[1]));
        handleBillboardFetch(billboard.id);
        setActiveBillboard(billboard);
      }}
      onDoubleClick={() => {
        if (activeBillboard) {
          modals.open({
            title: "Adicionar ao carrinho",
            centered: true,
            size: "xl",
            children: (
              <RentBillboardModal
                billboard={activeBillboard}
                closeFn={() => modals.closeAll()}
              />
            ),
          });
        }
      }}
      style={{ cursor: "pointer" }}
      className={
        activeBillboard?.id === billboard.id
          ? classes.selected
          : cartContext.cart.find((e) => e.item.id === billboard.id)
          ? classes.inCart
          : ""
      }
    >
      <Table.Td ta={"left"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {activeBillboard?.id === billboard.id && "• "}
          {billboard.address?.toLowerCase()}
        </Text>
      </Table.Td>

      <Table.Td ta={"center"} w={"200px"}>
        <Text lineClamp={1}>
          <NumberFormatter
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            //@ts-ignore
            value={billboard.value}
          />
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Paper withBorder w={"80vw"} p={"lg"} m={"auto"} mt={"lg"}>
        <Grid p={"sm"}>
          <Grid.Col span={5} visibleFrom="lg">
            <Stack h={"100%"} gap={0}>
              {/* <Image src={thumbnailUrl} height={"300px"} /> */}
              {/* <Image
                src={thumbnailUrl}
                h={"300px"}
                w={"auto"}
                fallbackSrc="https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Foto"
                lightHidden
              />
              <Image
                src={thumbnailUrl}
                h={"300px"}
                w={"auto"}
                fallbackSrc="https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
                darkHidden
              /> */}
              <ThumbnailWithZoomModal
                src={thumbnailUrl}
                fallbackDarkSrc={
                  "https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Foto"
                }
                fallbackLightSrc={
                  "https://placehold.co/600x400/f1f3f5/e9ecef?text=Sem%20Foto"
                }
                h="300px"
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
              <Box>
                <Flex gap={5} direction={{ base: "column", sm: "row" }}>
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
                    // classNames={{ pillsList: classes.pillsList }}
                    placeholder="Bi-Semana..."
                    data={fortnights || []}
                    onChange={(value) => {
                      setSelectedFortnight(value ?? "");
                    }}
                  />
                  <Select
                    flex={1}
                    placeholder="Cidade..."
                    value={city}
                    data={cities}
                    searchable
                    allowDeselect={true}
                    onChange={(value) => {
                      setCity(value!);
                      handleBillboardsFetch();
                    }}
                  />
                </Flex>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Endereço</Table.Th>
                      <Table.Th ta={"center"}>Valor</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody h={"100%"}>
                    {tableRows.length > 0 ? (
                      tableRows
                    ) : (
                      <Table.Tr>
                        <Table.Td colSpan={2}>
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
        <Center>
          {cartContext.cart.find((e) => e.item.id === activeBillboard?.id) !==
          undefined ? (
            <Button
              w={"80%"}
              color="red"
              onClick={() => {
                if (activeBillboard) {
                  cartContext.setCart(
                    cartContext.cart.filter(
                      (e) => e.item.id !== activeBillboard.id
                    )
                  );
                } else {
                  console.log("ERRO!!! Não tem outdoor selecionado.");
                }
              }}
              leftSection={<IconShoppingCartMinus />}
            >
              Remover do carrinho
            </Button>
          ) : (
            <Button
              w={"80%"}
              disabled={!activeBillboard}
              onClick={() => {
                if (activeBillboard) {
                  modals.open({
                    title: "Adicionar ao carrinho",
                    centered: true,
                    size: "xl",
                    children: (
                      <RentBillboardModal
                        billboard={activeBillboard}
                        closeFn={() => modals.closeAll()}
                      />
                    ),
                  });
                } else {
                  console.log("ERRO!!! Não tem outdoor selecionado.");
                }
              }}
              leftSection={<IconShoppingCartPlus />}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </Center>
      </Paper>
    </>
  );
}
