import {
  Box,
  Button,
  Center,
  Code,
  ComboboxData,
  MultiSelect,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";
// import { bisemanas, inventarios } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import Map from "../Map";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { CartContext } from "@/contexts/CartContext";
import { CartEntry } from "@/types/cartEntry";
import { Billboard, Fortnight } from "@/types/websiteTypes";

type Props = {
  billboard: Billboard;
  closeFn: () => void;
};

export default function RentBillboardModal({ billboard, closeFn }: Props) {
  const [fortnights, setFortnights] = useState<Fortnight[]>([]);
  const [selectedFortnights, setSelectedFortnights] = useState<string[]>([]);
  const [rentedFortnights, setRentedFortnights] = useState<Number[]>([]);
  const cart = useContext(CartContext);
  const fortnightsData =
    fortnights.map((fortnight) => {
      return {
        value: fortnight.id.toString(),
        label: `BI-${fortnight.number} -
        ${Number(new Date(fortnight.start).getUTCDate()).toLocaleString(
          "pt-BR",
          {
            minimumIntegerDigits: 2,
          }
        )}/${Number(new Date(fortnight.start).getUTCMonth() + 1).toLocaleString(
          "pt-BR",
          {
            minimumIntegerDigits: 2,
          }
        )}/${new Date(fortnight.start).getUTCFullYear()} -
      ${Number(new Date(fortnight.finish).getUTCDate()).toLocaleString(
        "pt-BR",
        {
          minimumIntegerDigits: 2,
        }
      )}/${Number(new Date(fortnight.finish).getUTCMonth() + 1).toLocaleString(
          "pt-BR",
          {
            minimumIntegerDigits: 2,
          }
        )}/${new Date(fortnight.finish).getUTCFullYear()}`,
        disabled: rentedFortnights.includes(fortnight.id),
      };
    }) || [];

  useEffect(() => {
    fetchFortnights();
    fetchRentedFortnights();
  }, []);

  async function fetchFortnights() {
    const res = await fetch(
      "/api/fortnights?currentDate=" + new Date().toISOString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log("data from fetchFortnights()");
    console.log(data.data);
    setFortnights(data.data);
  }

  async function fetchRentedFortnights() {
    const res = await fetch("/api/fortnights/rented?id=" + billboard.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data from api/fortnights/rented");
    console.log(data);
    // console.log("availableFortnightsIDs");
    // console.log(availableFortnightsIDs);
    const rentedFortnightsIDs = data.data.map((fortnight: Fortnight) => {
      return fortnight.id;
    });
    setRentedFortnights(rentedFortnightsIDs);
  }

  async function handleSubmit() {
    if (selectedFortnights.length <= 0) {
      return;
    }
    const rentedFortnights = fortnights.filter((fortnight) =>
      selectedFortnights.includes(fortnight.id.toString())
    );
    const newCartEntry: CartEntry = {
      item: billboard,
      value: billboard.value,
      fortnights: rentedFortnights, //fortnights that match selectedFortnights IDS
    };
    cart.setCart([...cart.cart, newCartEntry]);
    closeFn();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Title ta={"center"}>{billboard.address}</Title>
      <Stack gap={"md"}>
        <Center>
          <Box h={"400px"} w={"100%"}>
            <Map
              lat={Number(billboard.coordinates?.split(",")[0])}
              long={Number(billboard.coordinates?.split(",")[1])}
            />
          </Box>
        </Center>
        <MultiSelect
          label="Selecione as Bi-Semanas."
          description="Bi-Semanas disponíveis"
          data={fortnightsData}
          value={selectedFortnights}
          onChange={setSelectedFortnights}
        />
        <Button
          fullWidth
          leftSection={<IconShoppingCartPlus />}
          disabled={selectedFortnights.length <= 0}
          type="submit"
        >
          Adicionar ao carrinho
        </Button>
      </Stack>
    </form>
  );
}
