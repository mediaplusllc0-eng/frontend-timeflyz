"use client";
import Image from "next/image";
import React from "react";

export default function TrustedBy() {
  const brands = [
    { name: "Intercontinental", src: "/img/atlants.png" },
    { name: "Holiday Inn", src: "/img/holidayinn.png" },
    { name: "Courtyard by Marriott", src: "/img/courtyard.png" },
    { name: "Best Western", src: "/img/bestwestern.png" },
    { name: "Campanile", src: "/img/campanile.png" },
    { name: "DoubleTree", src: "/img/doubletree.png" },
    { name: "Ibis", src: "/img/ibis.png" },
    { name: "Jurys Inn", src: "/img/jurysinn.png" },
    { name: "Kyriad", src: "/img/kyriad.png" },
    { name: "Marriott", src: "/img/marriott.png" },
    { name: "Mercure", src: "/img/mercure.png" },
    { name: "Gallery", src: "/img/gallery.png" },
    { name: "NH Hotel Group", src: "/img/nh.png" },
    { name: "Novotel", src: "/img/novotel.png" },
    { name: "Pullman", src: "/img/pullman.png" },
    { name: "The Hoxton", src: "/img/thehoxton.png" },
    { name: "Millennium", src: "/img/millennium.png" },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-3 font-lora tracking-normal">
            Trusted By
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the world's leading hotel brands to bring you the
            best accommodation options
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 justify-center items-center mb-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex justify-center items-center p-4"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                className="h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
