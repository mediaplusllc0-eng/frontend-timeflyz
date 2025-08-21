"use client";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const wrapperRef = useRef<HTMLDivElement | any>(null);
  const hourRef = useRef<HTMLDivElement | any>(null);
  const minuteRef = useRef<HTMLDivElement | any>(null);
  const secondRef = useRef<HTMLDivElement | any>(null);

  const format = (num: number) => String(num).padStart(2, "0");

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Scroll selected time to center
  useEffect(() => {
    const scrollToCenter = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current?.offsetTop && ref.current.parentElement) {
        ref.current.parentElement.scrollTo({
          top: ref.current.offsetTop - 48, // 48 = padding for centering
          behavior: "smooth",
        });
      }
    };
    if (open) {
      scrollToCenter(hourRef);
      scrollToCenter(minuteRef);
      scrollToCenter(secondRef);
    }
  }, [open, hour, minute, second]);

  // Parse incoming value
  useEffect(() => {
    if (value) {
      const [timePart, ampmPart] = value.split(" ");
      const [h, m, s] = timePart.split(":");
      setHour(h);
      setMinute(m);
      setSecond(s || "00");
      setAmpm(ampmPart);
    }
  }, [value]);

  // Set current time
  const handleSetNow = () => {
    const now = moment();
    let h = now.hours();
    const ampmVal = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    setHour(format(h));
    setMinute(format(now.minutes()));
    setSecond(format(now.seconds()));
    setAmpm(ampmVal);
  };

  // Confirm time
  const handleOk = () => {
    let h = parseInt(hour, 10);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    const time = moment().set({
      hour: h,
      minute: parseInt(minute),
      second: parseInt(second),
    });

    onChange(time.format("hh:mm:ss A"));
    setOpen(false);
  };

  const renderScrollList = (
    values: string[],
    selected: string,
    onSelect: (val: string) => void,
    ref: React.RefObject<HTMLDivElement>
  ) => (
    <div className="h-30  overflow-y-auto w-12 text-center scroll-smooth relative hide-scrollbar">
      <div className="h-12" />
      {values.map((val) => (
        <div
          key={val}
          ref={selected === val ? ref : null}
          onClick={() => onSelect(val)}
          className={`py-2 cursor-pointer text-sm rounded-full ${
            selected === val ? "bg-primary-500 text-white" : "hover:bg-gray-50"
          }`}
        >
          {val}
        </div>
      ))}
      <div className="h-12" />
    </div>
  );

  return (
    <div className="relative inline-block" ref={wrapperRef}>

      <input
        type="text"
        value={`${hour}:${minute}:${second} ${ampm}`}
        onClick={() => setOpen(!open)}
        readOnly
        className="border border-gray-300 text-[#4B4D4D] rounded-md px-4 py-2 text-sm w-48 cursor-pointer focus:outline-none focus:border-primary-300"
      />

      {open && (
        <div className="absolute mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-lg px-4 pt-0 pb-4 space-y-3 w-max">
          <div className="flex gap-2">
            {/* Hour */}
            {renderScrollList(
              Array.from({ length: 12 }, (_, i) => format((i + 1) % 13 || 1)),
              hour,
              setHour,
              hourRef
            )}
            {/* Minute */}
            {renderScrollList(
              Array.from({ length: 60 }, (_, i) => format(i)),
              minute,
              setMinute,
              minuteRef
            )}
            {/* Second */}
            {renderScrollList(
              Array.from({ length: 60 }, (_, i) => format(i)),
              second,
              setSecond,
              secondRef
            )}
            {/* AM/PM */}
            <div className="flex flex-col items-center justify-center gap-2 w-10">
              {["AM", "PM"].map((period) => (
                <div
                  key={period}
                  onClick={() => setAmpm(period)}
                  className={`py-2 px-2 cursor-pointer text-xs rounded-lg text-center w-full hide-scrollbar ${
                    ampm === period
                      ? "bg-primary-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {period}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center text-sm pt-0">
            <button
              onClick={handleSetNow}
              className="text-primary-500 hover:underline"
            >
              Now
            </button>
            <button
              onClick={handleOk}
              className="bg-primary-500 text-white px-4 py-1 rounded-lg    hover:bg-primary-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
