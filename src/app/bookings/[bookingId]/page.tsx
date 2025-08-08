"use client";

import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EditBookingModal from "@/components/page-components/model/EditBookingModal";
import CancelReservationModal from "@/components/page-components/model/CancelReservationModal";
import ResendConfirmationModal from "@/components/page-components/model/ResendConfirmationModal";
import ConfirmCancel from "@/components/page-components/model/ConfirmCancel";
import {
  useGetBookingDetailQuery,
  useGetBookingsQuery,
} from "@/app/booking/services/bookingApi";
import { useParams, useSearchParams } from "next/navigation";
import moment from "moment";
import RenderStars from "@/components/page-components/hotelDetails/RenderStars";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

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
export default function ReservationPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [resendModal, setResendModal] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const { bookingId } = useParams();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const isAuthenticated = useAuth();

  const { data: bookingData, isLoading } = useGetBookingDetailQuery({
    bookingId: bookingId,
    ...(isAuthenticated ? {} : { email }),
  });

  const { refetch } = useGetBookingsQuery({});

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Navbar isFixed={false} />
      <div className="flex flex-col lg:flex-row max-w-7xl bg-white mx-auto my-5 space-x-3">
        {/* Left Side - Scrollable */}
        <div className="w-full lg:w-1/2 overflow-y-auto h-[800px] pb-6 hide-scrollbar">
          <div className="p-4 md:p-6 border mb-6 rounded-lg">
            {/* Back Button and Title */}
            <div className="flex items-center mb-6">
              <Link
                href="/bookings"
                className="text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>

              <h1 className="text-2xl font-semibold ml-4 text-gray-800">
                My reservation
              </h1>
            </div>

            {/* Reservation Number and Status */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <span className="text-gray-500">Reservation No.</span>{" "}
                <span className="font-bold text-gray-500">
                  {bookingData.data.referenceId}
                </span>
              </div>
              {getBookingStatusBadge(bookingData.data.bookingStatus)}
            </div>

            {/* Hotel Image and Info */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <Image
                src={bookingData?.data?.masterRoomId?.images[0]}
                alt="Pullman Paris Centre Bercy"
                width={600}
                height={300}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex mb-1">
                  <RenderStars rating={bookingData.data.hotelId.rating} />
                </div>
                <h2 className="text-white text-xl font-semibold">
                  {bookingData.data.hotelId.name}
                </h2>
              </div>
              <Link
                href={`/hoteldetail/${bookingData.data.hotelId._id}`}
                className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-medium shadow-md text-black"
              >
                Hotel page
              </Link>
            </div>

            {/* Check-in/Check-out */}
            <div className="flex flex-col md:flex-row mb-6 ">
              <div className="w-full md:w-1/2 mb-4 md:mb-0 md:border-r pr-0 md:pr-4">
                <div className="text-gray-500 uppercase text-xs font-medium mb-1 tracking-widest">
                  Check-in
                </div>
                <div className="text-lg font-medium text-black">
                  {" "}
                  <div>
                    {moment(bookingData.data.startTime).format("D MMM")}
                  </div>
                </div>
                <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm mt-2">
                  {moment(bookingData.data.startTime).format("h:mm a")}
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <div className="text-gray-500 uppercase text-xs font-medium mb-1 tracking-widest">
                  Check-out
                </div>
                <div className="text-lg font-medium text-black">
                  {" "}
                  {moment(bookingData.data.endTime).format("D MMM")}
                </div>
                <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm mt-2">
                  {moment(bookingData.data.endTime).format("h:mm a")}
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            {/* <div className="flex items-center text-teal-500 text-sm mb-6 border-b border-gray-200 pb-6">
              <span>This reservation is cancellable for free.</span>
              <span className="ml-1 w-4 h-4 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">
                ?
              </span>
            </div> */}

            {/* Action Buttons */}
            {!bookingData.data.cancellationRequest.requested ? (
              <>
                <div className="space-y-4 mt-12 border-t">
                  {/* <button
                    className="w-full flex items-center justify-between p-4 mb-0 border-b text-left"
                    onClick={() => setShowEditModal(true)}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="text-gray-500">
                        Edit my booking date
                      </span>
                    </div>
                    <ArrowLeft className="w-5 h-5 transform rotate-180 text-gray-500" />
                  </button> */}

                  <button
                    className="w-full flex items-center justify-between p-4 border-b text-left"
                    onClick={() => setShowCancelModal(true)}
                  >
                    <div className="flex items-center">
                      <X className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="text-gray-500">
                        Cancel the reservation
                      </span>
                    </div>
                    <ArrowLeft className="w-5 h-5 transform rotate-180 text-gray-500" />
                  </button>
                </div>

                {/* Share Reservation */}
                <div className="mt-6 border rounded-lg ">
                  <div className="relative">
                    <Image
                      src="/img/share-reservation.png"
                      alt="Share illustration"
                      width={100}
                      height={100}
                      className="w-[700px]"
                    />
                  </div>
                </div>
              </>
            ) : (
              <button className="w-full flex items-center justify-between p-4 border-b border-t text-left">
                <div className="flex items-center">
                  <span className="text-gray-500">
                    {bookingData.data.cancellationRequest.status}{" "}
                    {bookingData.data.cancellationRequest.message}
                  </span>
                </div>
              </button>
            )}
          </div>
          {/* Booking Details */}
          <div className="mb-6 border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">BOOKING</h3>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>{bookingData.data.masterRoomId?.masterRoomName}</span>
              <span className="font-medium">{bookingData.data.totalPrice}</span>
            </div>

            <div className="flex justify-between items-end border-t pt-3 mb-2 text-gray-700">
              <div>
                <span className="font-medium ">Total</span>
                <div className="text-xs text-gray-500">VAT included</div>
              </div>
              <span className="font-medium">{bookingData.data.totalPrice}</span>
            </div>

            <div className="flex justify-between items-start pt-3 text-gray-700">
              <div>
                <div className="font-medium">To be paid at the hotel</div>
                <div className="text-xs text-teal-500">Free cancellation</div>
              </div>
              <span className="font-medium">{bookingData.data.totalPrice}</span>
            </div>
          </div>

          {/* Special Demands */}

          {/* <div className="mb-6 border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
              SPECIAL DEMANDS
            </h3>

            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-medium text-gray-800">
                  Arriving time:{" "}
                </span>
                <span className="text-gray-400">11:00</span>
              </div>
              <button className="border rounded-full px-4 py-1 text-sm text-black">
                Edit
              </button>
            </div>

            <div>
              <div className="font-medium mb-1 text-black">
                Special request sent to the hotel:
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Room: </span>
                <span>I would like a room with a high floor</span>
              </div>
            </div>
          </div> */}

          {/* Resend Confirmation Button */}
          {bookingData.data.bookingStatus != "cancelled" && (
            <Button
              variant="solid"
              theme="primary"
              onClick={() => setResendModal(true)}
            >
              Resend the confirmation
            </Button>
          )}
        </div>

        {/* Right Side - Map */}
        <div className="w-full lg:w-1/2 h-[200px] lg:h-[400px] relative bg-white shadow-md rounded-lg">
          <div className="h-[300px] w-full bg-gray-200">
            <Image src="/img/map.png" alt="Map" fill className="object-cover" />
          </div>

          {/* Address Information */}
          <div className="absolute bottom-0 left-0 right-0 bg-white p-4 md:p-6 space-y-1">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
              <div className="ml-3">
                <Link
                  href="#"
                  className="text-gray-800 hover:underline font-medium"
                >
                  {bookingData.data.hotelId.address}
                </Link>
                <div className="text-gray-600 text-sm">75012, Paris 12</div>
              </div>
            </div>
            <div className="flex items-center ml-4">
              <Link
                href="tel:0176360695"
                className="ml-4 text-gray-700 hover:underline text-sm"
              >
                01 76 36 06 95
              </Link>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showEditModal && (
          <EditBookingModal onClose={() => setShowEditModal(false)} />
        )}
        {showCancelModal && (
          <CancelReservationModal
            bookingId={bookingId}
            refetchBookings={refetch}
            onClose={() => setShowCancelModal(false)}
            onConfirmCancel={() => {
              setShowCancelModal(false);
              setShowConfirmCancel(true);
            }}
          />
        )}
        {resendModal && (
          <ResendConfirmationModal onClose={() => setResendModal(false)} />
        )}
        {showConfirmCancel && (
          <ConfirmCancel onClose={() => setShowConfirmCancel(false)} />
        )}
      </div>
      <Footer />
    </>
  );
}
