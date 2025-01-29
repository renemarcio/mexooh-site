import { Inventory, inventoryTypes } from "@/types/websiteTypes";
import {
  Flex,
  Grid,
  Paper,
  Text,
  Pagination,
  Center,
  Stack,
  Tabs,
  LoadingOverlay,
  TextInput,
  Select,
  ComboboxData,
} from "@mantine/core";
import TestInventoryDisplayQuery from "../_Forms/TestInventoryDisplayQuery";
import InventoryFlex from "./InventoryFlex";
import { useEffect, useState } from "react";
import { useDebouncedValue, useViewportSize } from "@mantine/hooks";

import onClickHandler from "./onClickHandler";
import { useForm } from "@mantine/form";

interface Props {
  typeOfInventory?: inventoryTypes;
  entriesPerPage?: number;
  // totalPages?: number;
  // setCurrentPage?: (page: number) => void;
}

export default function InventoryDisplay({
  typeOfInventory = "billboards",
}: //Stuff that work but I am still refactoring stuff. I may have found joy in programming again.
// entriesPerPage = 9,
// totalPages = 0,
// setCurrentPage = (value) => {
//   console.log(
//     "InventoryDisplay's setCurrentPage has no implementation, if it had, it would be changing page to " +
//       value
//   );
// },
Props) {
  const [data, setData] = useState<Inventory[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState<ComboboxData>([]);
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const entriesPerPage = viewportWidth > 1000 ? 9 : 6;
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      address: "",
      city: "",
      date: "",
    },
  });
  const [debouncedAddress] = useDebouncedValue(form.values.address, 500);

  async function fetchInventory() {
    setLoading(true);
    const response = await fetch(
      `/api/${typeOfInventory}?activePage=${currentPage}&pageSize=${entriesPerPage}&address=${debouncedAddress}&city=${form.values.city}`
    );
    const data = await response.json();
    setLoading(false);
    console.log("Test data:", data);
    setData(data.data);
    if (data.totalPages) {
      setTotalPages(data.totalPages);
      if (currentPage > data.totalPages) setCurrentPage(data.totalPages);
    }
  }

  async function fetchCitiesAsComboboxData() {
    const typeMapping = {
      billboards: "O",
      panels: "P",
      mup: "M",
      LEDpanels: "L",
    };

    const response = await fetch(
      `/api/cities?type=${typeMapping[typeOfInventory]}&asCombobox=true`
    );

    const data = await response.json();
    console.log("combobox");
    console.log(data.data);
    setCities(data.data);
  }

  useEffect(() => {
    fetchInventory();
  }, [
    typeOfInventory,
    form.values.city,
    debouncedAddress,
    currentPage,
    entriesPerPage,
  ]);

  useEffect(() => {
    fetchCitiesAsComboboxData();
  }, [typeOfInventory]);
  return (
    <>
      <Paper withBorder shadow="md" w={"80%"} m={"auto"}>
        <Grid gutter={0}>
          <Grid.Col span={{ base: 2, lg: 4 }}>
            <Paper withBorder radius={0} h={"100%"}>
              {/* <TestInventoryDisplayQuery /> */}
              <form>
                <TextInput
                  label="Endereço"
                  {...form.getInputProps("address")}
                />
                <Select
                  label="Cidade"
                  data={cities}
                  searchable
                  nothingFoundMessage="Nenhuma cidade encontrada"
                  {...form.getInputProps("city")}
                />
              </form>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 10, lg: 8 }} pos={"relative"}>
            <LoadingOverlay visible={loading} overlayProps={{ blur: 3 }} />
            <Paper p={"xl"} h={900} withBorder radius={0}>
              <Stack justify="space-between" h={"100%"}>
                <InventoryFlex
                  data={data}
                  onClick={(value) => onClickHandler(value, typeOfInventory)}
                />
                <Center mt={"xl"}>
                  {totalPages > 0 && (
                    <Pagination
                      total={totalPages}
                      onChange={(value) => setCurrentPage(value)}
                    />
                  )}
                </Center>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
