"use client";
import React, { useState, useRef, useEffect } from "react";
import { Star, StarIcon, StarHalf, Calendar, Euro } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import FilterButton from "@/components/page-components/slots/FilterButton";
import Navbar from "@/components/layout/Header";
import HotelList from "@/components/page-components/slots/HotelList";

import { useSearchHotelsQuery } from "./Services/slotsApi";
import { Portal } from "./Portal";
import {
  useGetFavoriteListQuery,
  useUpdateFavoriteMutation,
} from "../favorites/services/favoritesApi";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import {
  addFavorite,
  removeFavorite,
  setGuestFavorites,
} from "../favorites/services/favoritesSlice";
import { toast } from "react-toastify";
import MapWithInfoWindow from "./MapWithInfoWindow";
import FullPageLoader from "@/components/ui/FullPageLoader";
import FilterDropdowns from "./FilterDropdowns";

interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  rating: number;
  reviews: number;
  images: string[];
  slots: {
    startTime: string;
    endTime: string;
    price: number;
    _id: string;
    isAvailable: boolean;
  }[];
  times: string[];
  city: string;
  isFavorite: boolean;
}
type SelectedFilters = Record<string, string>; // { [filter.value]: option.value }

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" className="w-4 h-4 fill-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}
export default function Index() {
  // All your existing state and logics
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const filtersRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    0, 250,
  ]);
  const [activeCategory, setActiveCategory] = useState("All hotels");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Keep track of selected filters: key = filterName, value = selected option
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const [openFilter, setOpenFilter] = useState<any>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const initialCity = (searchParams && searchParams.get("city")) || null;
  const [selectedCity, setSelectedCity] = useState<string | null>(initialCity);

  const city = searchParams.get("city");
  const checkInDate = searchParams.get("checkInDate");
  const duration = searchParams.get("duration");
  const checkInTime = searchParams.get("checkInTime");
  const checkOutDate = searchParams.get("checkOutDate");
  const checkOutTime = searchParams.get("checkOutTime");

  // filter keys
  const filterKeys = [
    "city",
    "checkInDate",
    "arrivalTime",
    "duration",
    "priceStart",
    "priceEnd",
    "rating",
  ];

  const queryParams: Record<string, string> = {};
  filterKeys.forEach((key) => {
    const value = searchParams.get(key);
    if (value) queryParams[key] = value;
  });

  const {
    data: hotelsData,
    isLoading,
    error,
    refetch: refetchHotels,
  } = useSearchHotelsQuery(queryParams);

  useEffect(() => {
    if (initialCity) setSelectedCity(initialCity);
  }, [initialCity]);

  const categories = [
    "All hotels",
    "Romance & Celebration",
    "Atypical Hotels",
    "Best Rated",
    "Best Deals",
    "King Size Beds",
    "4 & 5 Star Hotels",
    "Room with a bathtub",
    "best Pool",
  ];

  const filterOptions = [
    {
      name: "Duration",
      value: "duration",
      icon: <Calendar size={16} />,
      options: [
        { value: "3", label: "3 hours" },
        { value: "6", label: "6 hours" },
        { value: "12", label: "12 hours" },
      ],
    },
    {
      name: "Price Start",
      value: "priceStart",
      icon: <Euro size={16} />,
      options: [
        { value: "10", label: "10 AED" },
        { value: "100", label: "100 AED" },
        { value: "150", label: "150 AED" },
        { value: "200", label: "200 AED" },
        { value: "250", label: "25 AED" },
      ],
    },

    {
      name: "Price End",
      value: "priceEnd",
      icon: <Euro size={16} />,
      options: [
        { value: "50", label: "50 AED" },
        { value: "150", label: "150 AED" },
        { value: "200", label: "200 AED" },
        { value: "250", label: "250 AED" },
        { value: "250", label: "250+ AED" },
      ],
    },
    {
      name: "Number of stars",
      value: "rating",
      icon: <StarIcon size={16} />,
      options: [
        { value: "1", label: "⭐" },
        { value: "2", label: "⭐⭐" },
        { value: "3", label: "⭐⭐⭐" },
        { value: "4", label: "⭐⭐⭐⭐" },
        { value: "5", label: "⭐⭐⭐⭐⭐" },
      ],
    },
  ];

  // Initialize selected filters from URL params on mount or URL change
  useEffect(() => {
    const filtersFromUrl: SelectedFilters = {};
    filterOptions.forEach(({ value }) => {
      const paramValue = searchParams.get(value);
      if (paramValue) filtersFromUrl[value] = paramValue;
    });
    setSelectedFilters(filtersFromUrl);
  }, [searchParams]);

  // Update URL search params based on filters state
  const updateURLParams = (filters: SelectedFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    // Default query params you want to preserve
    const defaultParams = {
      city,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      duration: filters.duration || "3",
    };

    // Ensure default params are preserved
    Object.entries(defaultParams).forEach(([key, val]) => {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });

    // Remove existing filter keys that are no longer in filters
    filterOptions.forEach(({ value }) => {
      if (!(value in filters)) {
        params.delete(value);
      }
    });

    // Add new filter values
    Object.entries(filters).forEach(([key, val]) => {
      if (key in defaultParams) return;
      if (val) {
        params.set(key, val);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Open/close filter dropdown
  const handleFilterButtonClick = (filterValue: string) => {
    setOpenFilter((prev: any) => (prev === filterValue ? null : filterValue));
    setTimeout(() => {
      const btn = document.getElementById(`filter-btn-${filterValue}`);
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY, // makes it relative to page
          left: rect.left + window.scrollX,
        });
      }
    }, 0);
  };

  useEffect(() => {
    const handleReposition = () => {
      if (openFilter) {
        const btn = document.getElementById(`filter-btn-${openFilter}`);
        if (btn) {
          const rect = btn.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
          });
        }
      }
    };

    window.addEventListener("scroll", handleReposition);
    window.addEventListener("resize", handleReposition);

    return () => {
      window.removeEventListener("scroll", handleReposition);
      window.removeEventListener("resize", handleReposition);
    };
  }, [openFilter]);

  // Handle selecting an option for a filter
  const handleOptionSelect = (filterValue: string, optionValue: string) => {
    const newFilters = {
      ...selectedFilters,
      [filterValue]: optionValue,
    };
    setSelectedFilters(newFilters);
    updateURLParams(newFilters);
    setOpenFilter(null);
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedFilters({});
    updateURLParams({});
    setOpenFilter(null);
  };

  const getSelectedOptionLabel = (
    filterValue: string,
    optionValue: string | undefined
  ): string | null => {
    if (!optionValue) return null;
    const filter = filterOptions.find((f) => f.value === filterValue);
    if (!filter) return null;
    const option = filter.options.find((o) => o.value === optionValue);
    return option ? option.label : null;
  };

  const activeCount = Object.keys(selectedFilters).length;

  const [updateFavorite] = useUpdateFavoriteMutation();
  const profile = useAppSelector((state) => state.profile?.data?.data);

  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites.items);

  const guestFavorites = useAppSelector((state) => state.favorites.guestItems);

  const hotelsWithFavoriteStatus = hotelsData?.data?.map((hotel: Hotel) => {
    const isLoggedIn = !!profile?._id;
    const isFavorite = isLoggedIn
      ? favorites.includes(hotel.id.toString())
      : guestFavorites.includes(hotel.id.toString());

    return {
      ...hotel,
      isFavorite,
    };
  });

  useEffect(() => {
    const guestFavorites = JSON.parse(
      localStorage.getItem("guestFavorites") || "[]"
    );
    dispatch(setGuestFavorites(guestFavorites));
  }, []);

  const toggleFavorite = async (hotelId: string, isFavorited: boolean) => {
    const action = isFavorited ? "remove" : "add";
    const customerId = profile?._id;

    if (!customerId) {
      // Guest user logic (localStorage)
      const storedFavorites = JSON.parse(
        localStorage.getItem("guestFavorites") || "[]"
      );

      let updatedFavorites;
      if (isFavorited) {
        updatedFavorites = storedFavorites.filter(
          (id: string) => id !== hotelId
        );
        toast.success("Removed from favorites.");
      } else {
        updatedFavorites = [...storedFavorites, hotelId];
        toast.success("Added to favorites.");
      }
      localStorage.setItem("guestFavorites", JSON.stringify(updatedFavorites));
      dispatch(setGuestFavorites(updatedFavorites));

      return;
    }

    // Logged-in user logic
    try {
      await updateFavorite({
        customerId,
        action,
        body: { hotel_id: hotelId },
      }).unwrap();

      dispatch(isFavorited ? removeFavorite(hotelId) : addFavorite(hotelId));

      toast.success(
        isFavorited ? "Removed from favorites." : "Added to favorites."
      );
    } catch (error) {
      console.error("Failed to update favorite", error);
      toast.error("Failed to update favorite.");
    }
  };

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar
        menuColor="light"
        isFixed={false}
        forceShowSearch={true}
        onCitySelect={setSelectedCity}
        searchValue={selectedCity ?? undefined}
      />
      {/* Mobile Filters */}
      <div className="block xl:hidden bg-white z-20 sticky top-16">
        <div className="px-4 pb-4">
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar scroll-smooth mt-5">
            <FilterDropdowns
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              handleOptionSelect={handleOptionSelect}
              getSelectedOptionLabel={getSelectedOptionLabel}
              handleClearAll={handleClearAll}
              activeCount={activeCount}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row min-h-screen">
        <div className="xl:w-[45%] 2xl:w-[50%] bg-white flex flex-col h-screen overflow-hidden">
          <div className="hidden xl:block h-screen overflow-y-hidden hide-scrollbar">
            <div className="px-4 py-6 bg-white ">
              {/* Desktop Categories */}

              {/* <div className="relative">
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg border hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div
                  ref={sliderRef}
                  className="flex overflow-x-auto gap-2 px-10 pb-2 hide-scrollbar scroll-smooth"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 px-4 py-2 rounded-full border-1 text-sm font-medium transition-all duration-300 ${
                        category === activeCategory
                          ? "border-[#ff8200] bg-[#ff8200] text-white"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg border hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div> */}

              {/* Desktop Filters */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar scroll-smooth mt-5">
                  <FilterDropdowns
                    filterOptions={filterOptions}
                    selectedFilters={selectedFilters}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    handleOptionSelect={handleOptionSelect}
                    getSelectedOptionLabel={getSelectedOptionLabel}
                    handleClearAll={handleClearAll}
                    activeCount={activeCount}
                  />
                </div>
              </div>
            </div>

            {/* Hotel List */}
            <div className="flex-1 h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar px-4 pb-6">
              <div className="flex items-center mb-2 justify-between">
                <h1 className="text-lg font-semibold text-black">
                  {hotelsData?.data.length} hotels available in {city} :
                </h1>
              </div>
              <HotelList
                hotels={hotelsWithFavoriteStatus}
                checkInDate={checkInDate}
                duration={duration}
                checkOutDate={checkOutDate}
                checkOutTime={checkOutTime}
                checkInTime={checkInTime}
                toggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full xl:w-[55%] 2xl:w-[50%] h-[300px] xl:h-screen relative">
          <MapWithInfoWindow selectedCity={city} hotelsData={hotelsData} />
        </div>

        {/* Mobile Drawer */}
        <div className="xl:hidden">
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-20"
            animate={{ y: isDrawerOpen ? 0 : 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 400 }}
            onDragEnd={(event, info) => {
              if (info.point.y > 200) setIsDrawerOpen(false);
              else setIsDrawerOpen(true);
            }}
          >
            <div
              className="w-full flex justify-center py-2 cursor-pointer"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <div className="w-10 h-1.5 bg-gray-400 rounded-full" />
            </div>
            <div className="max-h-[80vh] overflow-y-auto px-4 pb-6">
              <HotelList
                hotels={hotelsWithFavoriteStatus}
                checkInDate={checkInDate}
                duration={duration}
                checkOutDate={checkOutDate}
                checkOutTime={checkOutTime}
                checkInTime={checkInTime}
                toggleFavorite={toggleFavorite}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
