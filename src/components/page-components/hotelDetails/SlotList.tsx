"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Users } from "lucide-react";
import Image from "next/image";
import { useAppDispatch } from "@/utils/hooks";
import { setSelectedSlot } from "@/app/hoteldetail/[hotelid]/services/hotelDetailsSlice";
import { formatFriendlyTimeRange } from "@/utils/helper";
import StyledDatePicker from "@/components/ui/StyledDatePicker";
import TimePicker from "@/components/ui/TimePicker";
import SlotDetailModal from "./SlotDetailModal";
import moment from "moment";

const SlotList = ({ hotelSlots }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState("12:00:00 AM");
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const durationOptions = [
    { value: "3", label: "3h" },
    { value: "6", label: "6h" },
    { value: "12", label: "12h" },
  ];

  const calculateEndDateTime = (
    startDate: Date,
    timeString: string,
    hoursToAdd: number
  ) => {
    const [timePart, modifier] = timeString.split(" ");
    const [hourStr, minuteStr, secondStr] = timePart.split(":");

    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const second = parseInt(secondStr || "0", 10);

    // Convert to 24-hour format
    if (modifier === "PM" && hour < 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    // Combine start date and selected time into one moment
    const startMoment = moment(startDate).set({
      hour,
      minute,
      second,
      millisecond: 0,
    });

    // Add hours to calculate end
    const endMoment = startMoment.clone().add(hoursToAdd, "hours");

    return {
      checkOutDate: endMoment.format("YYYY-MM-DD"), // Local date
      checkOutTime: endMoment.format("hh:mm:ss A"), // 12-hour format with AM/PM
    };
  };

  const updateURLWithParams = (date: Date, time: string, duration: string) => {
    const { checkOutDate, checkOutTime } = calculateEndDateTime(
      date,
      time,
      parseInt(duration)
    );

    const params = new URLSearchParams();
    params.set("checkInDate", date.toISOString().split("T")[0]);
    params.set("checkInTime", time);
    params.set("checkOutDate", checkOutDate);
    params.set("checkOutTime", checkOutTime);
    params.set("duration", duration);

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const checkInDateFromUrl = searchParams.get("checkInDate");
    const checkInTimeFromUrl = searchParams.get("checkInTime");
    const durationFromUrl = searchParams.get("duration");

    if (checkInDateFromUrl) {
      setSelectedDate(new Date(checkInDateFromUrl));
    }

    if (checkInTimeFromUrl) {
      setTime(checkInTimeFromUrl);
    }

    if (durationFromUrl) {
      setSelectedDuration(durationFromUrl);
    }
  }, []);

  const handleSlotSelect = (room: any) => {
    if (!selectedDate || !selectedDuration) return;

    const { checkOutDate, checkOutTime } = calculateEndDateTime(
      selectedDate,
      time,
      parseInt(selectedDuration)
    );

    dispatch(setSelectedSlot(room));

    const checkInDateParam = encodeURIComponent(
      selectedDate.toISOString().split("T")[0]
    );

    router.push(
      `/booking?roomId=${room._id}&checkInDate=${checkInDateParam}&checkInTime=${time}&checkOutDate=${checkOutDate}&checkOutTime=${checkOutTime}&duration=${selectedDuration}`
    );
  };

  const renderCalculatedEndTime = () => {
    if (!selectedDate || !selectedDuration) return null;
    const { checkOutDate, checkOutTime } = calculateEndDateTime(
      selectedDate,
      time,
      parseInt(selectedDuration)
    );
    return (
      <div className="text-sm text-gray-600">
        End: {checkOutDate} at {checkOutTime}
      </div>
    );
  };

  return (
    <div>
      {/* Date, Time, and Duration Picker */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center justify-between sm:gap-10 my-10 flex-wrap">
        {/* Date Picker */}
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-base sm:text-lg font-semibold">Select Date:</h1>
          {/* <StyledDatePicker
            selectedDate={selectedDate}
            setSelectedDate={(date) => {
              setSelectedDate(date);
              if (date && selectedDuration) {
                updateURLWithParams(date, time, selectedDuration);
              }
            }}
            buttonClass="border border-gray-300 px-3 py-1 rounded-md"
          /> */}
        </div>

        {/* Time Picker */}
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-base sm:text-lg font-semibold">Time:</h1>
          <TimePicker
            value={time}
            onChange={(newTime) => {
              setTime(newTime);
              if (selectedDate && selectedDuration) {
                updateURLWithParams(selectedDate, newTime, selectedDuration);
              }
            }}
          />
        </div>

        {/* Duration Picker as Badges */}
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-base sm:text-lg font-semibold">Duration:</h1>
          <div className="flex gap-2 flex-wrap">
            {durationOptions.map((d) => {
              const isSelected = selectedDuration === d.value;
              return (
                <button
                  key={d.value}
                  type="button"
                  className={`px-4 py-1 text-sm font-medium rounded-full border transition ${
                    isSelected
                      ? "bg-primary-500 text-white border-primary-600"
                      : " text-gray-500 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    const newDuration = isSelected ? null : d.value;
                    setSelectedDuration(newDuration);
                    if (selectedDate && newDuration) {
                      updateURLWithParams(selectedDate, time, newDuration);
                    }
                  }}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Render calculated end time */}
        {/* <div className="w-full sm:w-auto">{renderCalculatedEndTime()}</div> */}
      </div>

      {/* Room Slots */}
      <div className="mb-10">
        <div className="grid grid-cols-1 gap-4">
          {hotelSlots?.data.map((room: any, roomIndex: number) => (
            <div
              key={roomIndex}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow-sm md:flex-row md:max-w-4xl hover:bg-primary-50 transition"
            >
              <Image
                src={room.images[0]}
                width={200}
                height={300}
                className="object-cover w-full rounded-t-2xl h-60 md:h-48 md:w-48 md:rounded-none md:rounded-s-2xl"
                alt={room.masterRoomName}
              />
              <div className="flex flex-col h-full justify-between p-4 leading-normal w-full overflow-hidden">
                <div>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 ">
                      {room.masterRoomName}
                    </h5>
                    <span className="text-md font-semibold text-primary-500">
                      AED {room.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    <span className="inline-flex items-center gap-1 ml-1">
                      <Users size={13} /> x {room.capacity}
                    </span>
                  </p>

                  {room?.amenities?.length > 0 && (
                    <div className="">
                      <div className="text-sm text-gray-500 list-disc list-inside mt-2 flex overflow-y-auto">
                        {room.amenities
                          .slice(0, 3)
                          .map((amenity: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-1.5 rounded-full min-w-fit"
                            >
                              {amenity}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setIsModalOpen(true);
                    }}
                    className="text-sm flex cursor-pointer items-center text-primary-500 hover:underline font-bold"
                  >
                    <span>See more </span>
                    <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => handleSlotSelect(room)}
                    disabled={!selectedDate || !selectedDuration}
                    className="ml-auto cursor-pointer bg-primary-500 text-md text-white font-semibold py-2 px-6 rounded-full hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <SlotDetailModal
          room={selectedRoom}
          setSelectedSlot={setSelectedSlot}
          selectedDate={selectedDate}
          onClose={() => {
            setSelectedRoom(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SlotList;
