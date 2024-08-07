import { CartContext } from "@/contexts/CartContext";
import { Title, Text, Button, MultiSelect } from "@mantine/core";
import { bisemanas, inventarios } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  mup: inventarios;
  closeFn: () => void;
};

export default function MUPForm({ mup, closeFn }: Props) {
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
        )}/${Number(
        new Date(fortnight.dtFinal).getUTCMonth() + 1
      ).toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
      })}/${new Date(fortnight.dtFinal).getUTCFullYear()}`,
      disabled: !availableFortnights.includes(fortnight.id),
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
    console.log("data from fetchFortnights()");
    console.log(data);
    setFortnights(data);
  }

  async function fetchAvailableFortnights() {
    const res = await fetch("/api/billboards/" + mup.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const availableFortnightsIDs = data.availableFortnights.map(
      (obj: { id: number }) => obj.id
    );
    setAvailableFortnights(availableFortnightsIDs);
  }

  useEffect(() => {
    fetchFortnights();
    fetchAvailableFortnights();
  }, []);

  return (
    <>
      <Title ta={"center"}>{mup.Localizacao}</Title>
      {/* <Text ta={"center"}>
        Os valores dos painéis são negociáveis, coloque no carrinho para que
        possamos entrar em contato e reservar seu painel.
      </Text> */}
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
          cart.setCart([
            ...cart.cart,
            { item: mup, value: 0, fortnights: rentedFortnights },
          ]);
          closeFn();
        }}
      >
        Quero reservar!
      </Button>
    </>
  );
}
