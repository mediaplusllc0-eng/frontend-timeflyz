"use client";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
// import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "@/components/layout/Header";
import StyledDatePicker from "@/components/ui/StyledDatePicker";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const [selectedDate, setSelectedDate] = React.useState<Date | any>(
    new Date()
  );
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const locations = ["dubai", "sydney", "sharjah", "melbourne"];
  const filtered = locations.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase())
  );
  const router = useRouter();

  const handlePlaceholderClick = () => {
    dateInputRef.current?.showPicker?.();
    dateInputRef.current?.click();
  };

  const duration = "3";
  const handleSearch = () => {
    if (!query.trim() || !selectedDate) return;

    const now = new Date();
    const checkInDateTime = new Date(
      selectedDate.setHours(now.getHours(), now.getMinutes(), 0, 0)
    );

    const durationInHours = parseInt(duration); // default: 3
    const checkOutDateTime = new Date(
      checkInDateTime.getTime() + durationInHours * 60 * 60 * 1000
    );

    const checkInDate = checkInDateTime.toISOString().split("T")[0];
    const checkInTime = checkInDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const checkOutDate = checkOutDateTime.toISOString().split("T")[0];
    const checkOutTime = checkOutDateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    router.push(
      `/slots?city=${encodeURIComponent(
        query.trim()
      )}&checkInDate=${checkInDate}&checkInTime=${checkInTime}&checkOutDate=${checkOutDate}&checkOutTime=${checkOutTime}&duration=${duration}`
    );
  };

  // const handleCheckAvailability = () => {
  //   if (!query.trim() || !selectedDate) return;
  //   router.push(
  //     `/slots?city=${encodeURIComponent(
  //       query.trim()
  //     )}&checkInDate=${encodeURIComponent(
  //       selectedDate.toISOString().split("T")[0]
  //     )}`
  //   );
  // };

  return (
    <main className="relative min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden md:h-full h-[820px]">
        <video
          className="absolute top-0 left-0 w-full md:h-full h-[820px] object-cover"
          autoPlay
          loop
          muted
        >
          <source
            src="https://richmond.qodeinteractive.com/wp-content/uploads/2024/07/6474637-uhd_4096_2160_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 md:h-full h-[820px]"></div>
      </div>

      {/* Navbar */}
      <Navbar isFixed={true} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center md:py-80 py-55">
        <p className="text-primary-300 font-bold tracking-wide text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase mb-3 md:mb-4 lg:mb-5 text-center">
          The New Generation of Luxury
        </p>
        <h1 className="text-white text-3xl md:text-6xl lg:text-7xl font-semibold leading-tight text-center">
          Welcome to <span className="text-primary-500">TimeFlyz</span>
          <br />
          <span className="block md:mt-3 lg:mt-3 xl:mt-3">
            A Haven of Luxury and Serenity
          </span>
        </h1>

        {/* Search Bar Container */}
        <div className="mt-6 flex flex-col sm:flex-row items-center bg-white md:rounded-full rounded-md shadow-md px-4 sm:px-6 py-3 space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center relative w-full">
            <div className="w-10 h-8 md:w-10 md:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
              <FaMapMarkerAlt className="text-lg sm:text-xl" />
            </div>

            {/* Custom Dropdown Input */}
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder="Where?"
                className="w-full px-3 sm:px-4 py-2 bg-white text-gray-800 rounded-md border-none outline-none text-sm sm:text-base "
              />
              {showDropdown && filtered.length > 0 && (
                <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filtered.map((location, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        setQuery(location);
                        setShowDropdown(false);
                      }}
                      className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <StyledDatePicker
              selectedDate={selectedDate}
              icon={
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
                  <CalendarDays size={20} />
                </div>
              }
              setSelectedDate={(date) => setSelectedDate(date)}
            />
          </div>

          {/* Search Button */}
          <Button onClick={handleSearch}>Check Availability</Button>
        </div>
      </div>
    </main>
  );
}
