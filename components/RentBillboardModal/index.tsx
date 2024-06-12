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
import { modals } from "@mantine/modals";

type Props = {
  billboard: inventarios;
  closeFn: () => void;
};

export default function RentBillboardModal({ billboard, closeFn }: Props) {
  const [fortnights, setFortnights] = useState<bisemanas[]>([]);
  const [selectedFortnights, setSelectedFortnights] = useState<string[]>([]);
  const cart = useContext(CartContext);
  const fortnightsData = fortnights.map((fortnight) => {
    return {
      value: fortnight.id.toString(),
      label:
        "BI-" +
        fortnight.numero +
        " - " +
        new Date(fortnight.dtInicio).toLocaleDateString("pt-BR") +
        " - " +
        new Date(fortnight.dtFinal).toLocaleDateString("pt-BR"),
    };
  });

  console.log(fortnightsData);
  useEffect(() => {
    fetchFortnights();
  }, []);

  async function fetchFortnights() {
    const res = await fetch("http://localhost:3000/api/fortnights", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setFortnights(data);
  }

  async function handleSubmit() {
    const billboardWithFortnights = {
      ...billboard,
      fortnights: selectedFortnights,
    };
    cart.setCart([...cart.cart, billboardWithFortnights]);
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
          // description="O aluguel deve ser realizado 10 dias antes do inicio da bisemana, estas são as bisemanas disponíveis."
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
