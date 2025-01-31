import { CartContext } from "@/contexts/CartContext";
import { Inventory } from "@/types/websiteTypes";
import {
  Card,
  Text,
  Image,
  LoadingOverlay,
  Overlay,
  darken,
  CloseButton,
} from "@mantine/core";
import { randomId, useHover } from "@mantine/hooks";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import { useContext, useState } from "react";

interface Props {
  inventory: Inventory;
  onClick: (inventory: Inventory) => void;
}

export default function InventoryCard({ inventory, onClick }: Props) {
  const [loading, setLoading] = useState(true);
  const { hovered, ref } = useHover();
  const cartContext = useContext(CartContext);

  const isItemInCart = cartContext.cart.find((e) => e.item.id === inventory.id);

  function onClickHandler() {
    if (isItemInCart) {
      cartContext.setCart(
        cartContext.cart.filter((e) => e.item.id !== inventory.id)
      );
    } else {
      onClick(inventory);
    }
  }

  return (
    <Card
      ref={ref}
      shadow="sm"
      padding={"md"}
      radius={"sm"}
      withBorder
      w={280}
      h={225}
      // onClick={() => onClick(inventory)}
      onClick={() => onClickHandler()}
      style={{ cursor: "pointer" }}
      key={inventory.id}
    >
      <Card.Section pos={"relative"}>
        <LoadingOverlay visible={loading} />
        {cartContext.cart.find((e) => e.item.id === inventory.id) && (
          <>
            {/* <CloseButton
              style={{ zIndex: 10, position: "absolute", right: -2, top: -2 }}
              bg={"red"}
              onClick={() => {
                cartContext.setCart(
                  cartContext.cart.filter((e) => e.item.id !== inventory.id)
                );
              }}
            /> */}
            {!hovered ? (
              <IconShoppingCart
                style={{
                  top: "30%",
                  width: "100%",
                  position: "absolute",
                  zIndex: 10,
                }}
                size={70}
                color="var(--mantine-primary-color-filled)"
              />
            ) : (
              <IconX
                style={{
                  top: "30%",
                  width: "100%",
                  position: "absolute",
                  zIndex: 10,
                }}
                size={70}
                color="var(--mantine-color-red-filled)"
              />
            )}

            <Overlay
              blur={3}
              color={
                !hovered
                  ? darken("#00652E", 0.8)
                  : "var(--mantine-color-red-filled-hover)"
              }
              zIndex={9}
            />
          </>
        )}
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
