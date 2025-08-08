"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const hotels = [
  // Dubai Hotels
  {
    id: 1,
    name: "Luxury Stay Dubai",
    location: "Dubai",
    image: "/img/hotel1.jpg",
    rating: 4,
    price: 500,
    originalPrice: 700,
    discount: 30,
  },
  {
    id: 5,
    name: "Palm Jumeirah Resort",
    location: "Dubai",
    image: "/img/hotel5.jpg",
    rating: 5,
    price: 1200,
    originalPrice: 1500,
    discount: 20,
  },
  {
    id: 6,
    name: "Downtown Skyline Hotel",
    location: "Dubai",
    image: "/img/hotel6.jpg",
    rating: 4,
    price: 850,
    originalPrice: 1100,
    discount: 23,
  },
  {
    id: 7,
    name: "Dubai Desert Oasis",
    location: "Dubai",
    image: "/img/hotel7.jpg",
    rating: 3,
    price: 400,
    originalPrice: 550,
    discount: 27,
  },

  // Sharjah Hotels
  {
    id: 2,
    name: "Cozy Retreat Sharjah",
    location: "Sharjah",
    image: "/img/hotel2.jpg",
    rating: 5,
    price: 350,
    originalPrice: 500,
    discount: 30,
  },
  {
    id: 8,
    name: "Sharjah Grand Hotel",
    location: "Sharjah",
    image: "/img/hotel8.jpg",
    rating: 4,
    price: 450,
    originalPrice: 600,
    discount: 25,
  },
  {
    id: 9,
    name: "Lake View Resort",
    location: "Sharjah",
    image: "/img/hotel9.jpg",
    rating: 3,
    price: 300,
    originalPrice: 400,
    discount: 20,
  },
  {
    id: 10,
    name: "Sharjah Pearl Inn",
    location: "Sharjah",
    image: "/img/hotel10.jpg",
    rating: 4,
    price: 500,
    originalPrice: 700,
    discount: 28,
  },

  // Dubai Marina Hotels
  {
    id: 3,
    name: "Seaside View Marina",
    location: "Dubai Marina",
    image: "/img/hotel3.jpg",
    rating: 3,
    price: 600,
    originalPrice: 800,
    discount: 25,
  },
  {
    id: 11,
    name: "Marina Bay Suites",
    location: "Dubai Marina",
    image: "/img/hotel11.jpg",
    rating: 5,
    price: 950,
    originalPrice: 1200,
    discount: 21,
  },
  {
    id: 12,
    name: "Ocean Breeze Marina",
    location: "Dubai Marina",
    image: "/img/hotel12.jpg",
    rating: 4,
    price: 700,
    originalPrice: 900,
    discount: 22,
  },
  {
    id: 13,
    name: "Elite Marina Hotel",
    location: "Dubai Marina",
    image: "/img/hotel13.jpg",
    rating: 5,
    price: 1100,
    originalPrice: 1400,
    discount: 21,
  },

  // Abu Dhabi Hotels
  {
    id: 4,
    name: "Grand Abu Dhabi Hotel",
    location: "Abu Dhabi",
    image: "/img/hotel4.jpg",
    rating: 5,
    price: 750,
    originalPrice: 1000,
    discount: 25,
  },
  {
    id: 14,
    name: "Royal Palace Abu Dhabi",
    location: "Abu Dhabi",
    image: "/img/hotel14.jpg",
    rating: 5,
    price: 1300,
    originalPrice: 1700,
    discount: 24,
  },
  {
    id: 15,
    name: "Corniche View Hotel",
    location: "Abu Dhabi",
    image: "/img/hotel15.jpg",
    rating: 4,
    price: 800,
    originalPrice: 1050,
    discount: 23,
  },
  {
    id: 16,
    name: "Desert Pearl Abu Dhabi",
    location: "Abu Dhabi",
    image: "/img/hotel16.jpg",
    rating: 3,
    price: 550,
    originalPrice: 700,
    discount: 21,
  },
];

const locations = ["Dubai", "Sharjah", "Dubai Marina", "Abu Dhabi"];

export default function Hotels() {
  const [selectedLocation, setSelectedLocation] = useState("Dubai");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setSelectedLocation((prev) => {
          const currentIndex = locations.indexOf(prev);
          return locations[(currentIndex + 1) % locations.length];
        });
        setFade(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#F7F9FB] px-6 text-center md:mt-10 mt-12 mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center font-lora tracking-normal">
        Our selection of Hotels
      </h2>

      {/* Location Filters */}
      <div className="px-6 md:py-4 py-6 rounded-full text-base font-semibold transition">
        <div className="flex flex-wrap justify-center mb-6 space-x-4">
          {locations.map((loc) => (
            <button
              key={loc}
              className={`px-6 py-3 rounded-full text-base font-semibold transition md:my-0 my-2 ${
                selectedLocation === loc
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards */}
      <Link href="/hoteldetail">
        <div
          className={`container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {hotels
            .filter((hotel) => hotel.location === selectedLocation)
            .map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Hotel Image */}
                  <div className="relative h-52 w-full">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <span className="text-sm font-semibold text-gray-800">
                        -{hotel.discount}%
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Name & Rating Section */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-left">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center">
                        <div className="text-gold text-lg">
                          {"★".repeat(hotel.rating)}
                          {"☆".repeat(5 - hotel.rating)}
                        </div>
                        <span className="ml-2 text-gray-600 text-sm">
                          ({hotel.rating}/5)
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    {/* <div className="flex items-center text-gray-600 mb-4">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-base">{hotel.location}</span>
                    </div> */}

                    {/* Price Section */}
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          AED {hotel.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          /night
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm line-through">
                        AED {hotel.originalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Link>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <Link href="/slots">
          <button className="bg-gradient-to-r from-orange-300 to-[#ed4b22] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            See more hotels in {selectedLocation}
          </button>
        </Link>
      </div>
    </section>
  );
}
