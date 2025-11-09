"use server";
import getMyToken from "@/utilities/getMyToken";
import { CheckoutSchemaType } from "./../schema/checkout.schema";

export async function onlineCheckout(
  cartId: string,
  url = process.env.NEXT_URL,
  formValues: CheckoutSchemaType
) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("You must be logged in to perform this action.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  const payload = await response.json();
  return payload;
}
