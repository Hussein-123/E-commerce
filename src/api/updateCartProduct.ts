"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function updateCartProduct(id: string, count: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    }
  );

  const payload = await response.json();
  return payload;
}
