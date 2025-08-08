"use client";
import React, { useEffect } from "react";
import "@/app/globals.css";
import { useState } from "react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useGetHotelReviewsQuery,
  useGetHotelsDetailsQuery,
  useGetHotelSlotsQuery,
} from "./services/hotelDetailsApi";
import ShareAndReview from "@/components/page-components/hotelDetails/ShareAndReview";
import ImageGallery from "@/components/page-components/hotelDetails/ImageGallery";
import LeftInformation from "@/components/page-components/hotelDetails/LeftInformation";
import BookingCard from "@/components/page-components/hotelDetails/BookingCard";
import SlotList from "@/components/page-components/hotelDetails/SlotList";
import {
  addFavorite,
  removeFavorite,
  setGuestFavorites,
} from "@/app/favorites/services/favoritesSlice";
import { useUpdateFavoriteMutation } from "@/app/favorites/services/favoritesApi";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { toast } from "react-toastify";
import moment from "moment";

// / Simplified cn utility (optional, or just use plain className strings)
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// Simplified Avatar components
const Avatar = ({
  initial,
  className = "",
}: {
  initial: string;
  className?: string;
}) => (
  <div
    className={cn(
      "flex items-center justify-center h-10 w-10 rounded-full bg-muted",
      className
    )}
  >
    <span className="text-lg font-medium text-primary">{initial}</span>
  </div>
);

// Simplified Progress component

// Dummy data

interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  email: string;
  contactNumber: string;
  images: string[];
  rating?: number;
}

interface HotelListingProps {
  name: string;
  stars: number;
  mainImage: string;
  roomImages: string[];
  highlights: {
    icon: "location" | "food" | "pool";
    text: string;
  }[];
  address: string;
  rating: number;
  reviews: number;
}

export default function index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const { hotelid } = useParams();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const checkInDate = searchParams.get("checkInDate"); // Replace with dynamic if needed
  const checkInTime = searchParams.get("checkInTime");
  const endDate = searchParams.get("endDate");
  const endTime = searchParams.get("endTime");
  const durationParam = searchParams.get("duration");

  const duration = durationParam ? parseInt(durationParam) : 0;

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

  const {
    data: hotel,
    error,
    isLoading,
  } = useGetHotelsDetailsQuery({
    hotelId: hotelid,
  });

  let checkOutDate: string | null = null;

  if (checkInDate) {
    const checkinDateTime = moment(
      `${checkInDate} ${checkInTime}`,
      "YYYY-MM-DD hh:mm A"
    );
    const checkoutMoment = checkinDateTime.clone().add(duration, "hours");
    checkOutDate = checkoutMoment.format("YYYY-MM-DD");
  }

  const {
    data: hotelSlots,
    isLoading: slotsLoading,
    error: slotError,
  } = useGetHotelSlotsQuery({
    hotelId: hotelid,
    checkInDate: checkInISO,
    checkOutDate: endISO,
  });

  const [updateFavorite] = useUpdateFavoriteMutation();
  const profile = useAppSelector((state) => state.profile?.data?.data);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);

  useEffect(() => {
    const hotelId = hotel?.data?._id;
    if (!hotelId) return;

    if (profile?._id) {
      const isFavorited = favorites.includes(hotelId.toString());
      setSaved(isFavorited);
    } else {
      const guestFavorites = JSON.parse(
        localStorage.getItem("guestFavorites") || "[]"
      );
      const isFavorited = guestFavorites.includes(hotelId.toString());
      setSaved(isFavorited);
    }
  }, [favorites, hotel?.data?._id, profile]);

  const toggleFavorite = async () => {
    const hotelId = hotel?.data?._id;

    if (!hotelId) return;

    const customerId = profile?._id;

    if (!customerId) {
      // Unauthenticated User: Use localStorage
      const storedFavorites = JSON.parse(
        localStorage.getItem("guestFavorites") || "[]"
      );

      let updatedFavorites;

      if (storedFavorites.includes(hotelId)) {
        // Remove from favorites
        updatedFavorites = storedFavorites.filter(
          (id: string) => id !== hotelId
        );
        toast.success("Removed from favorites.");
      } else {
        // Add to favorites
        updatedFavorites = [...storedFavorites, hotelId];
        toast.success("Added to favorites.");
      }

      localStorage.setItem("guestFavorites", JSON.stringify(updatedFavorites));
      dispatch(setGuestFavorites(updatedFavorites)); // optional: update Redux
      setSaved(updatedFavorites.includes(hotelId));
      return;
    }

    // Logged-in User
    try {
      await updateFavorite({
        customerId,
        action: saved ? "remove" : "add",
        body: { hotel_id: hotelId },
      }).unwrap();

      dispatch(saved ? removeFavorite(hotelId) : addFavorite(hotelId));
      setSaved(!saved);

      toast.success(saved ? "Removed from favorites." : "Added to favorites.");
    } catch (error) {
      console.error("Failed to update favorite", error);
      toast.error("Failed to update favorite.");
    }
  };

  if (isLoading || slotsLoading) {
    return <div className="p-10 text-center">Loading hotel details...</div>;
  }

  return (
    <div className="min-h-screen text-black">
      <div className="relative">
        <Navbar menuColor="dark" isFixed={false} />
      </div>
      <main className="bg-white w-full">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col space-y-4">
              {/* Header */}
              <ShareAndReview
                toggleFavorite={toggleFavorite}
                saved={saved}
                hotel={hotel?.data}
              />

              {/* Images */}
              <ImageGallery hotel={hotel?.data} />

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Main content */}
                <div className="lg:col-span-2 space-y-8">
                  <SlotList hotelSlots={hotelSlots} />

                  <LeftInformation hotel={hotel?.data} />
                </div>
                {/* Right column - Booking card */}
                <BookingCard
                  hotel={hotel?.data}
                  toggleFavorite={toggleFavorite}
                  saved={saved}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
