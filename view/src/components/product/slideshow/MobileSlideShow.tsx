"use client";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const MobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination
        modules={[FreeMode, Pagination]}
        className="mySwiper2"
      >
        {
          images.map((image, i) => (
        <SwiperSlide key={i}>
          <Image
          src={`/products/${image}`}
          width={600}
          height={400}
          alt={title}
          className="object-cover"
           />
        </SwiperSlide>

          ))
        }
      </Swiper>
    </div>
  );
};
