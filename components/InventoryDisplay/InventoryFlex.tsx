import { Inventory } from "@/types/websiteTypes";
import { Flex, Text } from "@mantine/core";
import InventoryCard from "../_Cards/InventoryCard";

interface Props {
  data?: Inventory[];
  onClick: (inventory: Inventory) => void;
}

export default function InventoryFlex({ data = [], onClick }: Props) {
  const items =
    data.length > 0 ? (
      data.map((inventory) => (
        <InventoryCard inventory={inventory} onClick={onClick} />
      ))
    ) : (
      <Text c={"dimmed"} size={"sm"} ta={"center"} fs={"italic"}>
        Nenhum resultado encontrado
      </Text>
    );

  return (
    <Flex wrap={"wrap"} justify={"center"} gap={"md"}>
      {items}
    </Flex>
  );
}
