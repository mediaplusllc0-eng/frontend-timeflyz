"use client";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "./Navbar";

export default function Hero() {
  const [selectedDate, setSelectedDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const locations = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"];
  const filtered = locations.filter((loc) =>
    loc.toLowerCase().includes(query.toLowerCase())
  );
  const router = useRouter();

  const handlePlaceholderClick = () => {
    dateInputRef.current?.showPicker?.();
    dateInputRef.current?.click();
  };

  const handleCheckAvailability = () => {
    if (query.trim()) {
      router.push(`/slots?city=${encodeURIComponent(query.trim())}`);
    }
  };

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
        <div className="absolute inset-0 bg-black/40 md:h-full h-[820px]"></div>
      </div>

      {/* Navbar */}
      <Navbar isFixed={true} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center md:py-80 py-55">
        {/* Subheading */}
        <p className="text-orange-300 font-bold tracking-wide text-lg md:text-xl lg:text-2xl xl:text-3xl font-lora uppercase mb-3 md:mb-4 lg:mb-5 text-center">
          The New Generation of Luxury
        </p>

        {/* Main Heading */}
        <h1 className="text-white text-3xl md:text-6xl lg:text-7xl font-lora leading-tight text-center">
          Welcome to <span className="text-[#ff8200]">TimeFlyz</span>
          <br />
          <span className="block md:mt-3 lg:mt-3 xl:mt-3">
            A Haven of Luxury and Serenity
          </span>
        </h1>

        {/* Search Bar Container */}
        <div className="mt-6 flex flex-col sm:flex-row items-center bg-white md:rounded-full rounded-md shadow-md px-4 sm:px-6 py-3 space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Location Input */}
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
                className="w-full px-3 sm:px-4 py-2 bg-white text-gray-800 rounded-md border-none outline-none text-sm sm:text-base font-lora"
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
                      className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm"
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
            {/* Icon */}
            <div className="w-10 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
              <FaCalendarAlt className="text-lg sm:text-xl" />
            </div>

            {/* Custom Date Picker */}
            <div className="relative w-full sm:w-auto">
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white text-gray-800 px-4 py-0 rounded-md border-none outline-none w-40 cursor-pointer text-transparent font-lora [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit]:hidden select-none user-select-none"
                style={{
                  colorScheme: "light",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                }}
                placeholder="Tomorrow"
                onKeyDown={(e) => e.preventDefault()}
              />
              {!selectedDate ? (
                <span
                  onClick={handlePlaceholderClick}
                  className="absolute left-1 md:left-1.5 top-0 text-[#4B4D4D] pointer-events-auto cursor-pointer text-sm sm:text-base font-lora select-none user-select-none"
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                  }}
                >
                  Tomorrow
                </span>
              ) : (
                <span
                  onClick={handlePlaceholderClick}
                  className="absolute left-1 md:left-1.5 top-0 text-gray-800 pointer-events-auto cursor-pointer text-sm sm:text-base font-lora select-none user-select-none"
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                  }}
                >
                  {new Date(selectedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleCheckAvailability}
            className="w-full md:w-full bg-gradient-to-r from-orange-300 to-[#ed4b22] text-white font-medium px-4 sm:px-5 py-2 rounded-3xl shadow-md hover:to-red-700 text-sm sm:text-base font-lora"
          >
            Check Availability
          </button>
        </div>
      </div>
    </main>
  );
}
