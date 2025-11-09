"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { checkoutSchema, CheckoutSchemaType } from "@/schema/checkout.schema";
import { onlineCheckout } from "@/api/onlineCheckout";
import { cashCheckout } from "@/api/cashCheckout";
import { CartContext } from "@/context/CartContext";

export default function CheckOut() {
  const { cartId }: { cartId: string } = useParams();
  const [loading, setLoading] = useState<"online" | "cash" | null>(null);
  const navigate = useRouter();
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { setNumberOfCartItems } = cartContext;

  const form = useForm<CheckoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleOnlineCheckout(values: CheckoutSchemaType) {
    setLoading("online");
    try {
      const response = await onlineCheckout(cartId, "", values);
      if (response.status === "success") {
        window.location.href = response.session.url;
      } else {
        toast.error("Failed to start online payment.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(null);
    }
  }

  async function handleCashOnDelivery(values: CheckoutSchemaType) {
    setLoading("cash");
    try {
      const response = await cashCheckout(cartId, values);
      if (response.status === "success") {
        toast.success("Order placed successfully!");
        setNumberOfCartItems(0);
        navigate.push("/allorders");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="container w-full md:w-[80%] lg:w-[50%] mx-auto px-5">
      <h1 className="text-2xl mb-6 text-center text-emerald-700 font-semibold">
        Checkout Now
      </h1>

      <Form {...form}>
        <form className="space-y-5">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your details"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 justify-center mt-6">
            <Button
              type="button"
              onClick={form.handleSubmit(handleOnlineCheckout)}
              disabled={loading === "online"}
              className="w-1/2 cursor-pointer"
            >
              {loading === "online" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Online Payment"
              )}
            </Button>

            <Button
              type="button"
              onClick={form.handleSubmit(handleCashOnDelivery)}
              disabled={loading === "cash"}
              className="bg-emerald-600 hover:bg-emerald-700 w-1/2 cursor-pointer"
            >
              {loading === "cash" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Cash on Delivery"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
