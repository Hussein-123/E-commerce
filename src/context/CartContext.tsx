"use client";
import getLoggedUserCart from "@/api/getUserCart";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartContextType {
  numberOfCartItems: number;
  setNumberOfCartItems: Dispatch<SetStateAction<number>>;
  refreshCart: () => Promise<void>;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const getUserCart = async () => {
    const response = await getLoggedUserCart();
    if (response.status === "success") {
      let sum = 0;
      response.data.products.forEach((product: { count: number }) => {
        sum += product.count;
      });
      setNumberOfCartItems(sum);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numberOfCartItems,
        setNumberOfCartItems,
        refreshCart: getUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
