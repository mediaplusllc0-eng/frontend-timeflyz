"use client";

import { X } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

interface ConfirmCancelModalProps {
  onClose: () => void;
}

export default function ConfirmCancel({ onClose }: ConfirmCancelModalProps) {
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4">
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
          <div className="text-4xl font-bold text-[rgba(81,176,176,1)] flex justify-center mb-5">
            <FaCircleCheck />
          </div>

          {/* Message */}
          <p className="text-gray-600 text-center mb-8 text-xl">
            We confirm your booking has been cancelled.
          </p>
        </div>
      </div>
    </div>
  );
}
