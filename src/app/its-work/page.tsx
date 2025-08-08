"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "@/components/ui/Image";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VideoModal from "@/components/ui/VideoModal";

type PreferenceOption = {
  id: string;
  label: string;
  images: string[];
  content: string;
  isGradient?: boolean;
};

const preferenceOptions: PreferenceOption[] = [
  {
    id: "romantic",
    label: "Romantic",
    images: [
      "/img/experience/romantic1.jpg",
      "/img/experience/romantic2.jpg",
      "/img/experience/romantic3.jpg",
      "/img/experience/romantic4.jpg",
      "/img/experience/romantic5.jpg",
      "/img/experience/romantic6.jpg",
    ],
    content: "Plan a romantic escape and celebrate love in style.",
  },
  {
    id: "business",
    label: "Business",
    images: [
      "/img/experience/business1.jpg",
      "/img/experience/business2.jpg",
      "/img/experience/business3.jpg",
      "/img/experience/business4.jpg",
      "/img/experience/business5.jpg",
      "/img/experience/business6.jpg",
    ],
    content: "Work, meet, and unwind—all in one perfect spot.",
  },
  {
    id: "wellness",
    label: "Wellness",
    images: [
      "/img/experience/wellness1.jpg",
      "/img/experience/wellness2.jpg",
      "/img/experience/wellness3.jpg",
      "/img/experience/wellness4.jpg",
      "/img/experience/wellness5.jpg",
      "/img/experience/wellness6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
  {
    id: "photo shoot",
    label: "Photo Shoot",
    images: [
      "/img/experience/photo1.jpg",
      "/img/experience/photo2.jpg",
      "/img/experience/photo3.jpg",
      "/img/experience/photo4.jpg",
      "/img/experience/photo5.jpg",
      "/img/experience/photo6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
  {
    id: "pool",
    label: "Poll",
    images: [
      "/img/experience/pool1.jpg",
      "/img/experience/pool2.jpg",
      "/img/experience/pool3.jpg",
      "/img/experience/pool4.jpg",
      "/img/experience/pool5.jpg",
      "/img/experience/pool6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
  {
    id: "layover",
    label: "Layover",
    images: [
      "/img/experience/layover1.jpg",
      "/img/experience/layover2.jpg",
      "/img/experience/layover3.jpg",
      "/img/experience/layover4.jpg",
      "/img/experience/layover5.jpg",
      "/img/experience/layover6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
  {
    id: "meeting",
    label: "Meeting",
    images: [
      "/img/experience/meeting1.jpg",
      "/img/experience/meeting2.jpg",
      "/img/experience/meeting3.jpg",
      "/img/experience/meeting4.jpg",
      "/img/experience/meeting5.jpg",
      "/img/experience/meeting6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
  {
    id: "roomservice",
    label: "Room Service",
    images: [
      "/img/experience/service1.jpg",
      "/img/experience/service2.jpg",
      "/img/experience/service3.jpg",
      "/img/experience/service4.jpg",
      "/img/experience/service5.jpg",
      "/img/experience/service6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
  {
    id: "other",
    label: "Other",
    images: [
      "/img/experience/other1.jpg",
      "/img/experience/other2.jpg",
      "/img/experience/other3.jpg",
      "/img/experience/other4.jpg",
      "/img/experience/other5.jpg",
      "/img/experience/other6.jpg",
    ],
    content: "Take time for yourself. Recharge your body and mind.",
  },
];

export default function index() {
  const [selectedTab, setSelectedTab] = useState<string>("romantic");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  const selected = preferenceOptions.find((item) => item.id === selectedTab);

  const handleTabChange = (tabId: string) => {
    if (isTransitioning || tabId === selectedTab) return;

    setIsTransitioning(true);
    setSelectedTab(tabId);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Time slots data
  const topTimeSlots = [
    "6AM - 2PM",
    "5AM - 11AM",
    "11AM - 7:30PM",
    "10AM - 6:30PM",
    "9AM - 5PM",
    "2PM - 8PM",
    "7AM - 11:30AM",
    "11:30AM - 6PM",
    "6AM - 2PM",
    "5AM - 11AM",
    "11AM - 7:30PM",
    "10AM - 6:30PM", // Duplicated for continuous scrolling
  ];

  const bottomTimeSlots = [
    "5AM - 11AM",
    "11AM - 7:30PM",
    "10AM - 6:30PM",
    "9AM - 5PM",
    "2PM - 8PM",
    "7AM - 11:30AM",
    "11:30AM - 6PM",
    "10AM - 4:30PM",
    "5AM - 11AM",
    "11AM - 7:30PM",
    "10AM - 6:30PM",
    "9AM - 5PM", // Duplicated for continuous scrolling
  ];

  useEffect(() => {
    // Animation for continuous scrolling
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    if (!topRow || !bottomRow) return;

    let topPosition = 0;
    let bottomPosition = 0;
    const speed = 0.5; // Adjust speed as needed

    const animate = () => {
      // Move top row right to left (negative direction)
      topPosition -= speed;
      if (topPosition <= -2000) topPosition = 0;
      topRow.style.transform = `translateX(${topPosition}px)`;

      // Move bottom row left to right (positive direction)
      bottomPosition += speed;
      if (bottomPosition >= 2000) bottomPosition = 0;
      bottomRow.style.transform = `translateX(${bottomPosition}px)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar menuColor="light" isFixed={false} />
      <div className="container mx-auto">
        {/* first section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] px-5">
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight pt-3">
              <span className="bg-[#ff8200] bg-clip-text text-transparent text-shadow-lg/30">
                Everything you need to know about TimeFlyz!
              </span>
            </h1>

            <p className="text-gray-700 text-base md:text-lg max-w-lg">
              Booking a hotel room during the day for a few hours opens the door
              to an infinite number of possibilities.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#DAA520] text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-full transition-colors">
                How does it work?
              </button>

              <button
                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center gap-2 transition-colors"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play size={16} className="text-gray-600 hidden md:block" />
                <Play size={14} className="text-gray-600 md:hidden" />
                Timeflyz on video
              </button>
            </div>
          </div>

          {/* Right Column - image*/}
          <div className="w-full lg:w-1/2 relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
            <div className="relative rounded-3xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-400/20 mix-blend-overlay"></div>
              <Image
                src="/img/its-work.jpg"
                alt="Luxury hotel experience"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-base md:text-lg font-medium">
                  Experience luxury in the comfort of day
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 md:w-24 h-16 md:h-24 bg-amber-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 md:w-24 h-16 md:h-24 bg-rose-400/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* second section */}
        <section className="py-10 bg-gray-50 flex flex-col justify-center">
          <div className="container mx-auto px-4 text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-5 ">
              What is a TimeFlyz experience?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-normal">
              Enjoy a few hours alone, as a couple, or with friends in a hotel
              room during the day or evening. Simply select a time slot between
              6 a.m. and 11 p.m.
            </p>
          </div>

          {/* Scrolling time slots container */}
          <div className="overflow-hidden relative flex-grow flex flex-col justify-center">
            {/* Top row - scrolling right to left */}
            <div className="relative py-2 md:py-4 mb-2 md:mb-3">
              <div className="flex space-x-4 md:space-x-6 whitespace-nowrap animate-scroll-left">
                {topTimeSlots.map((slot, index) => (
                  <div
                    key={`top-${index}`}
                    className="inline-block px-3 md:px-4 py-2 md:py-4 bg-white rounded-full shadow-sm text-gray-700 text-sm md:text-base font-medium min-w-[120px] md:min-w-[140px] text-center"
                  >
                    {slot}
                  </div>
                ))}
                {/* Duplicate items for seamless loop */}
                {topTimeSlots.map((slot, index) => (
                  <div
                    key={`top-duplicate-${index}`}
                    className="inline-block px-3 md:px-4 py-2 md:py-4 bg-white rounded-full shadow-sm text-gray-700 text-sm md:text-base font-medium min-w-[120px] md:min-w-[140px] text-center"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row - scrolling left to right */}
            <div className="relative py-2 md:py-4">
              <div className="flex space-x-4 md:space-x-6 whitespace-nowrap animate-scroll-right">
                {bottomTimeSlots.map((slot, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="inline-block px-3 md:px-4 py-2 md:py-4 bg-white rounded-full shadow-sm text-gray-700 text-sm md:text-base font-medium min-w-[120px] md:min-w-[140px] text-center"
                  >
                    {slot}
                  </div>
                ))}
                {/* Duplicate items for seamless loop */}
                {bottomTimeSlots.map((slot, index) => (
                  <div
                    key={`bottom-duplicate-${index}`}
                    className="inline-block px-3 md:px-4 py-2 md:py-4 bg-white rounded-full shadow-sm text-gray-700 text-sm md:text-base font-medium min-w-[120px] md:min-w-[140px] text-center"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience section */}
        <section className="flex flex-col justify-center">
          <div className="container mx-auto px-4 text-center mb-8 md:mb-12">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 text-gray-800">
                Choose experience to your preferences
              </h1>

              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-12 md:w-[70%] mx-auto w-full">
                {preferenceOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleTabChange(option.id)}
                    disabled={isTransitioning}
                    className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                      selectedTab === option.id
                        ? "bg-gray-800 text-white border-gray-800 transform scale-105 shadow-lg"
                        : "bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:scale-105"
                    } ${
                      isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Show only images with animation */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isTransitioning ? "opacity-50" : "opacity-100"
                }`}
              >
                {selected && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {selected.images.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg"
                      >
                        <Image
                          src={img}
                          alt={`${selected.label} image ${index + 1}`}
                          className="w-[300px] h-[300px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How does it work section */}
        <div className="container mx-auto px-4 py-16 md:py-10 relative">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100 rounded-full opacity-20 blur-3xl"></div>

          <div className="relative">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                How does it <span className="text-[#ff8200]">work?</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Begin your TimeFlyz journey by finding the hotel of your dreams.
                We will explain everything to you!
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left side - Image with floating elements */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  {/* Main image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 mix-blend-overlay"></div>
                    <Image
                      src="/img/work.jpg"
                      alt="How TimeFlyz works"
                      className="object-cover"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-400/20 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Right side - Steps */}
              <div className="w-full lg:w-1/2 space-y-8">
                {/* Steps container */}
                <div className="space-y-8">
                  <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        1
                      </div>
                      <div>
                        <h3 className="md:text-2xl text-base font-semibold text-gray-800 mb-3 group-hover:text-amber-500 transition-colors">
                          Search
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Find the hotel of your dreams
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        2
                      </div>
                      <div>
                        <h3 className="md:text-2xl text-base font-semibold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors">
                          Book
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Choose your room, your time slot and your add-ons
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        3
                      </div>
                      <div>
                        <h3 className="md:text-2xl text-base font-semibold text-gray-800 mb-3 group-hover:text-rose-500 transition-colors">
                          Validate
                        </h3>
                        <p className="text-gray-600 text-lg">
                          All that's left is to enjoy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three good reasons section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left side - Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl/6 md:text-4xl/6 lg:text-5xl/[3.5rem] font-bold text-gray-800">
                  Three good reasons to{" "}
                  <span className="text-[#ff8200]">book with TimeFlyz</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Secret pools, hidden rooftops, bathtubs with a view...
                  Experience everything your heart desires!
                </p>
              </div>

              {/* Reasons */}
              <div className="space-y-6">
                {/* Reason 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Free cancellation
                      </h3>
                      <p className="text-gray-600">Until the last minute</p>
                    </div>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Payment at the hotel
                      </h3>
                      <p className="text-gray-600">
                        Reserve without prepayment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-rose-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Up to 75% off
                      </h3>
                      <p className="text-gray-600">
                        Compared to an overnight stay
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link href="/slots">
                  <button className="bg-[#ff8200] text-white font-medium py-3 px-8 rounded-full hover:bg-[#e67600] transition-colors duration-300 flex items-center gap-2">
                    <span>See the day hotels around me</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 mix-blend-overlay"></div>
                  <Image
                    src="/img/good reason.jpg"
                    alt="Luxury hotel amenities"
                    className="object-cover"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-400/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}
