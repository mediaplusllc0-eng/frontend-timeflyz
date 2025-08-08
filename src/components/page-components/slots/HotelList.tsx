"use client";
import HotelCard from "./HotelCard";

interface Hotel {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  rating: number;
  reviews: number;
  times: string[];
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

interface HotelListProps {
  hotels: Hotel[];
  checkInDate: any;
  duration: any;
  toggleFavorite: (hotelId: any, isFavorited: boolean) => void;
  checkOutDate: any;
  checkOutTime: any;
  checkInTime: any;
}

export default function HotelList({
  hotels,
  checkInDate,
  toggleFavorite,
  duration,
  checkOutDate,
  checkOutTime,
  checkInTime,
}: HotelListProps) {
  return (
    <div className="space-y-4">
      {hotels?.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          duration={duration}
          checkInDate={checkInDate}
          toggleFavorite={toggleFavorite}
          checkOutDate={checkOutDate}
          checkOutTime={checkOutTime}
          checkInTime={checkInTime}
        />
      ))}
    </div>
  );
}
