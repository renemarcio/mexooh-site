import { useLocalStorage } from "@mantine/hooks";
import { inventarios } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type CartContextType = {
  cart: inventarios[];
  setCart: React.Dispatch<React.SetStateAction<inventarios[]>>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export function CartProvider({ children }: any) {
  // const [cart, setCart] = useState<inventarios[]>([]);
  const [cart, setCart] = useLocalStorage<inventarios[]>({
    key: "cart",
    defaultValue: [],
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
