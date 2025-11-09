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
      spaceBetween={10}
      slidesPerView={6}
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
        1280: { slidesPerView: 6, spaceBetween: 20 },
      }}
    >
      {data.map((category: categoryType) => (
        <SwiperSlide key={category._id}>
          <div className="h-52 w-full overflow-hidden rounded-lg">
            <Image
              className="w-full h-full object-cover"
              src={category.image}
              alt={category.name}
              width={500}
              height={500}
            />
          </div>
          <h3 className="text-center mt-3 font-medium">{category.name}</h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
