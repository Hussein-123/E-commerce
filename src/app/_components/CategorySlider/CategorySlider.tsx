import React from "react";
import getAllCategories from "@/api/AllCategories";
import CategorySwiper from "../CategorySwiper/CategorySwiper";

export default async function CategorySlider() {
  const data = await getAllCategories();

  return (
    <div className="container w-full px-4 sm:px-6 md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto my-6 sm:my-8 md:my-12">
      <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4 md:mb-6 text-slate-600">
        Shop Popular Categories
      </h2>
      <CategorySwiper data={data} />
    </div>
  );
}
