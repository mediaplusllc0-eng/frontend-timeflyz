"use client";
import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Header";
import Switch from "@/components/ui/Switch";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { useSearchParams } from "next/navigation";
import {
  useGetBookingsQuery,
  useMakeBookingMutation,
  useMakeGuestMutation,
} from "./services/bookingApi";
import moment from "moment";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Register from "@/components/layout/auth/Register";
import OtpVerificationRegistration from "@/components/layout/auth/OtpVerificationRegistration";
import ForgetPassword from "@/components/layout/auth/ForgetPassword";
import OtpVerification from "@/components/layout/auth/OtpVerification";
import ResetPassword from "@/components/layout/auth/ResetPassword";
import Login from "@/components/layout/auth/Login";
import { useForm } from "react-hook-form";
import Image from "next/image";
import OtpVerificationGuest from "@/components/layout/auth/OtpVerificationGuest";
import { setGuestData } from "./services/bookingSlice";

interface SelectedSlot {
  _id: string;
  hotelId: string;
  masterRoomName: string;
  startTime: string;
  endTime: string;
  price: number;
  images: string[];
}

interface GuestForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function BookingForm() {
  const dispatch = useAppDispatch();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isForgetModalOpen, setIsForgetModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [otpFor, setOtpFor] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [showRegisterOtpModal, setShowRegisterOtpModal] = useState(false);
  const [showGuestOtpModal, setShowGuestOtpModal] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState({ email: "", status: "" });
  const [isGuestVerified, setIsGuestVerified] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<GuestForm>();
  const formData = watch();

  const selectedSlot = useAppSelector(
    (state) => state.hotelDetails.selectedSlot
  ) as SelectedSlot | null;
  const profile = useAppSelector((state) => state.profile?.data?.data);
  const { data, refetch: refetchBookings } = useGetBookingsQuery({});
  const isAuthenticated = useAuth();

  const [open, setOpen] = useState("guest");
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const checkOutTime = searchParams.get("checkOutTime");
  const checkInTime = searchParams.get("checkInTime");
  const duration = searchParams.get("duration");
  const checkInDateTime = moment(
    `${checkInDate} ${checkInTime}`,
    "YYYY-MM-DD hh:mm:ss A"
  );
  const checkOutDateTime = moment(
    `${checkOutDate} ${checkOutTime}`,
    "YYYY-MM-DD hh:mm:ss A"
  );

  let checkInISO: string | null = null;
  let endISO: string | null = null;
  if (checkInDate && checkInTime) {
    const checkinMoment = moment(
      `${checkInDate} ${checkInTime}`,
      "YYYY-MM-DD hh:mm:ss A"
    );
    checkInISO = checkinMoment.toISOString();

    const endMoment = checkinMoment.clone().add(duration, "hours");
    endISO = endMoment.toISOString();
  }

  useEffect(() => {
    if (profile) {
      setOpen("personalize");
    } else {
      setOpen("guest");
    }
  }, [profile]);

  const [makeBooking, { isLoading }] = useMakeBookingMutation();
  const [makeGuest] = useMakeGuestMutation();

  const handleGuestVerification = async (formData: GuestForm) => {
    if (!isAuthenticated) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        toast.error("Please fill all guest information fields.");
        return;
      }

      const payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };

      try {
        const response = await makeGuest(payload).unwrap();

        if (response?.status === 200) {
          toast.success(response.message);
          setOtpFor("guest_email_verification");
          dispatch(setGuestData(response.data)); // Save in redux

          setShowGuestOtpModal(true);
        } else {
          toast.error(response.message);
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Verification check failed.");
      }
    } else {
      // If authenticated, proceed directly to personalization
      setOpen("personalize");
    }
  };

  const guestData = useAppSelector((state) => state.booking.guestData);
  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      toast.error("No room selected.");
      return;
    }

    const payload: any = {
      customerId: profile?._id || guestData?._id,
      hotelId: selectedSlot.hotelId,
      masterRoomId: selectedSlot._id,
      startTime: checkInISO,
      endTime: endISO,
      guests: 2,
      paymentType: "online",
    };

    try {
      const response = await makeBooking(payload).unwrap();

      if (
        response?.status === 200 ||
        response?.status === 201 ||
        response?.bookingId
      ) {
        toast.success(response?.message || "Booking successful.");
        refetchBookings();
        window.open(response?.data.checkoutLink, "_blank");
      } else {
        toast.error(response?.message || "Booking failed.");
      }
    } catch (err: any) {
      console.log("Booking error:", err);
      toast.error(err?.data?.message || "Booking failed.");
    }
  };

  return (
    <>
      <Navbar menuColor="light" isFixed={false} />
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* Header */}
        <div className="max-w-7xl mx-auto p-4 border-b">
          <button onClick={() => window.history.back()}>
            <button className="flex items-center text-gray-700 font-medium text-xl">
              <ChevronLeft className="mr-2" />
              Return to the hotel page
            </button>
          </button>
        </div>

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
          {/* Left Column - Scrollable */}
          <div className="md:w-2/3 p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
            {/* Identification Section */}
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <button
                disabled={isAuthenticated || isGuestVerified}
                onClick={() => setOpen(open === "guest" ? "" : "guest")}
                className="w-full flex items-center justify-between text-xl font-bold text-gray-700"
              >
                <h2 className="text-gray-700 text-xl font-bold">
                  IDENTIFICATION
                </h2>
                {isAuthenticated || isGuestVerified ? (
                  <div className="ml-2 bg-primary-100 rounded-full p-1">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                ) : (
                  <ChevronDown
                    className={`transition-transform ${
                      open === "guest" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {open === "guest" && (
                <form
                  className="pt-3 grid grid-cols-1 gap-4 md:grid-cols-2"
                  onSubmit={handleSubmit(handleGuestVerification)}
                >
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-3 text-sm"
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="mt-1 w-full  border border-gray-300 rounded-xl px-3 py-3 text-sm"
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-3 text-sm"
                      placeholder="Enter email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <input
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-3 text-sm"
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit">
                    {isLoading ? "Verifying..." : "Verify Guest"}
                  </Button>
                </form>
              )}
            </div>

            {/* Personalize Your Stay */}
            <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
              <button
                onClick={() =>
                  setOpen(open === "personalize" ? "" : "personalize")
                }
                className="w-full flex items-center justify-between text-xl font-bold text-gray-700"
              >
                <h2 className="text-gray-700 text-xl font-bold">
                  PERSONALIZATION
                </h2>
                <ChevronDown
                  className={`transition-transform ${
                    open === "personalize" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === "personalize" && (
                <div className="pt-3">
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-2">
                      Together, let's encourage flexibility!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Timeflyz offers unique flexibility regarding last-minute
                      cancellations.
                    </p>
                    <p className="text-gray-600">
                      Failing to show up at the hotel without canceling your
                      reservation harms our partners and jeopardizes this
                      benefit. Cancel your reservation if you cannot make it.
                      This allows us to keep this option available.
                    </p>
                  </div>

                  <div className="p-4 space-y-4">
                    <label className="flex items-start space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        By checking this box, I acknowledge that I have read and
                        agree to the{" "}
                        <Link
                          href="/TermsandConditions"
                          className="text-blue-600 underline"
                        >
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/PrivacyPolicy"
                          className="text-blue-600 underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>

                    <Button
                      disabled={!agreed || isLoading}
                      onClick={handleConfirmBooking}
                    >
                      {isLoading ? "Confirming..." : "Confirm my booking"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="md:w-1/3 p-4 flex-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-3xl p-6 mt-5">
                {/* Hotel Info */}
                <div className="flex mb-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden mr-3">
                    <Image
                      src={selectedSlot?.images[0] || ""}
                      alt={selectedSlot?.masterRoomName || ""}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <span key={star} className="text-gray-800">
                          ★
                        </span>
                      ))}
                    </div>
                    <h3 className="font-medium">
                      {selectedSlot?.masterRoomName}
                    </h3>
                  </div>
                </div>

                {/* Check-in/Check-out */}
                <div className="flex border-t py-4">
                  <div className="w-1/2 border-r pr-2">
                    <div className="text-gray-500 text-sm">CHECK-IN</div>
                    <div>{checkInDateTime.format("D MMM")}</div>
                    <div className="bg-gray-800 text-white text-xs rounded-full px-3 py-1 inline-block mt-1">
                      {checkInDateTime.format("h:mm A")}
                    </div>
                  </div>
                  <div className="w-1/2 pl-2">
                    <div className="text-gray-500 text-sm">CHECK-OUT</div>
                    <div>{checkOutDateTime.format("D MMM")}</div>
                    <div className="bg-gray-800 text-white text-xs rounded-full px-3 py-1 inline-block mt-1">
                      {checkOutDateTime.format("h:mm A")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 mt-5">
                {/* Room Info */}
                <div className="mb-4 border-b pb-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold text-md">
                      Cosy Double Room + SPA Access
                    </h3>
                    <div className="font-medium">AED {selectedSlot?.price}</div>
                  </div>

                  <div className="flex justify-between text-sm mt-3 text-[#54545d99] font-medium">
                    <div>Pool access included</div>
                    <div>Included</div>
                  </div>
                </div>

                {/* Total */}
                <div className=" pt-4">
                  <div className="flex justify-between mb-1">
                    <div className="font-medium">Total</div>
                    <div className="font-medium">AED {selectedSlot?.price}</div>
                  </div>
                  <div className="text-xs text-gray-500">TVA incluse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest OTP Verification Modal */}
      <Modal
        isOpen={showGuestOtpModal}
        onClose={() => setShowGuestOtpModal(false)}
      >
        <OtpVerificationGuest
          otpFor={otpFor}
          emailToVerify={emailToVerify}
          onVerify={() => {
            setShowGuestOtpModal(false);
            setIsGuestVerified(true);
            setOpen("personalize"); // Open personalization after verification
          }}
          onClose={() => setShowGuestOtpModal(false)}
          setIsGuestVerified={setIsGuestVerified}
        />
      </Modal>

      {/* Other modals remain the same */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <Login
          onRegisterClick={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
          onForgotPassword={() => {
            setIsLoginModalOpen(false);
            setIsForgetModalOpen(true);
          }}
          onLoginSuccess={() => {
            setIsLoginModalOpen(false);
            setIsLoggedIn(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <Register
          onLoginClick={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
          onVerifyClick={() => {
            setShowRegisterOtpModal(true);
          }}
          setEmailToVerify={setEmailToVerify}
          setOtpFor={setOtpFor}
        />
      </Modal>

      <Modal
        isOpen={showRegisterOtpModal}
        onClose={() => setShowRegisterOtpModal(false)}
      >
        <OtpVerificationRegistration
          otpFor={otpFor}
          emailToVerify={emailToVerify}
          onVerify={() => {
            setShowRegisterOtpModal(false);
          }}
          onClose={() => setShowRegisterOtpModal(false)}
        />
      </Modal>

      <Modal
        isOpen={isForgetModalOpen}
        onClose={() => setIsForgetModalOpen(false)}
      >
        <ForgetPassword
          onClose={() => setIsForgetModalOpen(false)}
          onSend={(email, phone) => {
            setUserEmail(email);
            setUserPhone(phone);
            setOtpFor("password_reset");
            setIsForgetModalOpen(false);
            setIsOtpModalOpen(true);
          }}
        />
      </Modal>

      <Modal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)}>
        <OtpVerification
          onClose={() => setIsOtpModalOpen(false)}
          onVerify={() => {
            setIsOtpModalOpen(false);
            setIsResetModalOpen(true);
          }}
          otpFor={otpFor}
          setResetPasswordToken={setResetPasswordToken}
        />
      </Modal>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      >
        <ResetPassword
          onClose={() => setIsResetModalOpen(false)}
          onSuccess={() => {
            setIsResetModalOpen(false);
            setIsLoginModalOpen(true);
          }}
          resetPasswordToken={resetPasswordToken}
          email={userEmail}
        />
      </Modal>
    </>
  );
}
