import React from "react";
import getAllCategories from "@/api/AllCategories";
import CategorySwiper from "../CategorySwiper/CategorySwiper";

export default async function CategorySlider() {
  const data = await getAllCategories();

  return (
    <div className="container w-[80%] mx-auto my-12">
      <h2 className="text-xl font-medium mb-4 text-slate-600">
        Shop Popular Categories
      </h2>
      <CategorySwiper data={data} />
    </div>
  );
}
