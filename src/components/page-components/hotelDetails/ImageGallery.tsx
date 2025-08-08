"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ImageGallery = ({ hotel }: any) => {
  const images = hotel?.images?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[300px] md:h-[400px]">
      {/* First (Main) Image */}
      <div className="col-span-1 md:col-span-2 relative rounded-lg overflow-hidden">
        <Image
          src={images[0] || "/img/hotel-placeholder.jpg"}
          alt={hotel?.name || "Hotel"}
          fill
          className="object-cover"
        />
      </div>

      {/* Second and Third Images (only show on md and up) */}
      <div className="hidden md:grid grid-rows-2 gap-2">
        {images.slice(1, 3).map((img: string, i: number) => (
          <div key={i} className="relative rounded-lg overflow-hidden">
            <Image
              src={img || "/placeholder.svg"}
              alt={`Room ${i + 2}`}
              fill
              className="object-cover"
            />
            {/* Show "See photos" on the last image (i === 1 for 2nd in slice(1,3)) */}
            {i === 1 && (
              <Link
                href={`/hoteldetail/${hotel._id}/gallery`}
                className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 rounded-md px-4 py-2 text-sm font-medium shadow-md transition-colors duration-200"
              >
                See photos
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
