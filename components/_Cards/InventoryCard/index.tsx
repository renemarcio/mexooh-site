import { Inventory } from "@/types/websiteTypes";
import { Card, Text, Image, LoadingOverlay } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useState } from "react";

interface Props {
  inventory: Inventory;
  onClick: (inventory: Inventory) => void;
}

export default function InventoryCard({ inventory, onClick }: Props) {
  const [loading, setLoading] = useState(true);
  return (
    <Card
      shadow="sm"
      padding={"md"}
      radius={"sm"}
      withBorder
      w={280}
      h={225}
      onClick={() => onClick(inventory)}
      style={{ cursor: "pointer" }}
      key={inventory.id}
    >
      <Card.Section pos={"relative"}>
        <LoadingOverlay visible={loading} />
        <Image
          src={inventory.thumbnailUrl}
          fallbackSrc={"https://placehold.co/600x400?text=MexOOH"}
          h={160}
          w={280}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoad={() => setLoading(false)}
        />
      </Card.Section>
      <Text ta={"center"} lineClamp={2}>
        {inventory.address}
      </Text>
    </Card>
  );
}
