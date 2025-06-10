import { Inventory, inventoryTypes } from "@/types/websiteTypes";
import {
  Grid,
  Paper,
  Text,
  Pagination,
  Center,
  Stack,
  TextInput,
  Select,
  ComboboxData,
} from "@mantine/core";
import InventoryFlex from "./InventoryFlex";
import { useEffect, useState } from "react";
import { useDebouncedValue, useViewportSize } from "@mantine/hooks";
import onClickHandler from "./onClickHandler";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";

interface Props {
  typeOfInventory?: inventoryTypes;
}

export default function InventoryDisplayMainLayout({
  typeOfInventory = "billboards",
}: Props) {
  const [data, setData] = useState<Inventory[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState<ComboboxData>([]);
  const [fortnights, setFortnights] = useState<ComboboxData>([]);
  const { width: viewportWidth } = useViewportSize();
  const [loading, setLoading] = useState(false);

  const entriesPerPage =
    viewportWidth > 1300
      ? viewportWidth > 1575
        ? viewportWidth > 2321
          ? 15
          : 9
        : 6
      : 3;

  const paginationSiblings =
    viewportWidth > 1300
      ? viewportWidth > 1575
        ? viewportWidth > 2321
          ? 3
          : 2
        : 1
      : 0;

  const paginationBoundaries =
    viewportWidth > 1300
      ? viewportWidth > 1575
        ? viewportWidth > 2321
          ? 2
          : 1
        : 0
      : 0;

  const form = useForm({
    initialValues: {
      address: "",
      city: "",
      date: "",
      fortnight: "",
    },
  });

  const [debouncedAddress] = useDebouncedValue(form.values.address, 500);

  async function fetchInventory() {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/${typeOfInventory}?activePage=${currentPage}&pageSize=${entriesPerPage}&address=${debouncedAddress}&city=${form.values.city}&date=${form.values.date}&fortnights=${form.values.fortnight}`
      );

      let json = { data: [], totalPages: 0 };

      if (response.ok) {
        try {
          json = await response.json();
        } catch (err) {
          console.error("Erro ao converter JSON em fetchInventory:", err);
        }
      } else {
        const text = await response.text();
        console.error("Erro na API fetchInventory:", response.status, text);
      }

      setData(json.data || []);
      setTotalPages(json.totalPages || 0);
      if (currentPage > json.totalPages) setCurrentPage(json.totalPages || 1);
    } catch (err) {
      console.error("Erro inesperado em fetchInventory:", err);
      setData([]);
      setTotalPages(0);
    }
    setLoading(false);
  }

  async function fetchCitiesAsComboboxData() {
    try {
      const typeMapping = {
        billboards: "O",
        panels: "P",
        mupi: "M",
        LEDpanels: "L",
      };

      const response = await fetch(
        `/api/cities?type=${typeMapping[typeOfInventory]}&asCombobox=true`
      );

      let json = { data: [] };

      if (response.ok) {
        try {
          json = await response.json();
        } catch (err) {
          console.error("Erro ao converter JSON em fetchCities:", err);
        }
      } else {
        const text = await response.text();
        console.error("Erro na API fetchCities:", response.status, text);
      }

      setCities(json.data || []);
    } catch (err) {
      console.error("Erro inesperado em fetchCities:", err);
      setCities([]);
    }
  }

  async function fetchFortnightsAsComboboxData() {
    try {
      const response = await fetch(
        `/api/fortnights?asCombobox=true&years=${new Date().getFullYear()},${
          new Date().getFullYear() + 1
        }`
      );

      let json = { data: [] };

      if (response.ok) {
        try {
          json = await response.json();
        } catch (err) {
          console.error("Erro ao converter JSON em fetchFortnights:", err);
        }
      } else {
        const text = await response.text();
        console.error("Erro na API fetchFortnights:", response.status, text);
      }

      setFortnights(json.data || []);
    } catch (err) {
      console.error("Erro inesperado em fetchFortnights:", err);
      setFortnights([]);
    }
  }

  useEffect(() => {
    fetchInventory();
  }, [
    typeOfInventory,
    form.values.city,
    form.values.date,
    form.values.fortnight,
    debouncedAddress,
    currentPage,
    entriesPerPage,
  ]);

  useEffect(() => {
    fetchCitiesAsComboboxData();
    form.reset();
    form.setFieldValue("city", "");
  }, [typeOfInventory]);

  useEffect(() => {
    fetchFortnightsAsComboboxData();
  }, []);

  return (
    <Paper withBorder shadow="md" w="80%" m="auto">
      <Grid gutter={0} overflow="hidden" columns={12}>
        <Grid.Col span={3}>
          <Paper withBorder radius={0} h="100%" p="lg">
            <form>
              <TextInput label="Endereço" {...form.getInputProps("address")} />
              <Select
                id="citySelect"
                label="Cidade"
                data={cities}
                nothingFoundMessage="Nenhuma cidade encontrada"
                {...form.getInputProps("city")}
                onChange={(value) =>
                  form.setFieldValue("city", value ?? "")
                }
              />
              {typeOfInventory === "billboards" ? (
                <Select
                  label="Disponibilidade de bisemana"
                  data={fortnights}
                  {...form.getInputProps("fortnight")}
                />
              ) : (
                <>
                  <Text my="lg" ta="center">
                    Disponibilidade de data
                  </Text>
                  <Center>
                    <DatePicker
                      visibleFrom="sm"
                      allowDeselect
                      minDate={new Date()}
                      {...form.getInputProps("date")}
                      onChange={(value) =>
                        form.setFieldValue(
                          "date",
                          value
                            ? new Date(value).toISOString().split("T")[0]
                            : ""
                        )
                      }
                    />
                  </Center>
                </>
              )}
            </form>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto" pos="relative">
          <Paper p="xl" h={850} withBorder radius={0}>
            <Stack justify="space-between" h="100%">
              <InventoryFlex
                data={data}
                onClick={(value) =>
                  onClickHandler(value, typeOfInventory)
                }
              />
              <Center mt="xl">
                {totalPages > 0 && (
                  <Pagination
                    siblings={paginationSiblings}
                    boundaries={paginationBoundaries}
                    total={totalPages}
                    value={currentPage}
                    onChange={(value) => setCurrentPage(value)}
                  />
                )}
              </Center>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
