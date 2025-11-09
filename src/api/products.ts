export default async function getProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,
    {
      method: "GET",
    }
  );
  const { data } = await response.json();
  return data;
}
