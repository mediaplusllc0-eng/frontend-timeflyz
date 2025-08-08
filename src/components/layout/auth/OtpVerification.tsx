"use client";
import api from "@/utils/api";
import { useState, FormEvent } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useVerifyOtpMutation } from "./authApi";

interface OtpVerificationProps {
  onClose: () => void;
  onVerify: () => void;
  otpFor: string;
  setResetPasswordToken: React.Dispatch<React.SetStateAction<string>>;
  
}

export default function OtpVerification({
  onClose,
  onVerify,
  otpFor,
  setResetPasswordToken,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string>("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the full 6-digit OTP.");
      return;
    }

    try {
      const response = await verifyOtp({ otp, otp_for: otpFor }).unwrap();

      // Set response-based message
      if (response?.status === 200) {
        toast.success(response?.message || "OTP verified successfully!");
        setResetPasswordToken(response?.data?.token);
        onVerify();
      } else {
        toast.info(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "OTP verification failed.");
    }
  };
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        OTP Verification
      </h2>
      <form onSubmit={handleSubmit}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="tel"
          shouldAutoFocus
          containerStyle="flex justify-between gap-2"
          inputStyle={{
            width: "40px",
            height: "50px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "18px",
            color: "#000",
            textAlign: "center",
          }}
          renderInput={(props) => <input {...props} />}
        />

        <div className="mt-6">
          {/* <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[rgb(212,175,55,1)] text-white font-semibold w-full"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
}
