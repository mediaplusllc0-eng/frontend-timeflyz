"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "We stayed here with our family and are fully satisfied with our vacation. Rooms are very modern, have all needed amenities, the kitchen is very delicious and service is just perfect. We will for sure come back.",
    author: "KATE PALMER",
    location: "IDAHO",
    avatar: "/img/user1.jpg",
  },
  {
    id: 2,
    quote:
      "The views are breathtaking and the staff went above and beyond to make our stay memorable. The hiking trails nearby are fantastic and the restaurant serves amazing local cuisine.",
    author: "JAMES WILSON",
    location: "COLORADO",
    avatar: "/img/user2.jpg",
  },
  {
    id: 3,
    quote:
      "This was our third visit and it keeps getting better. The renovated rooms are stunning and the new spa facilities are world-class. Perfect for a romantic getaway or family vacation.",
    author: "SARAH JOHNSON",
    location: "MONTANA",
    avatar: "/img/user3.jpg",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTestimonial = testimonials[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative w-full overflow-hidden pb-5 bg-[#E7EAEA]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/testi.jpg"
          alt="Mountain view deck"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-[500px] lg:min-h-[600px] px-4 sm:px-6 lg:px-8">
        {/* Left side - empty space or can be used for additional content */}
        <div className="hidden md:block md:w-1/4 lg:w-1/3"></div>

        {/* Center blue panel with testimonial */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center md:mx-0 mx-auto my-8 sm:my-10 md:my-12">
          {/* Small white line */}
          <div className="w-12 h-1 bg-white mb-4 sm:mb-6"></div>

          <h3 className="text-white text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 ">
            AT THE HEART OF COMMUNITIES
          </h3>

          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8">
            People Say
          </h2>

          <blockquote className="text-white italic mb-6 sm:mb-8 text-base sm:text-lg ">
            {currentTestimonial.quote}
          </blockquote>

          <div className="flex items-center">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
              <Image
                src={currentTestimonial.avatar || "/placeholder.svg"}
                alt={currentTestimonial.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-medium text-sm sm:text-base ">
                {currentTestimonial.author}
              </p>
              <p className="text-white opacity-80 text-xs sm:text-sm ">
                {currentTestimonial.location}
              </p>
            </div>
          </div>

          {/* Navigation arrows for mobile */}
          <div className="flex justify-end mt-4 sm:mt-6 md:hidden">
            <button
              onClick={handlePrevious}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center mr-2 text-white hover:bg-white/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Right side - empty space or can be used for additional content */}
        <div className="hidden md:block md:w-1/4 lg:w-1/3 relative">
          {/* Navigation arrows for desktop */}
          <div className="absolute bottom-8 left-8 flex">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white hover:bg-white/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
