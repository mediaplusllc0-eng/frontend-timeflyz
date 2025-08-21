"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronRight, User, BookOpen, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useGetFavoriteListQuery,
  useUpdateFavoriteMutation,
} from "@/app/favorites/services/favoritesApi";
import { usePathname } from "next/navigation";
import Modal from "../ui/Modal";
import Login from "../layout/auth/Login";
import Register from "../layout/auth/Register";
import OtpVerificationRegistration from "../layout/auth/OtpVerificationRegistration";
import ForgetPassword from "../layout/auth/ForgetPassword";
import OtpVerification from "../layout/auth/OtpVerification";
import ResetPassword from "../layout/auth/ResetPassword";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const [emailToVerify, setEmailToVerify] = useState({ email: "", status: "" });

  const isAuthenticated = useAuth();
  const pathname = usePathname();

  const profile = useAppSelector((state) => state.profile?.data?.data);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const customerId = profile?._id;
  const {
    data: favoriteList,
    isLoading,
    isError,
    refetch: refetchHotels,
  } = useGetFavoriteListQuery({ customerId });
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar menuColor="light" isFixed={false} />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 bg-white my-5 rounded-3xl">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-80 p-4 space-y-4 border-r"
        >
          <div className="overflow-hidden">
            <div className="px-6 py-3 border-b border-gray-100/50">
              <h2 className="text-xl font-medium text-gray-800">Welcome</h2>
              {!isAuthenticated ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center text-primary-500 mt-2 text-sm font-medium transition-colors duration-200 group"
                >
                  LOG IN{" "}
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              ) : (
                profile?.name && (
                  <div className="mt-2 text-sm text-gray-600">
                    {profile?.name}
                  </div>
                )
              )}
            </div>
            <div className="h-1 bg-primary-500 mb-4"></div>
            <nav className="p-2 flex flex-col gap-2">
              {isAuthenticated && (
                <Link
                  href="/bookings"
                  className={`flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200  group ${
                    pathname === "/bookings"
                      ? "bg-primary-50 text-gray-800"
                      : ""
                  }`}
                >
                  <BookOpen className="h-5 w-5 mr-4 text-[#4B4D4D] group-hover:text-gold transition-colors duration-200" />
                  <span className="group-hover:text-gray-800 transition-colors duration-200">
                    Reservations
                  </span>
                </Link>
              )}

              <Link
                href="/favorites"
                className={`flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200 group ${
                  pathname === "/favorites" ? "bg-primary-50 text-gray-800" : ""
                }`}
              >
                <Heart className="h-5 w-5 mr-4 text-red-500 fill-red-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:text-gray-800 transition-colors duration-200">
                  My favorites
                </span>
                {favoriteList?.data?.favoriteCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {favoriteList?.data?.favoriteCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && (
                <Link
                  href="/profile"
                  className={`flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200  group ${
                    pathname === "/profile" ? "bg-primary-50 text-gray-800" : ""
                  }`}
                >
                  <User className="h-5 w-5 mr-4 text-[#4B4D4D] group-hover:text-gold transition-colors duration-200" />
                  <span className="group-hover:text-gray-800 transition-colors duration-200">
                    My information
                  </span>
                </Link>
              )}
            </nav>
          </div>

          {/* {!isAuthenticated && (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-100/50">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Consult your saved establishments wherever you are
              </h2>
              <p className="text-gray-500 text-sm">
                Login or register to sync your saved establishments to the
                device of your choice
              </p>
            </div>
          )} */}
        </motion.div>
        {/* Main Content (Ensure full width) */}
        <div className="flex-1 w-full">{children}</div>{" "}
        {/* Ensure this div is full width */}
      </div>
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
          onLoginSuccess={() => {
            setIsLoginModalOpen(false);
            setIsLoggedIn(true);
          }}
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

          // phone={userPhone}
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
    </div>
  );
};

export default Sidebar;
