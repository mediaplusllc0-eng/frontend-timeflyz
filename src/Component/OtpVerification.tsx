"use client";
import { useState } from "react";

export default function OtpVerification({
  onClose,
  onVerify,
}: {
  onClose: () => void;
  onVerify: () => void;
}) {
  const [otp, setOtp] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Verify OTP
    onVerify();
  };
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gold">
        OTP Verification
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border rounded px-4 py-2 mb-4"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="flex justify-between gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-gold text-white font-semibold hover:bg-gold-dark transition"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
}
