"use client";
import { useState } from "react";

interface FilterDropdownProps {
  name: string;
  anchorRect: DOMRect | null;
  onClose: () => void;
  selectedOption: string | null;
  onSelect: (option: string) => void;
  onDelete: () => void;
  priceRange?: [number, number];
  setPriceRange?: (range: [number, number]) => void;
}

export default function FilterDropdown({
  name,
  anchorRect,
  onClose,
  selectedOption,
  onSelect,
  onDelete,
  priceRange = [0, 250],
  setPriceRange = () => {},
}: FilterDropdownProps) {
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([
    priceRange[0],
    priceRange[1],
  ]);

  const filterOptions = [
    {
      name: "Time of arrival",
      options: ["Morning", "Afternoon", "Evening", "Night"],
    },
    {
      name: "Duration",
      options: ["2-4 hours", "4-6 hours", "6-8 hours", "8+ hours"],
    },
    {
      name: "Prices",
      options: [],
    },
    {
      name: "Number of stars",
      options: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    },
    {
      name: "Amenities",
      options: ["Pool", "Spa", "Restaurant", "Gym", "Parking"],
    },
  ];

  const savePriceRange = () => {
    setPriceRange(tempPriceRange);
    onSelect(`AED ${tempPriceRange[0]} - AED ${tempPriceRange[1]}+`);
    onClose();
  };

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg border p-4">
      {name === "Prices" ? (
        <>
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>AED {tempPriceRange[0]}</span>
            <span>AED {tempPriceRange[1]}+</span>
          </div>
          <div className="relative w-full h-2 mt-2 mb-4 bg-gray-200 rounded-full">
            <input
              type="range"
              min="0"
              max="250"
              value={tempPriceRange[0]}
              onChange={(e) =>
                setTempPriceRange([parseInt(e.target.value), tempPriceRange[1]])
              }
              className="absolute w-full h-full bg-transparent appearance-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #a084e8 0%, #a084e8 ${
                  (tempPriceRange[0] / 250) * 100
                }%, #e5e7eb ${(tempPriceRange[0] / 250) * 100}%)`,
              }}
            />
            <input
              type="range"
              min="0"
              max="250"
              value={tempPriceRange[1]}
              onChange={(e) =>
                setTempPriceRange([tempPriceRange[0], parseInt(e.target.value)])
              }
              className="absolute w-full h-full bg-transparent appearance-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${
                  (tempPriceRange[0] / 250) * 100
                }%, #a084e8 ${(tempPriceRange[0] / 250) * 100}%, #a084e8 ${
                  (tempPriceRange[1] / 250) * 100
                }%, #e5e7eb ${(tempPriceRange[1] / 250) * 100}%)`,
              }}
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Minimum</div>
              <input
                type="number"
                min={0}
                max={tempPriceRange[1]}
                value={tempPriceRange[0]}
                onChange={(e) =>
                  setTempPriceRange([Number(e.target.value), tempPriceRange[1]])
                }
                className="w-full border rounded-lg px-3 py-2 text-center"
              />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Maximum</div>
              <input
                type="number"
                min={tempPriceRange[0]}
                max={250}
                value={tempPriceRange[1]}
                onChange={(e) =>
                  setTempPriceRange([tempPriceRange[0], Number(e.target.value)])
                }
                className="w-full border rounded-lg px-3 py-2 text-center"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="text-xs underline text-gray-500"
            >
              DELETE
            </button>
            <button
              onClick={savePriceRange}
              className="bg-[#ffb700] text-white font-semibold px-6 py-2 rounded-full"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          {filterOptions
            .find((f) => f.name === name)
            ?.options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  selectedOption === option
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50 rounded-lg"
                }`}
              >
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
