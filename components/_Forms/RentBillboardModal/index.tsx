import {
  Box,
  Button,
  Center,
  Code,
  ComboboxData,
  Group,
  MultiSelect,
  NumberFormatter,
  Stack,
  Text,
  Title,
  Image,
} from "@mantine/core";
// import { bisemanas, inventarios } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import Map from "../../Map";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { CartContext } from "@/contexts/CartContext";
import { CartEntry } from "@/types/cartEntry";
import { Billboard, Fortnight } from "@/types/websiteTypes";

type Props = {
  billboard: Billboard;
  closeFn: () => void;
  signedURL: string;
};

export default function RentBillboardModal({
  billboard,
  closeFn,
  signedURL,
}: Props) {
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
        <Image
          src={signedURL}
          fallbackSrc="https://placehold.co/600x400/2e2e2e/3b3b3b?text=Sem%20Foto"
        />
        <Map
          lat={Number(billboard.coordinates?.split(",")[0])}
          long={Number(billboard.coordinates?.split(",")[1])}
        />
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
