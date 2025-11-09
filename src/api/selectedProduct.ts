export default async function getSelectedProduct(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  return data;
}
