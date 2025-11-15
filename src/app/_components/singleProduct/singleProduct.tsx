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
    <div className="w-full">
      <Card className="h-full flex flex-col gap-2 p-2 sm:p-3 hover:shadow-lg transition-all duration-300 group">
        <Link href={`/products/${productInfo.id}`} className="flex-1">
          <CardHeader className="px-1 sm:px-2 pb-2">
            <CardTitle className="aspect-square overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={productInfo.imageCover}
                alt={productInfo.title}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </CardTitle>
            <CardDescription className="text-emerald-500 font-medium text-xs sm:text-sm mt-2">
              {productInfo.category.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-1 sm:px-2 pb-2">
            <p className="line-clamp-2 text-sm sm:text-base text-gray-700 leading-tight">
              {productInfo.title}
            </p>
          </CardContent>
          <CardFooter className="px-1 sm:px-2 pb-2 mt-auto">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold text-sm sm:text-base text-gray-800">
                {productInfo.price} EGP
              </span>
              <div className="flex gap-1 items-center">
                <span className="text-xs sm:text-sm text-gray-600">
                  {productInfo.ratingsAverage}
                </span>
                <StarIcon className="fill-yellow-500 text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          </CardFooter>
        </Link>
        <div className="px-1 sm:px-2">
          <AddBtn id={productInfo.id} />
        </div>
      </Card>
    </div>
  );
}
