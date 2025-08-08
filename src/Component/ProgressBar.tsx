import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export default function ProgressBar({
  progress,
  color = "bg-gradient-to-r from-orange-300 to-[#ed4b22]",
  height = 4,
  showPercentage = true,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showPercentage && (
        <div className="text-right mt-1 text-sm text-gray-600">{progress}%</div>
      )}
    </div>
  );
}
