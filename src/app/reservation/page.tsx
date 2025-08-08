"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaSearch } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Modal from "@/components/ui/Modal";
import Login from "@/components/layout/auth/Login";
import Register from "@/components/layout/auth/Register";
import ForgetPassword from "@/components/layout/auth/ForgetPassword";
import OtpVerification from "@/components/layout/auth/OtpVerification";
import ResetPassword from "@/components/layout/auth/ResetPassword";
import OtpVerificationRegistration from "@/components/layout/auth/OtpVerificationRegistration";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function ReservationPage() {
  const [method, setMethod] = useState("email");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isForgetModalOpen, setIsForgetModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [otpFor, setOtpFor] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [emailToVerify, setEmailToVerify] = useState({ email: "", status: "" });
  const [showRegisterOtpModal, setShowRegisterOtpModal] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();
    if (method === "email") {
      query.set("email", email);
    } else {
      query.set("phone", phone);
    }

    router.push(`/bookings/${bookingId}?${query.toString()}`);
  };
  return (
    <div className="min-h-screen bg-white">
      <Navbar menuColor="dark" isFixed={false} />
      <main className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: "url(/img/reservation-img.jpg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-4xl font-bold mb-3 ">
              Your Reservation
            </h1>
            <p className="text-lg opacity-90">
              Access and manage your booking details
            </p>
          </div>
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
        >
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-3  text-gray-800">
                Access your reservation
              </h2>
              <p className="text-base text-gray-600">
                Cancel or amend your booking details in a few clicks
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Booking reference"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none text-gray-500"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">
                  Verify with:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setMethod("email")}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg border ${
                      method === "email"
                        ? "border-primary-500 bg-primary-50 text-primary-500"
                        : "border-gray-300 hover:border-gold/50 text-gray-500"
                    } transition-all duration-300`}
                  >
                    <FaEnvelope
                      className={
                        method === "email" ? "text-gold" : "text-gray-400"
                      }
                    />
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("phone")}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg border ${
                      method === "phone"
                        ? "border-primary-500 bg-primary-50 text-primary-500"
                        : "border-gray-300 hover:border-gold/50 text-gray-500"
                    } transition-all duration-300`}
                  >
                    <IoCall
                      className={
                        method === "phone" ? "text-gold" : "text-gray-400"
                      }
                    />
                    <span>Phone</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  type={method === "email" ? "email" : "tel"}
                  placeholder={
                    method === "email" ? "name@example.com" : "Phone number"
                  }
                  value={method === "email" ? email : phone}
                  onChange={(e) =>
                    method === "email"
                      ? setEmail(e.target.value)
                      : setPhone(e.target.value)
                  }
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none text-gray-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
              >
                Show my reservation
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-primary-500 font-medium hover:underline transition-all duration-300"
              >
                Login to your account
              </button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />

      {/* Login Modal */}
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
          onLoginSuccess={() => setIsLoginModalOpen(false)}
        />
      </Modal>

      {/* Register Modal */}
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

      {/* registration otp varify */}
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

      {/* Forget Password Modal */}
      <Modal
        isOpen={isForgetModalOpen}
        onClose={() => setIsForgetModalOpen(false)}
      >
        <ForgetPassword
          onClose={() => setIsForgetModalOpen(false)}
          onSend={(email, phone) => {
            setUserEmail(email);
            setUserPhone(phone);
            setIsForgetModalOpen(false);
            setIsOtpModalOpen(true);
            setOtpFor("password_reset");
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
          email={userEmail}
          resetPasswordToken={resetPasswordToken}
        />
      </Modal>
    </div>
  );
}
