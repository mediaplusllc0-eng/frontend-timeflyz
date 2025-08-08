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
import { useParams } from "next/navigation";
import { useGetBookingsQuery } from "../booking/services/bookingApi";

export default function ReservationPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [resendModal, setResendModal] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const { bookingId } = useParams();
  const { data, isLoading: bookingsLoading, refetch } = useGetBookingsQuery({});

  return (
    <>
      <Navbar isFixed={false} />
      <div className="flex flex-col lg:flex-row max-w-7xl bg-white mx-auto my-5 space-x-3">
        {/* Left Side - Scrollable */}
        <div className="w-full lg:w-1/2 overflow-y-auto h-[800px] pb-6 hide-scrollbar">
          <div className="p-4 md:p-6 border mb-6 rounded-lg">
            {/* Back Button and Title */}
            <div className="flex items-center mb-6">
              <Link href="#" className="text-gray-700 hover:text-gray-900">
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
                <span className="font-medium text-gray-500">OFS4562X</span>
              </div>
              <div className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <span className="bg-white rounded-full w-2 h-2 mr-2"></span>
                Confirmed
              </div>
            </div>

            {/* Hotel Image and Info */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <Image
                src="/img/hotel1.jpg?height=300&width=600"
                alt="Pullman Paris Centre Bercy"
                width={600}
                height={300}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex mb-1">
                  {[1, 2, 3, 4].map((star) => (
                    <span key={star} className="text-white">
                      ★
                    </span>
                  ))}
                </div>
                <h2 className="text-white text-xl font-semibold">
                  Pullman Paris Centre Bercy
                </h2>
              </div>
              <button className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-sm font-medium shadow-md text-black">
                Hotel page
              </button>
            </div>

            {/* Check-in/Check-out */}
            <div className="flex flex-col md:flex-row mb-6 border-b pb-6">
              <div className="w-full md:w-1/2 mb-4 md:mb-0 md:border-r pr-0 md:pr-4">
                <div className="text-gray-500 uppercase text-xs font-medium mb-1 tracking-widest">
                  Check-in
                </div>
                <div className="text-lg font-medium text-black">22 May</div>
                <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm mt-2">
                  10am
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <div className="text-gray-500 uppercase text-xs font-medium mb-1 tracking-widest">
                  Check-out
                </div>
                <div className="text-lg font-medium text-black">Same day</div>
                <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded-full text-sm mt-2">
                  5pm
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="flex items-center text-teal-500 text-sm mb-6 border-b border-gray-200 pb-6">
              <span>This reservation is cancellable for free.</span>
              <span className="ml-1 w-4 h-4 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">
                ?
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                className="w-full flex items-center justify-between p-4 border-b text-left"
                onClick={() => setShowEditModal(true)}
              >
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                  <span className="text-gray-500">Edit my booking date</span>
                </div>
                <ArrowLeft className="w-5 h-5 transform rotate-180 text-gray-500" />
              </button>

              <button
                className="w-full flex items-center justify-between p-4 border-b text-left"
                onClick={() => setShowCancelModal(true)}
              >
                <div className="flex items-center">
                  <X className="w-5 h-5 mr-3 text-gray-500" />
                  <span className="text-gray-500">Cancel the reservation</span>
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
          </div>
          {/* Booking Details */}
          <div className="mb-6 border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">BOOKING</h3>

            <div className="flex justify-between mb-2 text-gray-600">
              <span>Standard King Room</span>
              <span className="font-medium">AED 109</span>
            </div>

            <div className="flex justify-between items-end border-t pt-3 mb-2 text-gray-700">
              <div>
                <span className="font-medium ">Total</span>
                <div className="text-xs text-gray-500">VAT included</div>
              </div>
              <span className="font-medium">AED 109</span>
            </div>

            <div className="flex justify-between items-start pt-3 text-gray-700">
              <div>
                <div className="font-medium">To be paid at the hotel</div>
                <div className="text-xs text-teal-500">Free cancellation</div>
              </div>
              <span className="font-medium">AED 109</span>
            </div>
          </div>

          {/* Special Demands */}
          <div className="mb-6 border rounded-lg p-4">
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
          </div>
          {/* Resend Confirmation Button */}
          <button
            className="w-full bg-[#DAA520] rounded-full py-3 font-medium mb-6"
            onClick={() => setResendModal(true)}
          >
            Resend the confirmation
          </button>
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
                  1 Rue de Libourne, 75012 Paris, France
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
            onClose={() => setShowCancelModal(false)}
            bookingId={bookingId}
            refetchBookings={refetch}
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
