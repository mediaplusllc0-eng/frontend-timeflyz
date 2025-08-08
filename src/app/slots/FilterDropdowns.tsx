"use client";

import { useRef, useEffect, useState } from "react";
import FilterButton from "@/components/page-components/slots/FilterButton";
import { Portal } from "./Portal";

interface FilterOption {
  name: string;
  value: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

interface Props {
  filterOptions: FilterOption[];
  selectedFilters: Record<string, string>;
  openFilter: string | null;
  setOpenFilter: (filter: any) => void;
  handleOptionSelect: (key: string, value: string) => void;
  getSelectedOptionLabel: (key: string, value: string) => string | null;
  handleClearAll: () => void;
  activeCount: number;
}

export default function FilterDropdowns({
  filterOptions,
  selectedFilters,
  openFilter,
  setOpenFilter,
  handleOptionSelect,
  getSelectedOptionLabel,
  handleClearAll,
  activeCount,
}: Props) {
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const filtersRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [openMobileFilter, setOpenMobileFilter] = useState<string | null>(null);
  const [openDesktopFilter, setOpenDesktopFilter] = useState<string | null>(
    null
  );
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filtersRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
        setOpenDesktopFilter(null);
        setOpenMobileFilter(null); // close everything
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterButtonClick = (filterKey: string) => {
    const button = buttonRefs.current[filterKey];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    setDropdownPosition({
      top: rect.bottom + scrollTop + 6,
      left: rect.left + scrollLeft,
    });

    if (isMobile) {
      setOpenMobileFilter((prev) => {
        const newValue = prev === filterKey ? null : filterKey;
        setOpenFilter(newValue); // sync with global
        return newValue;
      });
    } else {
      setOpenDesktopFilter((prev) => {
        const newValue = prev === filterKey ? null : filterKey;
        setOpenFilter(newValue); // sync with global
        return newValue;
      });
    }
  };

  return (
    <div className="flex overflow-x-auto gap-2 pb-4 border-b border-gray-200 no-scrollbar scroll-smooth relative z-30">
      {filterOptions.map((filter) => (
        <div
          key={filter.value}
          ref={(el: any) => (buttonRefs.current[filter.value] = el)}
          className="inline-block shrink-0 relative"
        >
          <FilterButton
            name={filter.name}
            icon={filter.icon}
            isActive={openFilter === filter.value}
            selectedOptionLabel={getSelectedOptionLabel(
              filter.value,
              selectedFilters[filter.value]
            )}
            onClick={() => handleFilterButtonClick(filter.value)}
          />
          {((isMobile && openMobileFilter === filter.value) ||
            (!isMobile && openDesktopFilter === filter.value)) &&
            filter.options.length > 0 && (
              <Portal>
                <div
                  ref={filtersRef}
                  className="fixed bg-white text-black border border-gray-200 rounded shadow-lg w-fit min-w-[10rem]"
                  style={{
                    top: dropdownPosition?.top,
                    left: dropdownPosition?.left,
                    zIndex: 9999,
                  }}
                >
                  {filter.options.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleOptionSelect(filter.value, value)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        selectedFilters[filter.value] === value
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Portal>
            )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => handleClearAll()}
        disabled={activeCount === 0}
        className={`flex items-center gap-2 px-4 py-0 rounded-full border border-gray-200 text-sm font-medium ${
          activeCount > 0 ? "text-gray-800" : "text-gray-400 cursor-not-allowed"
        }`}
      >
        Clear
        <span className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-xs">
          {activeCount}
        </span>
      </button>
    </div>
  );
}
