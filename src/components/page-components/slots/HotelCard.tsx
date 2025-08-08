"use client";
import { formatFriendlyTimeRange } from "@/utils/helper";
import { Star, Clock, Euro, Heart, StarHalf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Hotel {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  rating: number;
  reviews: number;
  slots: {
    startTime: string;
    endTime: string;
    price: number;
    _id: string;
    isAvailable: boolean;
  }[];
  place: string;
  images: string[];
  totalReviews: number;
  isFavorite: boolean;
}

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" className="w-4 h-4 fill-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}

export default function HotelCard({
  hotel,
  checkInDate,
  toggleFavorite,
  duration,
  checkOutDate,
  checkOutTime,
  checkInTime,
}: {
  hotel: Hotel;
  checkInDate: string;
  duration: any;
  checkOutDate: any;
  checkOutTime: any;
  checkInTime: any;
  toggleFavorite: (hotelId: any, isFavorited: boolean) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Flex changes based on screen size: vertical on mobile, horizontal on md+ */}
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 md:h-[200px] h-auto">
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            width={500}
            height={300}
            className="w-full h-[250px] object-cover"
          />
          <button
            onClick={() => toggleFavorite(hotel.id, hotel.isFavorite)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white"
          >
            <Heart
              size={18}
              className={`${
                hotel.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <Link
          href={`/hoteldetail/${hotel.id}?checkInDate=${checkInDate}&duration=${duration}&checkOutDate=${checkOutDate}&checkOutTime=${checkOutTime}&checkInTime=${checkInTime}`}
          className="w-full md:w-2/3 p-4 flex flex-col justify-between gap-4"
        >
          {/* Top Info */}
          <div>
            {hotel.discount && (
              <span className="bg-[#ff8200] text-white px-2 py-1 text-xs sm:text-sm rounded-full font-medium inline-block mb-2">
                {hotel.discount}% OFF
              </span>
            )}

            <div className="flex items-center gap-1 mb-1">
              {renderStars(hotel.rating)}
            </div>

            <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-1">
              {hotel.name}
            </h3>

            <span className="text-sm text-gray-500">
              {hotel.totalReviews} Reviews
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-600">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              Free cancellation
            </div>
            <div className="flex items-center gap-2">
              <Euro size={16} />
              Payment at the hotel
            </div>
          </div>

          {/* Price Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {hotel.originalPrice && (
              <span className="line-through text-xs bg-gray-800 text-white px-2 py-1 rounded-full w-fit">
                AED {hotel.originalPrice}
              </span>
            )}
            <span className="text-lg sm:text-lg font-bold text-gray-900">
              AED {hotel.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
