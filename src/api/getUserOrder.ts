"use server";
import getMyToken from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";

export async function getUserOrder() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("You must be logged in to perform this action.");
  }
  const { id } = jwtDecode<{ id: string }>(token);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${id}`,
    {
      method: "GET",
    }
  );
  const payload = await response.json();
  return payload;
}
