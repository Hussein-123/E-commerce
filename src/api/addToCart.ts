"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function addToCart(id: string) {
  try {
    const token = await getMyToken();
    if (!token) {
      throw new Error("please login first");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      }
    );

    const payload = await response.json();
    return payload;
  } catch (error) {
    return error;
  }
}
