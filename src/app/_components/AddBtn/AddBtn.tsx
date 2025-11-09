"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import addToCart from "@/api/addToCart";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";

export default function AddBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("Cart component must be used within CartContextProvider");
  }

  const { numberOfCartItems, setNumberOfCartItems } = cartContext;

  async function addProduct(id: string) {
    setLoading(true);
    const response = await addToCart(id);
    if (response.status === "success") {
      toast.success("Product added to cart");
      setNumberOfCartItems(numberOfCartItems + 1);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }
  return (
    <>
      <Button onClick={() => addProduct(id)} className="cursor-pointer w-full">
        {loading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          <>
            Add To Cart <ShoppingCart />
          </>
        )}
      </Button>
    </>
  );
}
