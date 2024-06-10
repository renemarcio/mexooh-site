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
import React, { useEffect, useState } from "react";
import Map from "../Map";
import { IconShoppingCartPlus } from "@tabler/icons-react";

type Props = {
  billboard: inventarios;
};

export default function RentBillboardModal({ billboard }: Props) {
  const [fortnights, setFortnights] = useState<bisemanas[]>([]);
  const [selectedFortnights, setSelectedFortnights] = useState<string[]>([]);
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

  return (
    <form>
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
          label="Selecione as bisemanas para alugar."
          // description="O aluguel deve ser realizado 10 dias antes do inicio da bisemana, estas são as bisemanas disponíveis."
          description="Bisemanas disponíveis"
          data={fortnightsData}
          value={selectedFortnights}
          onChange={setSelectedFortnights}
        />

        <Button
          fullWidth
          leftSection={<IconShoppingCartPlus />}
          disabled={selectedFortnights.length <= 0}
        >
          Adicionar ao carrinho
        </Button>
      </Stack>
    </form>
  );
}
