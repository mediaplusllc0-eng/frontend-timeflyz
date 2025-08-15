"use client";

import Link from "next/link";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { setCurrentPage, setSelectedCountry } from "./Services/hotelsSlice";
import { useGetAllHotelsQuery } from "./Services/hotelsApi";
import NextImage from "next/image";
import Button from "@/components/ui/Button";

interface NextImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  email: string;
  contactNumber: string;
  images: string[];
  state: string;
  price: number;
  slots: {
    startTime: string;
    endTime: string;
    price: number;
    _id: string;
    isAvailable: boolean;
  }[];
  rating?: number;
}

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden flex flex-col h-full w-full md:w-[24%]">
    <div className="relative h-52 w-full bg-gray-200" />
    <div className="flex flex-col justify-between p-5 gap-4 flex-1">
      <div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </div>
);

export default function Hotels() {
  const dispatch = useAppDispatch();
  const { selectedCountry, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.hotels
  );
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const { data, isLoading, isFetching } = useGetAllHotelsQuery({
    city: selectedCountry,
    checkInDate: selectedDate.toISOString().split("T")[0],
    limit: itemsPerPage,
    page: currentPage,
  });

  const countries = ["dubai", "sydney", "sharjah", "melbourne"];

  const hotels: Hotel[] = data?.data || [];
  const totalCount: number = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const Image = ({ className, ...rest }: NextImageProps) => (
    <div className="relative w-full h-full">
      <NextImage {...rest} fill className={`object-cover ${className || ""}`} />
    </div>
  );

  return (
    <section className="md:px-[30px] px-5 md:pt-0 pt-0 pb-[30px] md:pb-[80px]">
      <h5 className="text-center md:text-left text-[16px] text-[#4B4D4D] font-[400]">Hotels and destinations</h5>
      <h2 className="text-center md:text-left text-[28px] md:text-[55px] font-[700] text-[#4B4D4D] mb-[26px] tracking-normal">
        Anytime, Anywhere
      </h2>

      {/* Location Filters */}
      <div className="rounded-full text-base font-semibold transition">
        <div className="flex flex-wrap mb-6 md:space-x-4 justify-between md:justify-start">
          {countries.map((country) => (
            <button
              key={country}
              className={`w-[48%] md:w-auto capitalize px-5 py-2 rounded-full text-base font-[500] transition md:my-0 my-2 ${selectedCountry === country
                ? "bg-[#F1F1F1] text-[#EF4A23] border-[1px]"
                : "bg-[#F1F1F1] text-gray-70 border-[1px] border-[transparent] hover:bg-[#F1F1F1] hover:text-[#EF4A23] hover:border-[1px] hover:border-[#EF4A23]"
                }`}
              onClick={() => dispatch(setSelectedCountry(country))}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards or Skeleton */}
      <div className="container max-w-[100%] flex items-center flex-wrap gap-[18px] mt-[28px]">
        {isLoading || isFetching ? (
          Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Link className="md:w-[24%] w-full md:border-0 border-b-1 mb-5 pb-5 md:pb-0 md:mb-0 border-[lightgrey]" href={`/hoteldetail/${hotel.id}`} key={hotel.id}>
              <div className="w-full bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                <div className="relative w-full overflow-hidden">
                  <img
                    src={hotel?.images[0]}
                    alt={"abc"}
                    className="h-[200px] md:h-[164px] w-full rounded-[20px] object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between pt-[15px] flex-1">
                  <div className="">
                    <span className="text-[20px] font-semibold text-[#4B4D4D]">
                      ★★★★★
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[16px] text-[#4B4D4D] font-[700] mt-[5px]">
                      {hotel?.name}
                    </h3>
                    <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[5px]">
                      {hotel?.state}
                    </p>
                  </div>

                  <div className="text-sm mt-[5px]">
                    <div>
                      <span className="text-[12px] text-[#6B6B6B] font-[400]">
                        Per hour
                      </span>{" "}
                      <span className="ml-2 text-[20px] text-[#4B4D4D] font-[700]">AED {hotel?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

            </Link>
          ))
        ) : (
          <>
            No Result Found
          </>
        )}

      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded ${currentPage === idx + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <Link
          href={`/hotel-listings?city=${selectedCountry}&checkInDate=${selectedDate.toISOString().split("T")[0]
            }`}
        >
          <Button fullWidth={false} className="text-md capitalize w-[191px] h-[60px] rounded-[12px]">
            See more hotels
          </Button>
        </Link>
      </div>
    </section>
  );
}
