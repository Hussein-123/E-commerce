import CategorySlider from "./_components/CategorySlider/CategorySlider";
import Card from "./_components/singleProduct/singleProduct";
import getProducts from "@/api/products";
import { productType } from "@/types/product.type";

export default async function Home() {
  const data = await getProducts();
  return (
    <>
      <CategorySlider />
      <div className="container w-full px-4 sm:px-6 md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-center mb-4 sm:mb-6 text-slate-600">
          Our Products
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((product: productType) => (
            <Card productInfo={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
