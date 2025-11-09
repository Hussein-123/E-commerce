"use server";

export async function getRelatedProducts(categoryId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category[in]=${categoryId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const payload = await response.json();
  return payload.data || [];
}
