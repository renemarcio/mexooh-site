import { CartEntry } from "@/types/cartEntry";
import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext } from "react";

type CartContextType = {
  cart: CartEntry[];
  setCart: React.Dispatch<React.SetStateAction<CartEntry[]>>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export function CartProvider({ children }: any) {
  // const [cart, setCart] = useState<inventarios[]>([]);
  const [cart, setCart] = useLocalStorage<CartEntry[]>({
    key: "cart",
    defaultValue: [],
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
