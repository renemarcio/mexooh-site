"use client";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import InventoryDisplay from "@/components/InventoryDisplay";
import LEDPanel from "@/components/LEDPanel";
import MUPI from "@/components/MUPI";
import Panels from "@/components/Panels";
import Rent from "@/components/Rent";
import { inventoryTypes } from "@/types/websiteTypes";
import { Title, Center, Text } from "@mantine/core";
import { useState } from "react";

export default function HomePage() {
  const [typeOfInventory, setTypeOfInventory] =
    useState<inventoryTypes>("panels");
  return (
    <>
      {/* <Hero />
      <Info />
      <Panels />
      <MUPI />
      <Rent />
      <LEDPanel /> */}
      <Hero setTypeOfInventory={setTypeOfInventory} />
      <Info />
      <Title ta={"center"} id="inventory">
        Confira nosso inventário
      </Title>
      <Center>
        <Text ta={"center"} w={"50%"} mb={"xl"} mt={"md"}>
          Oferecemos visibilidade para o seu negócio de várias formas, seja por
          um outdoor na rua ou um painel de publicidade em uma estrada, nossos
          pontos são as melhores maneiras de divulgar seu negócio. Coloque já no
          carrinho e faça seu negocio crescer.
        </Text>
      </Center>
      <InventoryDisplay
        setTypeOfInventory={setTypeOfInventory}
        typeOfInventory={typeOfInventory}
      />
    </>
  );
}
