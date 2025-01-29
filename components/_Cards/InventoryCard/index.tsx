import { Inventory } from "@/types/websiteTypes";
import { Card, Text, Image } from "@mantine/core";

interface Props {
  inventory: Inventory;
}

export default function InventoryCard({ inventory }: Props) {
  return (
    <Card shadow="sm" padding={"md"} radius={"sm"} withBorder w={280} h={220}>
      <Card.Section>
        <Image
          src={inventory.thumbnailUrl}
          fallbackSrc={"https://placehold.co/600x400?text=MexOOH"}
          h={160}
          w={280}
        />
      </Card.Section>
      <Text ta={"center"} lineClamp={2}>
        {inventory.address}
      </Text>
    </Card>
  );
}
