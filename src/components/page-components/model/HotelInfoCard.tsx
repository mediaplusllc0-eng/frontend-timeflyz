// HotelInfoCard.tsx
import React from "react";
import { Star, StarHalf } from "lucide-react";
import Button from "@/components/ui/Button";

interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  rating: number;
  reviews: number;
  images: string[];
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

export default function HotelInfoCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="w-[338px] overflow-hidden font-sans text-sm flex">
      {/* Image */}
      <div className="relative w-[106px]" >
        <img
          src={hotel.images[0]}
          alt={hotel.name}
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
        <div className="font-semibold text-base text-gray-700 truncate">{hotel.name?.length > 17 ? `${hotel.name?.slice(0, 17)}...` : hotel.name}</div>
        <div className='flex items-center gap-2 text-[#6B6B6B] text-[12px] font-[400] mt-[7px] '>
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="16" viewBox="0 0 96 16" fill="none">
            <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#4B4D4D" />
            <path d="M48 0L49.7961 5.52786H55.6085L50.9062 8.94427L52.7023 14.4721L48 11.0557L43.2977 14.4721L45.0938 8.94427L40.3915 5.52786H46.2039L48 0Z" fill="#4B4D4D" />
            <path d="M28 0L29.7961 5.52786H35.6085L30.9062 8.94427L32.7023 14.4721L28 11.0557L23.2977 14.4721L25.0938 8.94427L20.3915 5.52786H26.2039L28 0Z" fill="#4B4D4D" />
            <path d="M68 0L69.7961 5.52786H75.6085L70.9062 8.94427L72.7023 14.4721L68 11.0557L63.2977 14.4721L65.0938 8.94427L60.3915 5.52786H66.2039L68 0Z" fill="#4B4D4D" />
            <path d="M88 0L89.7961 5.52786H95.6085L90.9062 8.94427L92.7023 14.4721L88 11.0557L83.2977 14.4721L85.0938 8.94427L80.3915 5.52786H86.2039L88 0Z" fill="#4B4D4D" />
          </svg>
          Hotel
        </div>

        <div className='flex items-start gap-2 mt-[6px]'>
          <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
            Adult only beach front escape
          </span>
        </div>

        <div className='flex items-start gap-2 mt-[10px]'>
          <span className='w-[29px] h-[17px] flex items-center justify-center rounded-[12px] bg-[#29AF52] text-[12px] text-[#ffffff] font-[600] '>8.7</span>

          <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
            <b>Excellent</b> (19232 ratings)
          </span>
        </div>

        <div className='w-full h-full flex justify-between mt-[10px]'>
          <div>
            <h3 className='text-[#4B4D4D] text-[16px] font-[700]'>AED {hotel.price}</h3>
            <span className='text-[#6B6B6B] text-[12px] font-[400] mt-[-5px] inline-block '>for 3 hours</span>
          </div>
          <div className='w-auto text-right'>
            <Button fullWidth={false} className="rounded-[8px] h-[31px] w-[115px] text-[10px] px-[10px] py-[10px] flex items-center justify-center">Check Availability</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
