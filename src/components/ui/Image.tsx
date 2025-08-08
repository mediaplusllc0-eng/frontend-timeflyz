import React from "react";
import NextImage from "next/image";

interface Imageprops {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}
export default function Image({
  src,
  alt,

  className,
  imageClassName,
}: Imageprops) {
  return (
    <div className={`relative ${className}`}>
      <NextImage src={src} alt={alt} fill className={` ${className}`} />
    </div>
  );
}
