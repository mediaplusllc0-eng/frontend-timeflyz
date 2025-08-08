"use client";

import React from "react";
import { useIsApiLoading } from "@/hooks/useIsApiLoading";
import Image from "next/image";
import LoaderImage from "../../../public/video/TimeFlyzNoBG.gif";
const FullPageLoader = () => {
  const isLoading = useIsApiLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Image
        width={100}
        height={100}
        src={LoaderImage}
        alt="Loading..."
        className="w-20 h-20"
      />
    </div>
  );
};

export default FullPageLoader;
