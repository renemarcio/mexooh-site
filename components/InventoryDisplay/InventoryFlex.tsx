import { Inventory } from "@/types/websiteTypes";
import { Flex, Text } from "@mantine/core";
import InventoryCard from "../_Cards/InventoryCard";

interface Props {
  type: string;
  data?: Inventory[];
  onClick?: (inventory: Inventory) => void;
}

export default function InventoryFlex({ data = [], onClick = () => {}, type }: Props) {
  const items =
    data.length > 0 ? (
      data.map((inventory) => (
        <div key={inventory.id}>
          <Text ta="center" fw={700} mb="xs">
            {inventory.pon_compl}
          </Text>
          <InventoryCard inventory={inventory} onClick={onClick} />
        </div>
      ))
    ) : (
      <Text c="dimmed" size="sm" ta="center" fs="italic">
        Nenhum resultado encontrado para o tipo: {type}
      </Text>
    );

  return (
    <Flex wrap="wrap" justify="center" gap="md">
      {items}
    </Flex>
  );
}
