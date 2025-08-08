"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  User,
  BookOpen,
  ChevronRight,
  Check,
  Star,
  MapPin,
  Calendar,
  Clock,
  Rat,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Modal from "@/components/ui/Modal";
import Login from "@/components/layout/auth/Login";
import Register from "@/components/layout/auth/Register";
import ForgetPassword from "@/components/layout/auth/ForgetPassword";
import OtpVerification from "@/components/layout/auth/OtpVerification";
import ResetPassword from "@/components/layout/auth/ResetPassword";
import Navbar from "@/components/layout/Header";
import FavoritesLayout from "@/components/ui/Layout";
import OtpVerificationRegistration from "@/components/layout/auth/OtpVerificationRegistration";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  useGetFavoriteListQuery,
  useUpdateFavoriteMutation,
} from "./services/favoritesApi";
import { addFavorite, removeFavorite } from "./services/favoritesSlice";
import { toast } from "react-toastify";
import RenderStars from "@/components/page-components/hotelDetails/RenderStars";
import { useGetAllHotelsQuery } from "@/components/page-components/home/Services/hotelsApi";

export default function index() {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [localFavorites, setLocalFavorites] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      const stored = localStorage.getItem("guestFavorites");
      if (stored) {
        setLocalFavorites(JSON.parse(stored));
      }
    }
  }, []);

  const profile = useAppSelector((state) => state.profile?.data?.data);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const [updateFavorite] = useUpdateFavoriteMutation();

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const { data: allHotelsData, isLoading: isHotelsLoading } =
    useGetAllHotelsQuery({
      page: 1,
      limit: 100,
      checkInDate: selectedDate.toISOString().split("T")[0],
    });

  const customerId = profile?._id;
  const {
    data: favoriteList,
    isLoading,
    isError,
    refetch: refetchHotels,
  } = useGetFavoriteListQuery({ customerId });

  const hotelsWithFavoriteStatus = isLoggedIn
    ? favoriteList?.data?.hotels.map((hotel: any) => ({
        ...hotel,
        isFavorite: favorites.includes(hotel.id.toString()),
      }))
    : allHotelsData?.data
        ?.filter((hotel: any) => localFavorites.includes(hotel.id.toString()))
        .map((hotel: any) => ({
          ...hotel,
          isFavorite: true,
        }));

  const toggleFavorite = async (hotelId: string, isFavorited: boolean) => {
    if (!isLoggedIn) {
      const stored = JSON.parse(
        localStorage.getItem("guestFavorites") || "[]"
      );

      let updated;
      if (isFavorited) {
        updated = stored.filter((id: string) => id !== hotelId);
        toast.success("Removed from favorites.");
      } else {
        updated = [...stored, hotelId];
        toast.success("Added to favorites.");
      }

      localStorage.setItem("guestFavorites", JSON.stringify(updated));
      setLocalFavorites(updated);
      return;
    }

    // Logged-in user logic
    const action = isFavorited ? "remove" : "add";
    try {
      await updateFavorite({
        customerId: profile?._id,
        action,
        body: { hotel_id: hotelId },
      }).unwrap();

      dispatch(isFavorited ? removeFavorite(hotelId) : addFavorite(hotelId));
      if (isFavorited) {
        toast.success("Removed from favorites.");
      } else {
        toast.success("Added to favorites.");
      }
      await refetchHotels();
    } catch (error) {
      console.error("Failed to update favorite", error);
    }
  };
  return (
    <FavoritesLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 p-4"
          >
            <div className="relative mb-8">
              <h1 className="text-4xl font-bold text-gray-800 ">
                My Favorites
              </h1>
            </div>

            {hotelsWithFavoriteStatus?.map((hotel: any) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden mb-6 hover:shadow-2xl transition-all duration-300 border border-gray-100/50 group"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-96 h-64 group overflow-hidden">
                      <Image
                        src={hotel.images[0]}
                        alt="ibis Paris Bercy Village 12ème"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                      <button
                        onClick={() =>
                          toggleFavorite(hotel.id, hotel.isFavorite)
                        }
                        className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 hover:shadow-xl z-10"
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      </button>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
                            <span className="text-sm font-medium text-gray-800">
                              {hotel.rating}/5
                            </span>
                          </div>
                          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
                            <span className="text-sm font-medium text-gray-800 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {hotel.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-gold transition-colors duration-200">
                              {hotel.name}
                            </h2>
                            <div className="flex items-center mt-3 space-x-3">
                              <div className="flex">
                                <RenderStars rating={hotel?.rating} />
                              </div>
                            </div>
                          </div>

                          <div className="text-right hidden md:block">
                            <div className="text-4xl font-bold text-gray-800">
                              {hotel.price}
                            </div>
                            {/* <div className="inline-block bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                              -26%
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              AED 107 per night
                            </div> */}
                          </div>
                        </div>

                        <div className="flex items-center mt-6 space-x-4">
                          <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                            <Check className="h-4 w-4 mr-1" />
                            <span> {hotel.rating}/5</span>
                          </div>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            On {hotel.totalReviews} reviews
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 md:hidden">
                        <div className="text-3xl font-bold text-gray-800">
                          {hotel.price}
                        </div>
                        {/* <div className="flex items-center">
                          <div className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                            -26%
                          </div>
                          <div className="text-sm text-gray-500 line-through ml-2">
                            AED 107 per night
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* <div className="flex justify-center">
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <span className="font-medium text-gray-700">
                  {favoriteList?.data.favoriteCount}
                </span>
              </button>
            </div> */}
          </motion.div>
        </div>

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
    </FavoritesLayout>
  );
}
