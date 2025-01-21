import { CartContext } from "@/contexts/CartContext";
import { Title, Text, Button, MultiSelect, Skeleton } from "@mantine/core";
import { Fortnight, InfoOOHPanelInfoType, Panel } from "@/types/websiteTypes";
import React, { useContext, useEffect, useState } from "react";
import InfoOOHDisplay from "../../InfoOOHDisplay";

type Props = {
  panel: Panel;
  closeFn: () => void;
};

export default function PanelRentForm({ panel, closeFn }: Props) {
  const [fortnights, setFortnights] = useState<Fortnight[]>([]);
  const [selectedFortnights, setSelectedFortnights] = useState<string[]>([]);
  const [rentedFortnights, setRentedFortnights] = useState<Number[]>([]);
  const [infoOOHData, setInfoOOHData] = useState<InfoOOHPanelInfoType>();
  const [loading, setLoading] = useState(false);

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
      disabled: !rentedFortnights.includes(fortnight.id),
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

  async function fetchRentedFortnights() {
    const res = await fetch("/api/fortnights/rented?id=" + panel.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const rentedFortnightsIDs = data.data.map((obj: { id: number }) => obj.id);
    setRentedFortnights(rentedFortnightsIDs);
  }

  async function fetchInfoOOHData() {
    setLoading(true);
    const response = await fetch(`/api/infooh/panels?id=${panel.id}`);
    const data = await response.json();
    setInfoOOHData(data.data[0]);
    setLoading(false);
  }

  useEffect(() => {
    fetchFortnights();
    fetchRentedFortnights();
    fetchInfoOOHData();
  }, []);

  return (
    <>
      <Title ta={"center"}>{panel.address}</Title>
      {/* <Text ta={"center"}>
        Os valores dos painéis são negociáveis, coloque no carrinho para que
        possamos entrar em contato e reservar seu painel.
      </Text> */}
      <Skeleton visible={loading}>
        <InfoOOHDisplay data={infoOOHData} />
      </Skeleton>
      <Button
        fullWidth
        onClick={() => {
          cart.setCart([...cart.cart, { item: panel, value: 0 }]);
          closeFn();
        }}
        disabled={cart.cart.find((e) => e.item.id === panel.id) ? true : false}
      >
        Quero reservar!
      </Button>
    </>
  );
}
