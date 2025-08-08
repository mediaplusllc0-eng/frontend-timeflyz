"use client";
import React from "react";

export default function Map() {
  return (
    <section className="md:pb-16 pb-5 md:mb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-8 text-center  tracking-normal">
            Find Us
          </h2>
          <p className=" text-lg text-gray-600">
            Nestled in the heart of the city, our hotel offers the perfect blend
            of luxury, convenience, and personalized service. Whether
            you&apos;re traveling for business or leisure, we ensure a memorable
            stay with world-class amenities and warm hospitality. Visit us today
            and discover your ideal home away from home.
          </p>
        </div>
        <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.6509796284!2d54.947284!3d25.0757595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
