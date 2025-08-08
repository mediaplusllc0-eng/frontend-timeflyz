"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useCancelBookingMutation } from "@/app/booking/services/bookingApi";
import { useAppSelector } from "@/utils/hooks";
import { toast } from "react-toastify";

interface CancelReservationModalProps {
  bookingId: any;
  onClose: () => void;
  onConfirmCancel: () => void;
  refetchBookings: () => void;
}

export default function CancelReservationModal({
  bookingId,
  onClose,
  onConfirmCancel,
  refetchBookings,
}: CancelReservationModalProps) {
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const cancelReasons = [
    "I would like to change the date",
    "I chose another hotel",
    "I've had a problem with the hotel",
    "I've changed my mind",
    "I've made several bookings at the same time",
    "I've made a mistake in the booking",
    "Other",
  ];

  const [cancelBooking, { isLoading }] = useCancelBookingMutation();
  const cancelledBookings = useAppSelector(
    (state) => state.booking.cancelledBookings
  );

  const isCancelled = cancelledBookings?.includes(bookingId);
  const handleConfirmCancel = async () => {
    if (!reason) {
      toast.warning("Please select a reason for cancellation.");
      return;
    }

    try {
      await cancelBooking({
        bookingId,
        reason,
      }).unwrap();

      onClose();
      onConfirmCancel();
      refetchBookings();
    } catch (err: any) {
      console.error("Cancel booking error:", err);
      toast.error(err.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Cancel the reservation
          </h2>

          {/* Reason selection */}
          <div className="mb-6">
            <p className="font-medium mb-4 text-gray-800">
              Why do you want to cancel?
            </p>

            <div className="space-y-3">
              {cancelReasons.map((cancelReason) => (
                <label
                  key={cancelReason}
                  className="flex items-center text-gray-500"
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={cancelReason}
                    checked={reason === cancelReason}
                    onChange={() => setReason(cancelReason)}
                    className="mr-3 h-4 w-4"
                  />
                  <span>{cancelReason}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional information */}
          <div className="mb-6">
            <p className="font-medium mb-2 text-gray-800">
              Further information
            </p>
            <div className="relative">
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Tell us more!"
                className="w-full border border-gray-200 rounded-md p-3 h-24 resize-none text-gray-500 focus:outline-none"
                maxLength={300}
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {additionalInfo.length}/300
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <button
              className="w-full py-3 px-4 bg-[#DAA520] rounded-full font-medium text-white"
              onClick={handleConfirmCancel}
              disabled={isLoading}
            >
              {isLoading ? "Cancelling..." : "Confirm cancellation"}
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-gray-500 uppercase text-sm font-medium"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
