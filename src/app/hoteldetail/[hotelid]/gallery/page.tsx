"use client";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetHotelReviewsQuery, useGetHotelsDetailsQuery } from "../services/hotelDetailsApi";
import RenderStars from "@/components/page-components/hotelDetails/RenderStars";
import { X } from "lucide-react";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { hotelid } = useParams();

  const {
    data: hotel,
    error,
    isLoading,
  } = useGetHotelsDetailsQuery({
    hotelId: hotelid,
  });

 
  const slides = hotel?.data?.images.map((img: string, i: number) => ({
    src: img,
    alt: `carousel_image_${i}`,
    type: "image" as const,
  }));

  return !isLoading ? (
    <div className="min-h-screen bg-white pt-10 relative">
      <button className=" text-black absolute top-4 right-4 cursor-pointer hover:text-gray-600" onClick={() => window.history.back()}> <X size={30} /></button>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <p className="text-4xl text-center mb-10 bg-gradient-to-r from-orange-300 to-[#ed4b22] text-transparent bg-clip-text font-bold">
          Our Gallery
        </p>
        <div className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12 ">
          <h1 className="mb-2">{hotel.data.name}</h1>
          <div className="flex justify-center gap-1"><RenderStars rating={hotel.data.rating} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {hotel.data.images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={`Room ${i}`}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
            />
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          plugins={[Thumbnails]}
          carousel={{ finite: true }}
        />
      </div>
    </div>
  ) : (
    <div className="p-10 text-center text-black">Loading hotel details...</div>
  );
}
