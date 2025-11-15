"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { categoryType } from "@/types/category.type";
import Image from "next/image";

export default function CategorySwiper({ data }: { data: categoryType[] }) {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={2}
      modules={[Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
      className="category-swiper"
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 8 },
        480: { slidesPerView: 2.5, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 12 },
        768: { slidesPerView: 3.5, spaceBetween: 15 },
        1024: { slidesPerView: 4.5, spaceBetween: 16 },
        1200: { slidesPerView: 5, spaceBetween: 18 },
        1280: { slidesPerView: 6, spaceBetween: 20 },
      }}
    >
      {data.map((category: categoryType) => (
        <SwiperSlide key={category._id} className="!h-auto">
          <div className="group cursor-pointer">
            <div className="h-32 sm:h-40 md:h-48 lg:h-52 w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={category.image}
                alt={category.name}
                width={400}
                height={400}
              />
            </div>
            <h3 className="text-center mt-2 sm:mt-3 font-medium text-sm sm:text-base text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
              {category.name}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
