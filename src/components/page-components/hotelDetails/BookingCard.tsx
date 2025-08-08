"use client";
import { Grid2X2, Heart, Share, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderStars from "./RenderStars";

const BookingCard = ({
  hotel,
  toggleFavorite,
  saved,
}: {
  hotel: any;
  toggleFavorite: any;
  saved: boolean;
}) => {
  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {hotel?.name}
              </h1>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <RenderStars rating={hotel?.rating} />
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <Share className="w-5 h-5" />
                    <span className="ml-1 text-sm">Share</span>
                  </button>
                  <button
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    onClick={toggleFavorite}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${
                        saved ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={hotel.images?.[0] || "/img/hotel-placeholder.jpg"}
                alt="Hotel pool area"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <Link href={`/hoteldetail/${hotel._id}/gallery`}>
                <button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-md px-3 py-2 flex items-center gap-2 text-sm font-medium hover:bg-white transition-colors">
                  <Grid2X2 className="w-4 h-4" />
                  See photos
                </button>
              </Link>
            </div>

            {/*<div className="p-4">
             <div className="mb-4">
                <p className="text-sm text-gray-500">From</p>
                <p className="text-3xl font-bold text-gray-800">AED {109}</p>
              </div> 
             {
                <Link href="/booking">
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 px-4 rounded-full transition-colors">
                    Reserve a room
                  </button>
                </Link>
              }
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
