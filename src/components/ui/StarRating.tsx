"use client";

import React, { useState } from "react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react"; // Lucide icons
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // e.g. 3.5
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  max?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onChange,
  readOnly = false,
  max = 5,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const getIcon = (index: number) => {
    const full = index + 1 <= displayRating;
    const half = displayRating >= index + 0.5 && displayRating < index + 1;

    if (full)
      return <FaStar className="w-5 h-5 fill-primary-500 stroke-primary-500" />;
    if (half)
      return (
        <FaStarHalfAlt className="w-5 h-5 fill-primary-500 stroke-primary-500" />
      );
    return <FaRegStar className="w-5 h-5 fill-gray-200" />;
  };

  const handleClick = (index: number, isHalf: boolean) => {
    if (readOnly || !onChange) return;
    const newRating = isHalf ? index + 0.5 : index + 1;
    onChange(newRating);
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: max }).map((_, index) => (
        <div
          key={index}
          className={`relative cursor-${
            readOnly ? "default" : "pointer"
          } group`}
          onMouseEnter={() => !readOnly && setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(null)}
        >
          <div
            className="absolute inset-0 w-1/2"
            onClick={() => handleClick(index, true)}
            onMouseEnter={() => !readOnly && setHoverRating(index + 0.5)}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            onClick={() => handleClick(index, false)}
          />
          {getIcon(index)}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
