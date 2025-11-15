import getProducts from "@/api/products";
import SingleProduct from "@/app/_components/singleProduct/singleProduct";
import { productType } from "@/types/product.type";
import React from "react";

export default async function Products() {
  const data = await getProducts();

  return (
    <div className="container w-full px-4 sm:px-6 md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto my-6 sm:my-8 md:my-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        All Products
      </h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((product: productType) => (
          <SingleProduct productInfo={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
