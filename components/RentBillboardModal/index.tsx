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
import { bisemanas, inventarios } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import Map from "../Map";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { CartContext } from "@/contexts/CartContext";
import { CartEntry } from "@/types/cartEntry";

type Props = {
  billboard: inventarios;
  closeFn: () => void;
};

export default function RentBillboardModal({ billboard, closeFn }: Props) {
  const [fortnights, setFortnights] = useState<bisemanas[]>([]);
  const [selectedFortnights, setSelectedFortnights] = useState<string[]>([]);
  const [availableFortnights, setAvailableFortnights] = useState<Number[]>([]);
  const cart = useContext(CartContext);
  const fortnightsData = fortnights.map((fortnight) => {
    return {
      value: fortnight.id.toString(),
      label: `BI-${fortnight.numero} -
        ${Number(new Date(fortnight.dtInicio).getUTCDate()).toLocaleString(
          "pt-BR",
          {
            minimumIntegerDigits: 2,
          }
        )}/${Number(
        new Date(fortnight.dtInicio).getUTCMonth() + 1
      ).toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
      })}/${new Date(fortnight.dtInicio).getUTCFullYear()} -
      ${Number(new Date(fortnight.dtFinal).getUTCDate()).toLocaleString(
        "pt-BR",
        {
          minimumIntegerDigits: 2,
        }
      )}/${Number(new Date(fortnight.dtFinal).getUTCMonth() + 1).toLocaleString(
        "pt-BR",
        {
          minimumIntegerDigits: 2,
        }
      )}/${new Date(fortnight.dtFinal).getUTCFullYear()}`,
      disabled: !availableFortnights.includes(fortnight.id),
    };
  });

  useEffect(() => {
    fetchFortnights();
    fetchAvailableFortnights();
  }, []);

  async function fetchFortnights() {
    const res = await fetch("/api/fortnights", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data from fetchFortnights()");
    console.log(data);
    setFortnights(data);
  }

  async function fetchAvailableFortnights() {
    const res = await fetch("/api/billboards/" + billboard.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("data from fetchAvailableFortnights()");
    console.log(data.availableFortnights);
    const availableFortnightsIDs = data.availableFortnights.map(
      (obj: { id: number }) => obj.id
    );
    console.log("availableFortnightsIDs");
    console.log(availableFortnightsIDs);
    setAvailableFortnights(availableFortnightsIDs);

    // setSelectedFortnights(data.fortnights);
  }

  async function handleSubmit() {
    const newCartEntry: CartEntry = {
      item: billboard,
      value: billboard.Iluminado ? 1190 : 1090,
      fortnightIDs: selectedFortnights,
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
      <Title ta={"center"}>{billboard.Localizacao}</Title>
      <Stack gap={"md"}>
        <Center>
          <Box h={"400px"} w={"100%"}>
            <Map
              lat={Number(billboard.LinkGoogleMaps?.split(",")[0])}
              long={Number(billboard.LinkGoogleMaps?.split(",")[1])}
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
