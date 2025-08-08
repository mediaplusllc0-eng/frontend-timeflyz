"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Image from "next/image";
import FavoritesLayout from "@/components/ui/Layout";
import { useGetBookingsQuery } from "../booking/services/bookingApi";
import { formatFriendlyTimeRange } from "@/utils/helper";
import moment from "moment";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const getBookingStatusBadge = (status: string) => {
  const statusMap: Record<string, { bgColor: string; textColor: string }> = {
    pending: { bgColor: "bg-[#DAA520]", textColor: "text-white" },
    confirmed: { bgColor: "bg-teal-500", textColor: "text-white" },
    cancelled: { bgColor: "bg-gray-500", textColor: "text-white" },
    completed: { bgColor: "bg-green-600", textColor: "text-white" },
    failed: { bgColor: "bg-red-600", textColor: "text-white" },
  };

  const { bgColor, textColor } = statusMap[status] || {
    bgColor: "bg-gray-300",
    textColor: "text-black",
  };

  return (
    <div
      className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-sm flex items-center`}
    >
      <span className="bg-white rounded-full w-2 h-2 mr-2"></span>
      {status}
    </div>
  );
};

export default function BookingList() {
  const [page, setPage] = useState(1);
  const [bookings, setBookings] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading, isFetching } = useGetBookingsQuery({
    page,
    limit: 10,
  });
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (data?.data) {
      setBookings((prev) => [...prev, ...data.data]);
      setHasMore(data.pagination.hasMore);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <FavoritesLayout>
      <div className="flex flex-col max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-black">My Bookings</h1>

        {bookings?.length === 0 && (
          <p className="text-gray-500">No bookings found.</p>
        )}

        {bookings?.map((booking: any) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row items-stretch sm:items-center my-4"
          >
            <div className="w-full sm:w-48 h-48 relative">
              <Image
                src={booking?.masterRoomId?.images[0]}
                alt={booking.hotelName || "Hotel"}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none"
              />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking?.masterRoomId?.masterRoomName}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <span className="mr-2">{`★ ${booking?.hotelId?.rating}`}</span>
                  <span>{booking?.hotelId?.address}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {`${moment(booking?.startTime).format(
                    "DD MMM"
                  )} ${formatFriendlyTimeRange(
                    booking?.startTime,
                    booking?.endTime
                  )}`}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                {getBookingStatusBadge(booking.bookingStatus)}
                <div className="flex gap-2">
                  <Link
                    href={`/bookings/${booking._id}`}
                    className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-full"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {hasMore && (
          <div ref={ref} className="text-center py-6 text-gray-500">
            Loading more reviews...
          </div>
        )}
      </div>
    </FavoritesLayout>
  );
}
