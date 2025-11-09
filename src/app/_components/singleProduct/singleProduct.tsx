import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { productType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";

export default function SingleProduct({
  productInfo,
}: {
  productInfo: productType;
}) {
  return (
    <>
      <div>
        <Card className="gap-3 p-3">
          <Link href={`/products/${productInfo.id}`}>
            <CardHeader className="px-2">
              <CardTitle>
                <Image
                  src={productInfo.imageCover}
                  alt=""
                  width={500}
                  height={500}
                />
              </CardTitle>
              <CardDescription className="text-emerald-500 font-medium">
                {productInfo.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <p className="line-clamp-1">{productInfo.title}</p>
            </CardContent>
            <CardFooter className="px-2">
              <div className="flex justify-between w-full">
                <span>{productInfo.price} EGP</span>
                <div className="flex gap-1 items-center">
                  <span>{productInfo.ratingsAverage}</span>
                  <StarIcon className="fill-yellow-500 text-yellow-500" />
                </div>
              </div>
            </CardFooter>
          </Link>
          <AddBtn id={productInfo.id} />
        </Card>
      </div>
    </>
  );
}
