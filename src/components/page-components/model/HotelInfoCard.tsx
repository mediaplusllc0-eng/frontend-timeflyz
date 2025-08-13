// HotelInfoCard.tsx
import React from "react";
import { Star, StarHalf } from "lucide-react";
import Button from "@/components/ui/Button";

interface Hotel {
  id: number;
  hotelName: string;
  lat: number;
  lng: number;
  price: string;
  currency: string;
  total: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  hotelRating: number;
  reviews: number;
  thumbNailUrl: string;
  facilities: string[];
  slots: {
    startTime: string;
    endTime: string;
    price: number;
    _id: string;
    isAvailable: boolean;
  }[];
  times: string[];
  city: string;
  isFavorite: boolean;
}
function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex text-yellow-500 items-center gap-[1px]">
      {[...Array(full)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400" />
      ))}
      {half && <StarHalf key="half" className="w-4 h-4 fill-yellow-400" />}
      {[...Array(empty)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}

const HotelRating = ({ rating = 0 }) => {
  const totalStars = 5;

  // Round to nearest half for half-star logic (optional)
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className='flex items-center gap-1 text-[#6B6B6B] text-[12px] font-[400] mt-[7px]'>
      {[...Array(totalStars)].map((_, index) => {
        const currentStar = index + 1;

        return (
          <svg
            key={index}
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
              fill={
                currentStar <= roundedRating
                  ? "#4B4D4D"          // full star
                  : currentStar - 0.5 === roundedRating
                    ? "url(#half)"       // half star fill
                    : "#D1D5DB"          // empty star
              }
            />
            {/* Half star gradient */}
            {currentStar - 0.5 === roundedRating && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#4B4D4D" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
            )}
          </svg>
        );
      })}
      <span>Hotel</span>
    </div>
  );
};

export default function HotelInfoCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="w-[338px] overflow-hidden font-sans text-sm flex">
      {/* Image */}
      <div className="relative w-[106px]" >
        <img
          src={hotel?.thumbNailUrl}
          alt={hotel?.hotelName}
          className="w-[106px] h-[148px] object-cover rounded-[12px]"
        />
        {/* <div className="absolute top-2 left-2 bg-white text-blue-600 text-xs font-semibold px-2 py-1 rounded-full shadow">
          Pool access included
        </div>
        <div className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-80">
          {hotel.times?.[0] || "8am - 4pm"}
        </div> */}
      </div>

      {/* Content */}
      <div className="w-[calc(100%-106px)] px-[16px]">
        <div className="font-semibold text-base text-gray-700 truncate">{hotel?.hotelName?.length > 17 ? `${hotel?.hotelName?.slice(0, 17)}...` : hotel.hotelName}</div>
        <HotelRating rating={hotel?.hotelRating} />

        <div className='flex items-start gap-2 mt-[6px]'>
          <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
            {hotel?.facilities?.slice(0, 6)?.map((a, i) => i < 5 ? `${a}, ` : `${a}.`).join()?.length > 80 ? `${hotel?.facilities?.slice(0, 6)?.map((a, i) => i < 5 ? `${a}, ` : `${a}.`).join().slice(0, 80)}...` : hotel?.facilities?.slice(0, 6)?.map((a, i) => i < 5 ? `${a}, ` : `${a}.`)}
          </span>
        </div>

        <div className='flex items-start gap-2 mt-[10px]'>
          <span className='w-[29px] h-[17px] flex items-center justify-center rounded-[12px] bg-[#29AF52] text-[12px] text-[#ffffff] font-[600] '>{hotel?.hotelRating}</span>

          {/* <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                                    <b>Excellent</b> (19232 ratings)
                                                </span> */}
          <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
            <b>Ratings</b>
          </span>
        </div>

        <div className='w-full h-full flex justify-between mt-[10px]'>
          <div>
            <h3 className='text-[#4B4D4D] text-[16px] font-[700]'>{hotel?.currency} {hotel.total}</h3>
            <span className='text-[#6B6B6B] text-[12px] font-[400] mt-[-5px] inline-block '>per night</span>
          </div>
          <div className='w-auto text-right'>
            <Button fullWidth={false} className="rounded-[8px] h-[31px] w-[115px] text-[10px] px-[10px] py-[10px] flex items-center justify-center">Check Availability</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
