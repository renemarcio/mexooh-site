import { CartContext } from "@/contexts/CartContext";
import { Pontos } from "@/types/databaseTypes";
import { Fortnight, Inventory } from "@/types/websiteTypes";
import { Title, Text, Button, MultiSelect } from "@mantine/core";
// import { bisemanas, inventarios } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  mup: Inventory;
  closeFn: () => void;
};

export default function MUPForm({ mup, closeFn }: Props) {
  const [fortnights, setFortnights] = useState<Fortnight[]>([]);
  const [selectedFortnights, setSelectedFortnights] = useState<string[]>([]);
  const [rentedFortnights, setRentedFornitghts] = useState<Number[]>([]);
  const cart = useContext(CartContext);
  const fortnightsData = fortnights.map((fortnight) => {
    return {
      value: fortnight.id.toString(),
      label: `BI-${fortnight.number} -
          ${Number(new Date(fortnight.start).getUTCDate()).toLocaleString(
            "pt-BR",
            {
              minimumIntegerDigits: 2,
            }
          )}/${Number(
        new Date(fortnight.start).getUTCMonth() + 1
      ).toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
      })}/${new Date(fortnight.start).getUTCFullYear()} -
        ${Number(new Date(fortnight.finish).getUTCDate()).toLocaleString(
          "pt-BR",
          {
            minimumIntegerDigits: 2,
          }
        )}/${Number(
        new Date(fortnight.finish).getUTCMonth() + 1
      ).toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
      })}/${new Date(fortnight.finish).getUTCFullYear()}`,
      disabled: rentedFortnights.includes(fortnight.id),
    };
  });
  async function fetchFortnights() {
    const res = await fetch("/api/fortnights", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setFortnights(data.data);
  }

  async function fetchAvailableFortnights() {
    const res = await fetch("/api/mup/" + mup.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const availableFortnightsIDs = data.data.map(
      (obj: { id: number }) => obj.id
    );
    setRentedFornitghts(availableFortnightsIDs);
  }

  useEffect(() => {
    fetchFortnights();
    fetchAvailableFortnights();
  }, []);

  return (
    <>
      <Title ta={"center"}>{mup.address}</Title>
      <Text ta={"center"}>
        Os valores dos painéis são negociáveis, coloque no carrinho para que
        possamos entrar em contato e reservar seu painel.
      </Text>
      {/* <MultiSelect
        label="Selecione as Bi-Semanas."
        description="Bi-Semanas disponíveis"
        data={fortnightsData}
        value={selectedFortnights}
        onChange={setSelectedFortnights}
      /> */}
      <Button
        fullWidth
        onClick={() => {
          const rentedFortnights = fortnights.filter((fortnight) =>
            selectedFortnights.includes(fortnight.id.toString())
          );
          cart.setCart([...cart.cart, { item: mup, value: 0 }]);
          closeFn();
        }}
      >
        Quero reservar!
      </Button>
    </>
  );
}
