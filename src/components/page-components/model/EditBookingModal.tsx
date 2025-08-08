"use client";

import { X } from "lucide-react";

interface EditBookingModalProps {
  onClose: () => void;
}

export default function EditBookingModal({ onClose }: EditBookingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-sm relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold text-center mb-4 text-black">
            Edit my booking date
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mb-8">
            The change of your reservation date is likely to change the price of
            the offers proposed by the hotel.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-full font-medium text-gray-700"
            >
              Cancel
            </button>
            <button className="flex-1 py-3 px-4 bg-[#DAA520]  rounded-full font-medium text-gray-700">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
