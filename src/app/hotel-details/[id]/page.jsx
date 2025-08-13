"use client"
import React, { useState } from 'react'
import Navbar from "@/components/layout/Header-new";
import StyledDatePicker from "@/components/ui/StyledDatePicker";
import { CalendarDays, X } from "lucide-react";
import Button from "@/components/ui/Button";
import FooterNew from '../../../components/layout/FooterNew';
import CTA from '@/components/page-components/home/CTA';
import HotelChains from '../../../components/page-components/home/HotelChains';
import { useGetAllHotelsQuery } from "../../../components/page-components/home/Services/hotelsApi";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import Link from 'next/link';
import MapWithInfoWindow from '../../hotel-listings/Map';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import {
    useGetHotelReviewsQuery,
    useGetHotelRoomsQuery,
    useGetHotelsDetailsQuery,
    useGetHotelSlotsQuery,
} from "../../hoteldetail/[hotelid]/services/hotelDetailsApi";

function page() {
    let router = useRouter()
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const searchParams = useSearchParams();

    let apiStatus = JSON.parse(localStorage.getItem("api_status"))
    const productId = searchParams.get('productId');
    const tokenId = searchParams.get('tokenId');

    const {
        data: hotel,
        error,
        isLoading,
    } = useGetHotelsDetailsQuery({
        hotelId: id,
        sessionId: apiStatus?.sessionId,
        productId: productId,
        tokenId: tokenId
    });

    const {
        data: rooms,
        isLoading: roomsLoading,
    } = useGetHotelRoomsQuery({
        hotelId: id,
        sessionId: apiStatus?.sessionId,
        productId: productId,
        tokenId: tokenId
    });

    console.log(rooms)

    const [selectedDate, setSelectedDate] = useState(
        new Date()
    );
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

    const handleSearch = () => {
        if (!query.trim() || !selectedDate) return;

        const now = new Date();
        const checkInDateTime = new Date(
            selectedDate.setHours(now.getHours(), now.getMinutes(), 0, 0)
        );

        const durationInHours = parseInt(duration); // default: 3
        const checkOutDateTime = new Date(
            checkInDateTime.getTime() + durationInHours * 60 * 60 * 1000
        );

        const checkInDate = checkInDateTime.toISOString().split("T")[0];
        const checkInTime = checkInDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        const checkOutDate = checkOutDateTime.toISOString().split("T")[0];
        const checkOutTime = checkOutDateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        router.push(
            `/slots?city=${encodeURIComponent(
                query.trim()
            )}&checkInDate=${checkInDate}&checkInTime=${checkInTime}&checkOutDate=${checkOutDate}&checkOutTime=${checkOutTime}&duration=${duration}`
        );
    };

    const [showDropdownRooms, setShowDropdownRooms] = useState(false);
    const [roomList, setRoomList] = useState([
        {
            name: "1",
            value: 1
        },
        {
            name: "2",
            value: 2
        },
        {
            name: "3",
            value: 3
        }
    ])

    // const { data, isFetching } = useGetAllHotelsQuery({
    //     city: "sydney",
    //     checkInDate: selectedDate.toISOString().split("T")[0],
    //     limit: 4,
    //     page: 1,
    // });

    const SkeletonCard = () => (
        <div className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden flex flex-col h-full w-full md:w-[24%]">
            <div className="relative h-52 w-full bg-gray-200" />
            <div className="flex flex-col justify-between p-5 gap-4 flex-1">
                <div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        </div>
    );

    const { selectedCountry, currentPage, itemsPerPage } = useAppSelector(
        (state) => state.hotels
    );

    // const hotels = data?.data || [];

    let [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0);

    const slides = hotel?.data?.hotelImages?.map((img, i) => ({
        src: img.url,
        alt: img.caption,
        type: "image",
    }));

    let [submitReviewOpen, setSubmitReviewOpen] = useState(false)

    const [rating, setRating] = useState(4);
    const [hovered, setHovered] = useState(0);

    let [showReviewOpen, setShowReviewOpen] = useState(false)

    let [activeTab, setActiveTab] = useState("overview")

    const HotelRating = ({ rating = 0 }) => {
        const totalStars = 5;

        // Round to nearest half for half-star logic (optional)
        const roundedRating = Math.round(rating * 2) / 2;

        return (
            <div className='flex items-center gap-1 text-[#6B6B6B] text-[12px] font-[400] mt-[7px]'>
                {[...Array(totalStars)].map((_, index) => {
                    const currentStar = index + 1;

                    return (
                        <svg
                            key={index}
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                                fill={
                                    currentStar <= roundedRating
                                        ? "#4B4D4D"          // full star
                                        : currentStar - 0.5 === roundedRating
                                            ? "url(#half)"       // half star fill
                                            : "#D1D5DB"          // empty star
                                }
                            />
                            {/* Half star gradient */}
                            {currentStar - 0.5 === roundedRating && (
                                <defs>
                                    <linearGradient id="half">
                                        <stop offset="50%" stopColor="#4B4D4D" />
                                        <stop offset="50%" stopColor="#D1D5DB" />
                                    </linearGradient>
                                </defs>
                            )}
                        </svg>
                    );
                })}
                <span>Hotel</span>
            </div>
        );
    };

    console.log(hotel)

    return (
        <div className='hotelDetailsMain w-full'>
            <Navbar />

            <div className="md:shadow-[0_4px_50px_0_rgba(0,0,0,0.25)] w-[100%] flex-wrap md:flex-nowrap md:w-[1183px] container mx-auto bg-white p-[20px] flex justify-between mt-10 md:mt-[60px] z-50 rounded-[12px]">
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

            <div className='relative flex flex-wrap items-start justify-between px-5 md:px-[30px] mt-[20px] md:mt-[80px] gap-[10px]'>
                <div className='flex flex-wrap md:flex-nowrap w-[100%] items-center justify-between'>
                    <div>
                        <HotelRating rating={hotel?.data?.hotelRating} />
                        <h2 className='text-[24px] text-[#4B4D4D] font-[700] mt-[5px]'>{hotel?.data?.name}</h2>
                        <p className='text-[16px] text-[#6B6B6B] font-[400] flex flex-wrap md:flex-nowrap items-center gap-[5px] mt-[5px] '>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0832 7.49999C12.0832 8.65057 11.1504 9.58332 9.99984 9.58332C8.84925 9.58332 7.9165 8.65057 7.9165 7.49999C7.9165 6.3494 8.84925 5.41666 9.99984 5.41666C11.1504 5.41666 12.0832 6.3494 12.0832 7.49999Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                <path d="M11.0477 14.578C10.7666 14.8487 10.3909 15 10 15C9.609 15 9.23334 14.8487 8.95225 14.578C6.37842 12.084 2.92916 9.29791 4.61126 5.2531C5.52075 3.06609 7.70395 1.66666 10 1.66666C12.296 1.66666 14.4792 3.0661 15.3887 5.2531C17.0687 9.29282 13.6278 12.0926 11.0477 14.578Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                <path d="M15 16.6667C15 17.5872 12.7614 18.3333 10 18.3333C7.23857 18.3333 5 17.5872 5 16.6667" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            {hotel?.data?.address}, {hotel?.data?.city}, {hotel?.data?.country}
                            <a href='#' className='text-[#EF4A23] font-bold w-full md:w-auto'>Show Map</a>
                        </p>
                    </div>
                    <div className='absolute top-0 right-5 md:relative flex items-center gap-[10px]'>
                        <svg className='w-[16px] md:w-[32px] h-[16px] md:h-[32px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8808 26.6236C10.1191 23.8107 2.6665 17.3797 2.6665 11.5926C2.6665 7.76751 5.47352 4.66667 9.33317 4.66667C11.3332 4.66667 13.3332 5.33334 15.9998 8.00001C18.6665 5.33334 20.6665 4.66667 22.6665 4.66667C26.5261 4.66667 29.3332 7.76751 29.3332 11.5926C29.3332 17.3797 21.8806 23.8107 18.1189 26.6236C16.853 27.5701 15.1466 27.5701 13.8808 26.6236Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className='w-[16px] md:w-[32px] h-[16px] md:h-[32px]' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 8.66667C28 10.8758 26.2092 12.6667 24 12.6667C21.7908 12.6667 20 10.8758 20 8.66667C20 6.45754 21.7908 4.66667 24 4.66667C26.2092 4.66667 28 6.45754 28 8.66667Z" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M12 16C12 18.2092 10.2091 20 8 20C5.79087 20 4 18.2092 4 16C4 13.7908 5.79087 12 8 12C10.2091 12 12 13.7908 12 16Z" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M28 23.3333C28 25.5425 26.2092 27.3333 24 27.3333C21.7908 27.3333 20 25.5425 20 23.3333C20 21.1241 21.7908 19.3333 24 19.3333C26.2092 19.3333 28 21.1241 28 23.3333Z" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M11.6382 14.3327L20.3048 10.3333M11.6382 17.6667L20.3048 21.666" stroke="#4B4D4D" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>
                <div className='w-full md:w-[calc(100%-420px)] mt-[30px]'>
                    <div className='h-[500px] imageDivMain w-full flex items-center justify-between gap-[10px]'>
                        <div className='w-full md:w-[60%] h-full relative'>
                            <img
                                onClick={() => {
                                    setOpen(true)
                                    setIndex(0)
                                }}
                                src={hotel?.data?.hotelImages[0]?.url}
                                alt={hotel?.data?.hotelImages[0]?.caption}
                                className='h-[100%] cursor-pointer w-[100%] rounded-[12px] overflow-hidden object-cover'
                            />
                            <span onClick={() => setOpen(true)} className='cursor-pointer text-[#FFFFFF] text-[14px] font-[400] absolute bottom-[30px] left-[30px] bg-[#4B4D4D] rounded-[6px] h-[26px] w-[121px] flex items-center justify-center '>Show all photo</span>
                        </div>
                        <div className='hidden w-[40%] h-full gap-[10px] md:flex flex-col'>
                            <img
                                onClick={() => {
                                    setOpen(true)
                                    setIndex(1)
                                }}
                                src={hotel?.data?.hotelImages[1]?.url}
                                alt={hotel?.data?.hotelImages[1]?.caption}
                                className='h-[50%] cursor-pointer w-[100%] rounded-[12px] overflow-hidden object-cover'
                            />
                            <img
                                onClick={() => {
                                    setOpen(true)
                                    setIndex(2)
                                }}
                                src={hotel?.data?.hotelImages[2]?.url}
                                alt={hotel?.data?.hotelImages[2]?.caption}
                                className='h-[50%] cursor-pointer w-[100%] rounded-[12px] overflow-hidden object-cover'
                            />
                        </div>
                    </div>
                    <div className='w-full flex items-center hotelDetailTabs'>
                        <a
                            href='#overview'
                            onClick={() => setActiveTab("overview")}
                            className={`${activeTab === "overview" ? "active" : ""} w-[25%] text-center text-[16px] font-[500] text-[#4B4D4D] h-[50px] flex items-center justify-center`}>Overview
                        </a>
                        <a
                            href='#rooms'
                            onClick={() => setActiveTab("rooms")}
                            className={`${activeTab === "rooms" ? "active" : ""} w-[25%] text-center text-[16px] font-[500] text-[#4B4D4D] h-[50px] flex items-center justify-center`}>Rooms
                        </a>
                        <a
                            href='#reviews'
                            onClick={() => setActiveTab("reviews")}
                            className={`${activeTab === "reviews" ? "active" : ""} w-[25%] text-center text-[16px] font-[500] text-[#4B4D4D] h-[50px] flex items-center justify-center`}>Reviews
                        </a>
                        <a
                            href='#nearBy'
                            onClick={() => setActiveTab("nearBy")}
                            className={`${activeTab === "nearBy" ? "active" : ""} w-[25%] text-center text-[16px] font-[500] text-[#4B4D4D] h-[50px] flex items-center justify-center`}>Near by
                        </a>
                    </div>

                    <div className='mt-[30px]' id='overview'>
                        <h4 className='text-[20px] text-[#4B4D4D] font-[600] mb-[10px] '>Description</h4>
                        <p className='text-[16px] text-[#6B6B6B] font-[400] ' dangerouslySetInnerHTML={{ __html: hotel?.data?.description?.content }} >
                        </p>
                        <br />
                    </div>

                    <div className='h-[1px] w-full bg-[#CECECE] my-[30px]' />

                    <div className='mt-[30px]' id=''>
                        <h4 className='text-[20px] text-[#4B4D4D] font-[600] mb-[10px] '>Amenities</h4>
                        <ul className='flex flex-wrap gap-y-[20px] justify-between md:justify-start'>
                            {hotel?.data?.facilities?.map((a, i) => (
                                <li key={i} className='w-[49%] md:w-[32%] text-[#4B4D4D] text-[16px] font-[400] flex items-center gap-[10px] '>
                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 9L4.5 12.5L15 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='h-[1px] w-full bg-[#CECECE] my-[30px]' />

                    <div className='mt-[30px]' id='rooms'>
                        <h4 className='text-[20px] text-[#4B4D4D] font-[600] mb-[20px] '>Rooms</h4>
                        {rooms?.data?.roomRates?.perBookingRates?.map((a, i) => (
                            <div key={i} className='flex flex-wrap md:flex-nowrap shadow-[0_4px_10px_0_#00000026] p-[10px] rounded-[20px] mb-[20px]'>
                                <div className='w-full md:w-[159px] h-[159px]'>
                                    <img src={a?.roomImages?.length ? a?.roomImages[0] : "data:image/png;base64,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"} className='w-full md:w-auto h-full rounded-[12px] overflow-hidden' />
                                </div>
                                <div className='w-full md:w-[calc(100%-159px)] flex flex-wrap md:flex-nowrap justify-between md:px-[20px] py-[10px]'>
                                    <div className='w-full md:w-auto'>
                                        <h3 className='text-[20px] text-[#4B4D4D] font-[700] mb-[5px]'>{a?.roomType}</h3>
                                        <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>{a?.description}</p>
                                        {a?.maxOccupancyPerRoom != "0" &&
                                            <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.0002 13.3334V11.9803C11.0002 11.1521 10.6273 10.34 9.8737 9.99644C8.9545 9.57744 7.8521 9.33337 6.66683 9.33337C5.48158 9.33337 4.37916 9.57744 3.45995 9.99644C2.70634 10.34 2.3335 11.1521 2.3335 11.9803V13.3334" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13.6667 13.334V11.9809C13.6667 11.1527 13.2938 10.3406 12.5402 9.99709C12.3665 9.91789 12.1861 9.84489 12 9.77869" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6.66683 7.33329C7.95549 7.33329 9.00016 6.28862 9.00016 4.99996C9.00016 3.71129 7.95549 2.66663 6.66683 2.66663C5.37816 2.66663 4.3335 3.71129 4.3335 4.99996C4.3335 6.28862 5.37816 7.33329 6.66683 7.33329Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M10 2.76306C10.9638 3.04991 11.6667 3.94276 11.6667 4.99977C11.6667 6.05678 10.9638 6.94964 10 7.23651" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {a?.maxOccupancyPerRoom} Guests
                                            </p>
                                        }
                                        {a?.extrabeds != 0 &&
                                            <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.6668 11.6666H1.3335" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14.6668 14V10.6667C14.6668 9.4096 14.6668 8.78107 14.2763 8.39053C13.8858 8 13.2572 8 12.0002 8H4.00016C2.74308 8 2.11454 8 1.72402 8.39053C1.3335 8.78107 1.3335 9.4096 1.3335 10.6667V14" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7.33333 8V6.80893C7.33333 6.55515 7.2952 6.47027 7.0998 6.37025C6.693 6.16195 6.1991 6 5.66667 6C5.13423 6 4.64037 6.16195 4.2335 6.37025C4.03814 6.47027 4 6.55515 4 6.80893V8" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M11.9998 8V6.80893C11.9998 6.55515 11.9617 6.47027 11.7663 6.37025C11.3595 6.16195 10.8656 6 10.3332 6C9.8007 6 9.30684 6.16195 8.90004 6.37025C8.70464 6.47027 8.6665 6.55515 8.6665 6.80893V8" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M14 8V4.90705C14 4.44595 14 4.21541 13.8719 3.99769C13.7438 3.77997 13.5613 3.66727 13.1963 3.44189C11.7246 2.53319 9.93287 2 8 2C6.06711 2 4.27543 2.53319 2.80372 3.44189C2.43869 3.66727 2.25618 3.77997 2.12809 3.99769C2 4.21541 2 4.44595 2 4.90705V8" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                Extra king size
                                            </p>
                                        }
                                        <p className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mb-[5px]'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.2302 1.65192C7.60587 1.43955 7.79373 1.33337 8 1.33337C8.20627 1.33337 8.39413 1.43955 8.7698 1.65192L13.2302 4.17326C13.6059 4.38563 13.7937 4.49181 13.8969 4.66671C14 4.8416 14 5.05397 14 5.4787V10.5214C14 10.9461 14 11.1585 13.8969 11.3334C13.7937 11.5082 13.6059 11.6144 13.2302 11.8268L8.7698 14.3482C8.39413 14.5605 8.20627 14.6667 8 14.6667C7.79373 14.6667 7.60587 14.5605 7.2302 14.3482L2.7698 11.8268C2.39411 11.6144 2.20627 11.5082 2.10313 11.3334C2 11.1585 2 10.9461 2 10.5214V5.4787C2 5.05397 2 4.8416 2.10313 4.66671C2.20627 4.49181 2.39411 4.38563 2.7698 4.17326L7.2302 1.65192Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.3332 2.84705L8.75584 3.70045C8.3867 3.90017 8.20217 4.00003 7.99984 4.00003C7.7975 4.00003 7.61297 3.90017 7.24384 3.70045L5.6665 2.84705" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.00016 7.74356V14.6666M8.00016 7.74356L13.6668 4.66663M8.00016 7.74356L2.3335 4.66663" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2 8L3.92962 9.039C4.28823 9.23213 4.46753 9.32867 4.5671 9.50213C4.66667 9.67567 4.66667 9.89153 4.66667 10.3233V12.6667" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14.0002 8L12.0706 9.039C11.712 9.23213 11.5326 9.32867 11.433 9.50213C11.3335 9.67567 11.3335 9.89153 11.3335 10.3233V12.6667" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {a?.facilities?.map((b, i) => i < 5 ? `${b}, ` : `${b}.`).join()?.length > 200 ? `${a?.facilities?.map((b, i) => i < 5 ? `${b}, ` : `${b}.`).join().slice(0, 200)}...` : a?.facilities?.map((b, i) => i < 5 ? `${b}, ` : `${b}.`)}
                                        </p>

                                        {/* <span className='text-[14px] text-[#6B6B6B] font-[400] flex gap-[5px] items-center mt-[10px]'>
                                            Select room

                                            <div
                                                tabIndex={0}
                                                onClick={() => setShowDropdownRooms(true)}
                                                onBlur={() => setTimeout(() => setShowDropdownRooms(false), 150)}
                                                className="ml-2 md:mb-0 relative cursor-pointer inputDiv flex-col rounded-[6px] bg-[#E4E4E4] w-[66px] md:w-[66px] h-[30px] flex items-center justify-center">
                                                <span
                                                    className="inline-flex items-center w-max text-[14px] text-[#4B4D4D] font-[400] mt-[-5px] cursor-pointer">
                                                    1
                                                    <svg className='ml-4 mt-[2px]' width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.0001 1.00001L6.00005 6.00001L0.999976 1" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </span>
                                                {showDropdownRooms && roomList.length > 0 && (
                                                    <ul className="pb-3 absolute left-0 top-[30px] w-[100px] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] z-10 max-h-auto overflow-y-auto">
                                                        {roomList.map((item, index) => (
                                                            <li
                                                                key={index}
                                                                onMouseDown={() => {
                                                                    // setQuery(location);
                                                                    // setShowDropdown(false);
                                                                }}
                                                                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                            >
                                                                {item.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </span> */}
                                    </div>
                                    <div className='mt-[10px] md:mt-0 w-full md:w-auto md:h-full flex flex-wrap md:flex-nowrap flex-col justify-between'>
                                        <div className='md:text-right'>
                                            <h3 className='text-[20px] text-[#4B4D4D] font-[700] mb-0'>AED 45</h3>
                                            <span className='text-[12px] text-[#6B6B6B] font-[400] line-clamp-1'>for per hours</span>
                                        </div>
                                        <Button theme="outline" seletedBut={true} fullWidth={false} className="mt-[10px] md:mt-0 w-full md:w-[118px] rounded-[12px] h-[41px] text-[14px] text-[#EF4A23] font-[700] border-1-[#EF4A23] bg-[#FFF]">Select</Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className='h-[1px] w-full bg-[#CECECE] my-[30px]' />

                    <div className='mt-[30px]' id='reviews'>
                        <div className='flex flex-wrap md:flex-nowrap items-center justify-between'>
                            <h4 className='w-full md:w-auto text-[20px] text-[#4B4D4D] font-[600]'>Reviews </h4>
                            <div className='w-full md:w-auto text-[#6B6B6B] text-[16px] font-[400] flex items-center'>
                                <span className='mr-[10px] h-[22px] w-[40px] flex items-center justify-center bg-[#29AF52] text-[#fff] text-[16px] font-[600] rounded-[12px] '>8.7</span>
                                <b>Excellent</b> (19232 ratings)
                            </div>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>Matt Owens</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare. Ut cursus mauris turpis mauris nunc est. Et neque proin tincidunt mi integer ipsum accumsan. Vitae amet a est massa at non eros. Arcu massa praesent volutpat luctus et pellentesque aliquam. Diam sit magna arcu ornare. Pellentesque integer fusce nibh varius urna hac neque enim. Imperdiet volutpat tristique quis tristique. Enim sed at amet tincidunt. Ullamcorper scelerisque amet id morbi tempus nec arcu lectus. Consectetur non auctor fermentum tincidunt.
                            </p>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>Nick M</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare.
                            </p>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>David Seabrook</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare. Ut cursus mauris turpis mauris nunc est. Et neque proin tincidunt mi integer ipsum accumsan.
                            </p>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>Shiobain Corsie</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25 0L11.2145 6.0461L17.5717 6.0461L12.4286 9.7828L14.3931 15.8289L9.25 12.0922L4.10688 15.8289L6.07138 9.7828L0.928255 6.0461L7.2855 6.0461L9.25 0Z" fill="#D9D9D9" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare. Ut cursus mauris turpis mauris nunc est. Et neque proin tincidunt mi integer ipsum accumsan. Vitae amet a est massa at non eros. Arcu massa praesent volutpat luctus et pellentesque aliquam. Diam sit magna arcu ornare. Pellentesque integer fusce nibh varius urna hac neque enim. Imperdiet volutpat tristique quis tristique.
                            </p>
                        </div>

                        <div className='flex gap-y-4 md:gap-0 flex-wrap md:flex-nowrap items-center justify-between mt-[40px]'>
                            <Button onClick={() => setShowReviewOpen(true)} theme="outline" fullWidth={false} className="w-full md:w-[14.37%] rounded-[12px] h-[41px]">Show all Reviews</Button>
                            <Button onClick={() => setSubmitReviewOpen(true)} fullWidth={false} className="w-full md:w-[14.37%] rounded-[12px] h-[41px]">Submit a review</Button>
                        </div>
                    </div>

                    {/* <div id='nearBy' className="w-full md:w-full h-[300px] md:h-[581px] md:h-[581px] rounded-[20px] overflow-hidden mt-[30px]">
                        <MapWithInfoWindow selectedCity={"sydney"} hotelsData={{ data: [data?.data[0]] }} selectedHotelProps={data?.data[0]} />
                    </div> */}

                </div>
                <div className='w-full md:w-[390px] h-auto bg-[#F4F4F4] rounded-[12px] sticky top-[90px] mt-[30px] p-[15px] md:p-[30px]'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <h5 className='flex items-center gap-1 text-[#4B4D4D] text-[16px] font-[700] mb-[5px]'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2V6M8 2V6" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 16V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H12" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 10H21" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 19.5H14.5M16.5 22C15.9943 21.5085 14 20.2002 14 19.5C14 18.7998 15.9943 17.4915 16.5 17" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Check in
                            </h5>
                            <p className='text-[#4B4D4D] text-[16px] font-[400]'>05 Aug, 11:00 AM</p>
                        </div>
                        <div className='flex flex-col'>
                            <h5 className='flex items-center gap-1 text-[#4B4D4D] text-[16px] font-[700]'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2V6M8 2V6" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 10H21" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.5 18.5C14.0057 18.0085 16 16.7002 16 16C16 15.2998 14.0057 13.9915 13.5 13.5M15.5 16H9" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Check out
                            </h5>
                            <p className='text-[#4B4D4D] text-[16px] font-[400]'>05 Aug, 03:00 PM</p>
                        </div>
                    </div>

                    <div className='h-[1px] bg-[#CECECE] my-[10px]' />

                    <div className='flex flex-col'>
                        <h5 className='flex items-center gap-1 text-[#4B4D4D] text-[16px] font-[700] mb-[5px]'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 20V17.9704C16.5 16.7281 15.9407 15.5099 14.8103 14.9946C13.4315 14.3661 11.7779 14 10 14C8.22212 14 6.5685 14.3661 5.18968 14.9946C4.05927 15.5099 3.5 16.7281 3.5 17.9704V20" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20.5 20.001V17.9713C20.5 16.729 19.9407 15.5109 18.8103 14.9956C18.5497 14.8768 18.2792 14.7673 18 14.668" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 11C11.933 11 13.5 9.433 13.5 7.5C13.5 5.567 11.933 4 10 4C8.067 4 6.5 5.567 6.5 7.5C6.5 9.433 8.067 11 10 11Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 4.14453C16.4457 4.57481 17.5 5.91408 17.5 7.49959C17.5 9.0851 16.4457 10.4244 15 10.8547" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            2 Guests
                        </h5>
                        <p className='text-[#4B4D4D] text-[16px] font-[400]'>Deluxe king room</p>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'><span>Deluxe king room</span><span>4 Hours</span></p>
                    </div>

                    <div className='h-[1px] bg-[#CECECE] my-[10px]' />

                    <div className='flex flex-col'>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
                            <span>Room price</span>
                            <span>AED 150</span>
                        </p>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
                            <span>Tourism fee</span>
                            <span>AED 10</span>
                        </p>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
                            <span>VAT</span>
                            <span>AED 15</span>
                        </p>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
                            <span>Service Charge</span>
                            <span>AED 05</span>
                        </p>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
                            <span>Municipality fee</span>
                            <span>AED 02</span>
                        </p>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] flex justify-between items-center'>
                            <span>Discount 30%</span>
                            <span className='text-[#29AF52] text-[16px] font-[700]' >- AED 52.5</span>
                        </p>
                    </div>

                    <div className='flex flex-col mt-[20px]'>
                        <p className='text-[#4B4D4D] text-[24px] font-[700] flex justify-between items-center'>
                            <span>Total price</span>
                            <span className='text-[#EF4A23]'><span className='text-[16px] text-[#4B4D4D]'>AED</span> 122.5</span>
                        </p>
                    </div>

                    <div className='h-[1px] bg-[#CECECE] my-[10px]' />

                    <Button fullWidth={false} className="w-full md:w-full rounded-[12px] h-[60px] mt-[10px]" onClick={() => router.push("/hotel-details/test/booking")}>Reserve Now</Button>

                    <p className='text-[#6B6B6B] text-[12px] font-[400] mt-[10px] text-center'>
                        Lorem ipsum dolor sit amet consectetur. Vitae ultrices tempor congue tortor vitae ac at semper odio. Pharetra feugiat sem sit vestibulum.
                    </p>
                </div>
            </div>

            <section className="md:px-[30px] px-5 md:pt-0 pt-0 pb-[30px] md:pb-[80px] mt-[30px]">
                <h4 className='text-[20px] text-[#4B4D4D] font-[600] mb-[20px] '>You may also like</h4>

                {/* Hotel Cards or Skeleton */}
                {/* <div className="container max-w-[100%] flex items-center flex-wrap gap-[18px] mt-[28px]">
                    {isLoading || isFetching ? (
                        Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
                    ) : hotels.length > 0 ? (
                        hotels.map((hotel) => (
                            <Link className="md:w-[24%] w-full md:border-0 border-b-1 mb-5 pb-5 md:pb-0 md:mb-0 border-[lightgrey]" href={`/hoteldetail/${hotel.id}`} key={hotel.id}>
                                <div className="w-full bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                                    <div className="relative w-full overflow-hidden">
                                        <img
                                            src={hotel?.images[0]}
                                            alt={"abc"}
                                            className="h-[200px] md:h-[164px] w-full rounded-[20px] object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col justify-between pt-[15px] flex-1">
                                        <div className="">
                                            <span className="text-[20px] font-semibold text-[#4B4D4D]">
                                                ★★★★★
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-[16px] text-[#4B4D4D] font-[700] mt-[5px]">
                                                {hotel?.name}
                                            </h3>
                                            <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[5px]">
                                                {hotel?.state}
                                            </p>
                                        </div>

                                        <div className="text-sm mt-[5px]">
                                            <div>
                                                <span className="text-[12px] text-[#6B6B6B] font-[400]">
                                                    Per hour
                                                </span>{" "}
                                                <span className="ml-2 text-[20px] text-[#4B4D4D] font-[700]">AED {hotel?.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Link>
                        ))
                    ) : (
                        <>
                            No Result Found
                        </>
                    )}

                </div> */}
            </section>

            <CTA />

            <HotelChains />

            <FooterNew />

            {open && (
                <div className="rounded-[6px] flex items-center justify-center gap-2 fixed top-4 left-[30px] z-[10000] text-[#4B4D4D] text-[14px] bg-[#FFFFFF] w-[85px] h-[30px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_195_1411)">
                            <path d="M5 14.9788C5.10725 16.0691 5.34963 16.803 5.89742 17.3507C6.87997 18.3333 8.46133 18.3333 11.6241 18.3333C14.7868 18.3333 16.3682 18.3333 17.3507 17.3507C18.3333 16.3682 18.3333 14.7868 18.3333 11.6241C18.3333 8.46133 18.3333 6.87997 17.3507 5.89742C16.803 5.34963 16.0691 5.10725 14.9788 5" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M1.6665 8.33333C1.6665 5.19063 1.6665 3.61929 2.64281 2.64297C3.61913 1.66667 5.19047 1.66667 8.33317 1.66667C11.4758 1.66667 13.0473 1.66667 14.0235 2.64297C14.9998 3.61929 14.9998 5.19063 14.9998 8.33333C14.9998 11.476 14.9998 13.0474 14.0235 14.0237C13.0473 15 11.4758 15 8.33317 15C5.19047 15 3.61913 15 2.64281 14.0237C1.6665 13.0474 1.6665 11.476 1.6665 8.33333Z" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M1.6665 9.26542C2.18235 9.19983 2.70387 9.1675 3.22626 9.16858C5.43621 9.12775 7.59204 9.73025 9.30909 10.8687C10.9015 11.9245 12.0204 13.3775 12.4998 15" stroke="#4B4D4D" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M10.833 5.83333H10.8405" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_195_1411">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    {slides.length}
                </div>
            )}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={index}
                carousel={{ finite: true }}
            />

            <div className={`fixed inset-0 z-[1000] flex items-center justify-center transition-opacity duration-300 ${submitReviewOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div
                    className={`absolute inset-0 bg-[#000000CC] transition-opacity duration-300 ${submitReviewOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setSubmitReviewOpen(false)}
                ></div>

                <div className={`bg-white rounded-xl relative shadow-lg w-[614px] p-[20px] z-10 transform transition-all duration-300 ${submitReviewOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <button
                        onClick={() => setSubmitReviewOpen(false)}
                        className="absolute top-[20px] right-[20px] text-[#4B4D4D] hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h4 className='text-[#4B4D4D] text-[20px] font-[600]'>Leave a review</h4>

                    <div className='flex flex-wrap justify-between items-center gap-y-[10px] mt-[20px]'>
                        <div
                            tabIndex={0}
                            className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[49%] h-[60px]">
                            <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Full name</label>
                            <input
                                type='text'
                                placeholder='Enter name'
                                className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                        </div>
                        <div
                            tabIndex={0}
                            className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[49%] h-[60px]">
                            <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Email</label>
                            <input
                                type='email'
                                placeholder='Enter email'
                                className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                        </div>

                        <div className="relative mb-5 md:mb-0 inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-full md:w-[100%] h-[60px]">
                            <label className="m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Check out</label>
                            <StyledDatePicker
                                selectedDate={selectedDate}
                                className="w-[100%]"
                                fromReview={true}
                                icon={
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
                                        <CalendarDays size={20} />
                                    </div>
                                }
                                setSelectedDate={(date) => setSelectedDate(date)}
                            />
                            <label onClick={() => console.log(document.getElementsByClassName("datee")[0].click())} className='absolute right-[20px] top-[20px] cursor-pointer w-max h-max z-50'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2V6M8 2V6" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 10H21" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.5 15V22M21 18.5H14" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </label>

                        </div>

                        <div className="flex justify-center w-full">
                            {[...Array(5)].map((_, index) => {
                                const starNumber = index + 1;
                                const isFilled = starNumber <= (hovered || rating);

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setRating(starNumber)}
                                        onMouseEnter={() => setHovered(starNumber)}
                                        onMouseLeave={() => setHovered(0)}
                                        className={`text-[30px] transition-colors ${isFilled ? 'text-[#4B4D4D]' : 'text-[#D9D9D9]'
                                            }`}
                                        aria-label={`Rate ${starNumber} star${starNumber > 1 ? 's' : ''}`}
                                    >
                                        ★
                                    </button>
                                );
                            })}
                        </div>

                        <div
                            tabIndex={0}
                            className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[100%] h-auto">
                            <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Share comment</label>
                            <textarea
                                rows={5}
                                placeholder='Write your comment..'
                                className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                        </div>

                        <Button fullWidth={false} className="mx-auto w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]">Submit</Button>

                    </div>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-[1000] flex items-center justify-center transition-opacity duration-300 ${showReviewOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
                    }`}
            >
                <div
                    className={`absolute inset-0 bg-[#000000CC] transition-opacity duration-300 ${showReviewOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setShowReviewOpen(false)}
                ></div>

                <div
                    className={`bg-white rounded-xl relative shadow-lg w-[614px] max-h-[80vh] overflow-y-scroll p-[20px] z-10 transform transition-all duration-300 ${showReviewOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                >
                    <button
                        onClick={() => setShowReviewOpen(false)}
                        className="absolute top-[20px] right-[20px] text-[#4B4D4D] hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className='mt-[30px]'>
                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>Matt Owens</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare. Ut cursus mauris turpis mauris nunc est. Et neque proin tincidunt mi integer ipsum accumsan. Vitae amet a est massa at non eros. Arcu massa praesent volutpat luctus et pellentesque aliquam. Diam sit magna arcu ornare. Pellentesque integer fusce nibh varius urna hac neque enim. Imperdiet volutpat tristique quis tristique. Enim sed at amet tincidunt. Ullamcorper scelerisque amet id morbi tempus nec arcu lectus. Consectetur non auctor fermentum tincidunt.
                            </p>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>Nick M</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare.
                            </p>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>David Seabrook</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare. Ut cursus mauris turpis mauris nunc est. Et neque proin tincidunt mi integer ipsum accumsan.
                            </p>
                        </div>

                        <div className='mt-[20px]'>
                            <div className='flex items-center justify-between mb-[10px]'>
                                <h4 className='text-[16px] text-[#4B4D4D] font-[600]'>Shiobain Corsie</h4>
                                <div className='flex items-center gap-1'>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.75 0L10.7145 6.0461L17.0717 6.0461L11.9286 9.7828L13.8931 15.8289L8.75 12.0922L3.60688 15.8289L5.57138 9.7828L0.428255 6.0461L6.7855 6.0461L8.75 0Z" fill="#4B4D4D" />
                                    </svg>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25 0L11.2145 6.0461L17.5717 6.0461L12.4286 9.7828L14.3931 15.8289L9.25 12.0922L4.10688 15.8289L6.07138 9.7828L0.928255 6.0461L7.2855 6.0461L9.25 0Z" fill="#D9D9D9" />
                                    </svg>
                                </div>
                            </div>
                            <p className='text-[16px] text-[#6B6B6B] font-[400]'>
                                Lorem ipsum dolor sit amet consectetur. Risus purus orci a imperdiet cum ultricies sem egestas enim. Aliquam amet velit ut sed leo ornare. Ut cursus mauris turpis mauris nunc est. Et neque proin tincidunt mi integer ipsum accumsan. Vitae amet a est massa at non eros. Arcu massa praesent volutpat luctus et pellentesque aliquam. Diam sit magna arcu ornare. Pellentesque integer fusce nibh varius urna hac neque enim. Imperdiet volutpat tristique quis tristique.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page