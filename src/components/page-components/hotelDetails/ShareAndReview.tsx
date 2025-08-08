"use client";
import { Heart, Share } from "lucide-react";
import React, { useEffect, useState } from "react";
import RenderStars from "./RenderStars";


const ShareAndReview = ({
  hotel,
  saved,
  toggleFavorite,
}: {
  hotel: any;
  saved: boolean;
  toggleFavorite: any;
}) => {

  
  return (
    <div className="bg-white py-6 border-b border-gray-300">
      <div className="flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <h1 className="mr-4">{hotel?.name}</h1>

          <RenderStars rating={hotel?.rating} />
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
            <Share className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-4 w-4 mr-1 ${
                saved ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareAndReview;
