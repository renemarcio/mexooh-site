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
  Button,
  NumberFormatter,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { inventarios } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import { useCityContext } from "../../contexts/CityContext";
import { useCartContext } from "@/contexts/CartContext";
import {
  IconShoppingCartMinus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";
import classes from "./styles.module.css";

export default function BillboardTable() {
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [address, setAddress] = useState("");
  const [debouncedAddress] = useDebouncedValue(address, 500);
  const [billboards, setBillboards] = useState<inventarios[]>([]);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [activeBillboard, setActiveBillboard] = useState<inventarios>();

  const { city, setCity } = useCityContext();
  const cartContext = useCartContext();

  async function handleBillboardsFetch() {
    try {
      const response = await fetch(
        `/api/billboards?p=${activePage}&endereco=${address}&cidade=${city}`
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
  }, [debouncedAddress, city, activePage]);

  useEffect(() => {
    setPage(1);
  }, [city]);

  const tableRows = billboards.map((billboard) => (
    <Table.Tr
      key={billboard.id}
      onClick={() => {
        setLat(Number(billboard.LinkGoogleMaps?.split(",")[0]));
        setLong(Number(billboard.LinkGoogleMaps?.split(",")[1]));
        handleBillboardFetch(billboard.id);
        setActiveBillboard(billboard);
      }}
      style={{ cursor: "pointer" }}
      // className={cartContext.cart.includes(billboard) ? classes.inCart : ""}
      // (vendors.find(e => e.Name === 'Magenic')
      className={
        cartContext.cart.find((e) => e.id === billboard.id)
          ? classes.inCart
          : ""
      }
    >
      <Table.Td ta={"left"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {billboard.Localizacao?.toLowerCase()}
        </Text>
      </Table.Td>
      {/* <Table.Td ta={"center"}>
        <Text lineClamp={1} tt={"capitalize"}>
          {billboard.cidade?.toLowerCase()}
        </Text>
      </Table.Td> */}
      <Table.Td ta={"center"} w={"200px"}>
        <Text lineClamp={1}>
          <NumberFormatter
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            //@ts-ignore
            value={billboard.valor}
          />
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Paper withBorder w={"80vw"} p={"lg"} m={"auto"} mt={"lg"}>
        <Grid p={"sm"}>
          <Grid.Col span={5}>
            <Stack h={"100%"} gap={0}>
              <Image src={thumbnailUrl} height={"300px"} />
              <Map lat={lat} long={long} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={7}>
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
          {cartContext.cart.find((e) => e.id === activeBillboard?.id) !==
          undefined ? (
            <Button
              w={"80%"}
              color="red"
              onClick={() => {
                if (activeBillboard) {
                  cartContext.setCart(
                    cartContext.cart.filter((e) => e.id !== activeBillboard.id)
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
                  cartContext.setCart([...cartContext.cart, activeBillboard]);
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
