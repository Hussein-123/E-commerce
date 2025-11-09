"use server";
import getMyToken from "@/utilities/getMyToken";
import { CheckoutSchemaType } from "./../schema/checkout.schema";

export async function cashCheckout(
  cartId: string,
  formValues: CheckoutSchemaType
) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("You must be logged in to perform this action.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
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
