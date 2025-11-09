"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function clearUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );
  const payload = await response.json();
  return payload;
}
