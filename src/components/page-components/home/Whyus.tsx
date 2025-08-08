import Icon from "@/components/ui/Icon";
import React from "react";

export default function Whyus() {
  const features = [
    {
      title: "Best Price Guarantee",
      description:
        "Find a lower price? We'll match it and give you 10% off your next stay.",
      icon: <Icon className="w-14" stroke="#ef4a25" />,
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated team is available around the clock to assist you.",
      icon: (
        <svg
          className="w-14 h-14 text-gold"
          fill="none"
          stroke="#ef4a25"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Flexible Booking",
      description:
        "Change or cancel your booking with no fees up to 24 hours before check-in.",
      icon: (
        <svg
          className="w-14 h-14 text-gold"
          fill="none"
          stroke="#ef4a25"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-8">
              <div className="flex-shrink-0 pt-1">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
