"use client";
import { Star, StarHalf } from "lucide-react";
import React from "react";

const RenderStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="w-5 h-5 text-primary-500 fill-current"
        stroke="none"
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        className="w-5 h-5 text-primary-500 fill-current"
        stroke="none"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className="w-5 h-5 text-gray-200 fill-current"
        stroke="none"
      />
    );
  }

  return stars;
};

export default RenderStars;
