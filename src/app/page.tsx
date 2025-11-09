import CategorySlider from "./_components/CategorySlider/CategorySlider";
import Card from "./_components/singleProduct/singleProduct";
import getProducts from "@/api/products";
import { productType } from "@/types/product.type";

export default async function Home() {
  const data = await getProducts();
  return (
    <>
      <CategorySlider />
      <div className="container w-[80%] mx-auto">
        <h2 className="text-xl font-medium text-center mb-6 text-slate-600">
          Our Products
        </h2>
        <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-y-3">
          {data.map((product: productType) => (
            <Card productInfo={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
