import getProducts from "@/api/products";
import SingleProduct from "@/app/_components/singleProduct/singleProduct";
import { productType } from "@/types/product.type";
import React from "react";

export default async function Products() {
  const data = await getProducts();

  return (
    <>
      <div className="container w-[80%] mx-auto my-12">
        <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((product: productType) => (
            <SingleProduct productInfo={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
