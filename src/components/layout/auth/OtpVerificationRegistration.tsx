"use client";
import { useState, FormEvent, useEffect } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useResendOtpMutation, useVerifyOtpMutation } from "./authApi";
import { setAuthUser } from "./authSlice";
import { useAppDispatch } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { setProfile } from "@/app/profile/services/userSlice";
import { useGetProfileQuery } from "@/app/profile/services/userApi";

interface OtpVerificationProps {
  onClose: () => void;
  onVerify: () => void;
  otpFor: string;
  emailToVerify: { email: string; status: string };
  onRegisterSuccess?: () => void;
}

export default function OtpVerificationRegistration({
  onClose,
  onVerify,
  otpFor,
  emailToVerify,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string>("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [cooldown, setCooldown] = useState(0);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetProfileQuery({});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the full 6-digit OTP.");
      return;
    }

    try {
      const response = await verifyOtp({
        otp,
        otp_for: otpFor,
      }).unwrap();
      const { access_token, refresh_token, ...userData } = response.data;

      if (access_token && refresh_token && userData) {
        dispatch(
          setAuthUser({
            token: access_token,
            refreshToken: refresh_token,
            user: userData,
          })
        );
        localStorage.setItem("token", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        const profileRes = await refetchProfile();
        if (profileRes.data) {
          dispatch(setProfile(profileRes.data));
        }

        toast.success(response.message);
        onVerify?.();
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "OTP verification failed.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({
        email: emailToVerify.email,
        otp_for: otpFor,
      }).unwrap();
      toast.success(response?.message || "OTP resent successfully.");
      setCooldown(30); // 30s cooldown
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend OTP.");
    }
  };

  useEffect(() => {
    if (emailToVerify.status === "email_verification_pending") {
      handleResendOtp();
    }
  }, []);
  // Cooldown countdown effect
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

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

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm text-primary-600 hover:underline disabled:text-gray-400"
            onClick={handleResendOtp}
            disabled={isResending || cooldown > 0}
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>
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
