import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import ProductSlider from "@/app/_components/ProductSlider/ProductSlider";
import getSelectedProduct from "@/api/selectedProduct";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import { getRelatedProducts } from "@/api/getRelatedProducts";
import { productType } from "@/types/product.type";
import SingleProduct from "@/app/_components/singleProduct/singleProduct";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data = await getSelectedProduct(id);

  if (!data) {
    return <h1>Product not found</h1>;
  }

  const relatedProducts = await getRelatedProducts(data.category._id);

  return (
    <div className="container w-[80%] mx-auto flex flex-col gap-10 my-10">
      <Card className="grid md:grid-cols-3 items-center border border-slate-300 rounded-md">
        <div className="col-span-1">
          <ProductSlider images={data.images} altContent={data.title} />
        </div>
        <div className="md:col-span-2 space-y-6 p-4">
          <CardHeader>
            <CardDescription className="text-lg">
              {data.brand.name}
            </CardDescription>
            <CardTitle className="text-2xl">{data.title}</CardTitle>
            <CardDescription>{data.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              {data.category.name}
            </CardDescription>
            <div className="flex justify-between items-center mt-5">
              <p className="flex gap-1 items-center">
                <span className="text-xl font-semibold">
                  {data.ratingsAverage}
                </span>
                <StarIcon className="fill-yellow-500 text-yellow-500" />
              </p>
              <p className="flex gap-1 items-center">
                <span className="text-xl font-semibold">{data.price} EGP</span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <AddBtn id={data.id} />
          </CardFooter>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mt-10 mb-5 text-center text-slate-600">
          Related Products
        </h2>
        <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {relatedProducts.map((product: productType) => (
            <SingleProduct productInfo={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
