"use client";
import { useGetHotelReviewsQuery } from "@/app/hoteldetail/[hotelid]/services/hotelDetailsApi";
import { CircleSmall, Star } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineRestaurant } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import { TbCreditCardPay } from "react-icons/tb";
import { useInView } from "react-intersection-observer";

const LeftInformation = ({ hotel }: { hotel: any }) => {
  const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: hotelReviews,
    isLoading,
    isFetching,
  } = useGetHotelReviewsQuery({ page, limit: 6 });

  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (hotelReviews?.data) {
      setReviews((prev) => [...prev, ...hotelReviews.data]);
      setHasMore(hotelReviews.pagination.hasMore);
    }
  }, [hotelReviews]);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);
  const Progress = ({
    value = 0,
    className = "",
  }: {
    value?: number;
    className?: string;
  }) => (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-100",
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  if (isLoading) {
    return <div className="p-10 text-center">Loading hotel details...</div>;
  }
  return (
    <>
      {/* Specific Conditions Section */}
      <section className="border-b border-gray-200 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 ">
          SPECIFIC CONDITIONS
        </h2>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="mx-5">
              <TbCreditCardPay className="text-[#6e69ac] text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-800">Payment information</h3>
          </div>
          <div className="ml-0 pb-10">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 ">
                <div className="mx-5">
                  <RxDotFilled className="text-2xl" />
                </div>
                <span className="text-gray-700">
                  Cash payment accepted at this hotel
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="border-b border-gray-200 pt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 ">DESCRIPTION</h2>
        <p
          className="text-gray-700 leading-relaxed pb-10 editor-html"
          dangerouslySetInnerHTML={{ __html: hotel.description }}
        />
      </section>

      {/* Amenities Section */}
      <section className="border-b border-gray-200 pt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-5 ">AMENITIES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotel.amenitiesDetails.map((amenity: any, index: number) => (
            <div className="flex items-center gap-3 pb-2" key={index}>
              <div className="text-gray-500 text-base">
                <CircleSmall size={15} />{" "}
              </div>
              <span className="text-gray-700 text-base font-normal">
                {amenity.name}
              </span>
            </div>
          ))}
        </div>

        {/* <div className="mt-6 mb-10">
          <button className="border border-gray-300 rounded-full px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            More information
          </button>
        </div> */}
      </section>

      {/* Reviews Section */}
      <section className="pt-4">
        <div className="space-y-6">
          {/* Ratings header */}
          <div className="flex items-center gap-2">
              <Star size={30} stroke="none" fill="#ed4b22" />
            <span className="text-xl font-semibold">
              {hotelReviews.stats.averageRating}/5
            </span>
            {hotel.totalReviews && (
              <span className="text-gray-500">
                Total {hotel.totalReviews} reviews
              </span>
            )}
          </div>

          {/* All ratings in single column */}
          <div className="space-y-3 max-w-xl">
            {hotelReviews.stats.ratingDistribution.map(
              (rating: any, index: number) => (
                <div key={index} className="flex items-center gap-6">
                  <span className="text-gray-700">
                    {rating.rating ? rating.rating : ""}
                  </span>
                  <Progress value={rating.count} className="flex-1 h-2" />
                  <span className="text-gray-700 w-20">{rating.count}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Reviews list */}
        <div className="mt-8 space-y-8">
          {reviews.map((review: any) => (
            <div key={review.id} className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
                  <Image
                    src={review.customerId.profilePic}
                    alt={review.customerId.name}
                    width={100}
                    height={100}
                    className="border border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.customerId.name}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {moment(review.createdAt).format("Do MMM YYYY h:mma")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        {review.ratingText}
                      </span>
                      <span className="font-bold border border-gray-300 flex items-center gap-1 text-xs py-1 px-3 rounded-full">{review.rating} <Star size={14} stroke="none" fill="#ed4b22"/></span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 text-sm">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div ref={ref} className="text-center py-6 text-gray-500">
            Loading more reviews...
          </div>
        )}
      </section>
    </>
  );
};

export default LeftInformation;
