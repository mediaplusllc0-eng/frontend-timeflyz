"use client";
import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "@/components/layout/Header";
import StyledDatePicker from "@/components/ui/StyledDatePicker";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";
import Slider from "react-slick";

export default function Hero() {
    const [selectedDate, setSelectedDate] = useState(
        new Date()
    );
    const dateInputRef = useRef(null);
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const locations = ["dubai", "sydney", "sharjah", "melbourne"];
    const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(query.toLowerCase())
    );
    const router = useRouter();

    const handlePlaceholderClick = () => {
        dateInputRef.current?.showPicker?.();
        dateInputRef.current?.click();
    };

    const duration = "3";

    const handleSearch = () => {
        // if (!query.trim() || !selectedDate) return;

        // const now = new Date();
        // const checkInDateTime = new Date(
        //     selectedDate.setHours(now.getHours(), now.getMinutes(), 0, 0)
        // );

        // const durationInHours = parseInt(duration); // default: 3
        // const checkOutDateTime = new Date(
        //     checkInDateTime.getTime() + durationInHours * 60 * 60 * 1000
        // );

        // const checkInDate = checkInDateTime.toISOString().split("T")[0];
        // const checkInTime = checkInDateTime.toLocaleTimeString("en-US", {
        //     hour: "2-digit",
        //     minute: "2-digit",
        //     second: "2-digit",
        //     hour12: true,
        // });

        // const checkOutDate = checkOutDateTime.toISOString().split("T")[0];
        // const checkOutTime = checkOutDateTime.toLocaleTimeString("en-US", {
        //     hour: "2-digit",
        //     minute: "2-digit",
        //     second: "2-digit",
        //     hour12: true,
        // });

        // router.push(
        //     `/slots?city=${encodeURIComponent(
        //         query.trim()
        //     )}&checkInDate=${checkInDate}&checkInTime=${checkInTime}&checkOutDate=${checkOutDate}&checkOutTime=${checkOutTime}&duration=${duration}`
        // );

        router.push(
            `/hotel-listings?cities=${regionList.filter((a) => a.checked).map((a) => a.name)}&checkIn=${checkedIn}&checkedOut=${checkedOut}`
        );
    };

    // const handleCheckAvailability = () => {
    //   if (!query.trim() || !selectedDate) return;
    //   router.push(
    //     `/slots?city=${encodeURIComponent(
    //       query.trim()
    //     )}&checkInDate=${encodeURIComponent(
    //       selectedDate.toISOString().split("T")[0]
    //     )}`
    //   );
    // };

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [showDropdownRegion, setShowDropdownRegion] = useState(false);
    const [regionList, setRegionList] = useState([
        {
            name: "Dubai",
            checked: false
        },
        {
            name: "Sydney",
            checked: false
        },
        {
            name: "Sharjah",
            checked: false
        },
        {
            name: "Melbourne",
            checked: false
        },
    ])

    const [showDropdownWho, setShowDropdownWho] = useState(false);
    const [whoList, setWhoList] = useState([
        {
            name: "Guests",
            value: 0
        },
        {
            name: "Bedrooms",
            value: 0
        },
        {
            name: "Bathrooms",
            value: 0
        }
    ])

    let [checkedIn, setCheckedIn] = useState("")
    let [checkedOut, setCheckedOut] = useState("")

    return (
        <main className="relative min-h-screen">

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center md:pt-[50px] md:py-[80px] py-[30px]">
                <h1 className="text-[#4B4D4D] text-3xl md:text-6xl lg:text-7xl font-[700] leading-tight text-center">
                    Find dream country<br /> hotels to rent
                </h1>
                <p className="text-[16px] font-[400] mt-2 text-center">Book hotels in packs of 3, 6 or 24 hours and choose the check-in time you want.</p>

                <div className="w-[100%] flex-wrap md:flex-nowrap md:w-[1183px] container mx-auto bg-white p-[20px] flex justify-between mt-10 md:mt-[60px] z-50 rounded-[12px]">
                    <div
                        tabIndex={0}
                        onClick={() => setShowDropdownRegion(true)}
                        onBlur={() => setTimeout(() => setShowDropdownRegion(false), 150)}
                        className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[25.36%] h-[60px]">
                        <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Where</label>
                        <span
                            className="inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer">Select region(s)</span>
                        {showDropdownRegion && regionList.length > 0 && (
                            <ul className="pb-3 absolute left-0 top-[50px] w-[100%] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] z-10 max-h-auto overflow-y-auto">
                                <li className=" mb-2 flex items-center justify-between px-3 sm:px-4 py-3 border-b-1 border-b-gray-100">
                                    Regions
                                    <svg
                                        onClick={() => setTimeout(() => setShowDropdownRegion(false), 150)}
                                        width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 8L8.00108 23.9989M23.9989 24L8 8.00113" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </li>
                                {regionList.map((item, index) => (
                                    <li
                                        key={index}
                                        onMouseDown={() => {
                                            // setQuery(location);
                                            // setShowDropdown(false);
                                        }}
                                        className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                    >
                                        <input
                                            onChange={(e) => {
                                                let arr = [...regionList]
                                                arr[index].checked = e.target.checked
                                                setRegionList(arr)
                                            }}
                                            className="accent-[#EF4A23]"
                                            checked={item.checked} type="checkbox" id={`checkbox${index}`} />
                                        <label htmlFor={`checkbox${index}`}>
                                            {item.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-5 md:mb-0 inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[12px] w-full md:w-[14.37%] h-[60px]">
                        <label className="m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Check in</label>
                        <StyledDatePicker
                            className="border-0 outline-0 mt-[-5px]"
                            selectedDate={selectedDate}
                            icon={
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
                                    <CalendarDays size={20} />
                                </div>
                            }
                            setSelectedDate={(date) => setSelectedDate(date)}
                        />
                    </div>

                    <div className="mb-5 md:mb-0 inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[12px] w-full md:w-[14.37%] h-[60px]">
                        <label className="m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Check out</label>
                        <StyledDatePicker
                            selectedDate={selectedDate}
                            icon={
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
                                    <CalendarDays size={20} />
                                </div>
                            }
                            setSelectedDate={(date) => setSelectedDate(date)}
                        />
                    </div>

                    <div
                        tabIndex={0}
                        onClick={() => setShowDropdownWho(true)}
                        onBlur={() => setTimeout(() => setShowDropdownWho(false), 150)}
                        className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[25.36%] h-[60px]">
                        <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Who</label>
                        <span
                            className="inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer">Add guests</span>
                        {showDropdownWho && whoList.length > 0 && (
                            <ul className="pb-3 absolute left-0 top-[50px] w-[100%] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] z-10 max-h-auto overflow-y-auto">
                                <li className=" mb-2 flex items-center justify-between px-3 sm:px-4 py-3 border-b-1 border-b-gray-100">
                                    Select
                                    <svg
                                        onClick={() => setTimeout(() => setShowDropdownWho(false), 150)}
                                        width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 8L8.00108 23.9989M23.9989 24L8 8.00113" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </li>
                                {whoList.map((item, index) => (
                                    <li
                                        key={index}
                                        onMouseDown={() => {
                                            // setQuery(location);
                                            // setShowDropdown(false);
                                        }}
                                        className="flex items-center justify-between gap-2 px-3 py-3 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                    >
                                        {item.name}
                                        <div className="w-full flex items-center justify-between w-max gap-2">
                                            <div
                                                onClick={() => {
                                                    let arr = [...whoList]
                                                    if (Number(arr[index].value) > 0) {
                                                        arr[index].value = Number(arr[index].value) - 1
                                                    }
                                                    setWhoList(arr)
                                                }}
                                                className="cursor-pointer w-[30px] h-[30px] rounded-[30px] border-[1px] border-[lightgrey] flex items-center justify-center text-[16px] text-[gray]"
                                            >-</div>
                                            <span className="w-[30px] h-[30px] rounded-[5px] border-[1px] border-[lightgrey] flex items-center justify-center text-[16px] text-[gray]" >{item.value ? item.value : 0}</span>
                                            <div
                                                onClick={() => {
                                                    let arr = [...whoList]
                                                    arr[index].value = Number(arr[index].value) + 1
                                                    setWhoList(arr)
                                                }}
                                                className="cursor-pointer w-[30px] h-[30px] rounded-[30px] border-[1px] border-[lightgrey] flex items-center justify-center text-[16px] text-[gray]"
                                            >+</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Button fullWidth={false} className="w-full md:w-[14.37%] rounded-[12px] h-[60px]" onClick={handleSearch}>Search</Button>
                </div>

                <div className="sliderDiv w-full mx-auto md:mt-[-50px] px-5 md:px-[30px]">
                    <Slider touchMove={false} pauseOnHover={false} autoplay autoplaySpeed={2000} {...settings}>
                        <div className="text-black">
                            <img src="/img/heroSlide1.png" className="w-full rounded-[20px]" />
                        </div>
                        <div className="text-black">
                            <img src="/img/heroSlide2.png" className="w-full rounded-[20px]" />
                        </div>
                        <div className="text-black">
                            <img src="/img/heroSlide3.png" className="w-full rounded-[20px]" />
                        </div>
                        <div className="text-black">
                            <img src="/img/heroSlide4.png" className="w-full rounded-[20px]" />
                        </div>
                        <div className="text-black">
                            <img src="/img/heroSlide5.png" className="w-full rounded-[20px]" />
                        </div>
                    </Slider>
                </div>
            </div>
        </main>
    );
}
