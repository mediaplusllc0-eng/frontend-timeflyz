'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from "@/components/layout/Header-new";
import StyledDatePicker from "@/components/ui/StyledDatePicker";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useSearchHotelsQuery } from "../slots/Services/slotsApi";

import MapWithInfoWindow from "./Map";
import CTA from '@/components/page-components/home/CTA';
import HotelChains from '../../components/page-components/home/HotelChains';
import FooterNew from '../../components/layout/FooterNew';
import { useRouter, useSearchParams } from 'next/navigation';

let cities = [
    {
        "id": 2,
        "city_name": "Dubai",
        "country_name": "United Arab Emirates",
        "latitude": "25.270265579224",
        "longitude": "55.307498931885"
    },
    {
        "id": 1,
        "city_name": "karachi",
        "country_name": "pakistan",
        "latitude": "12.9678",
        "longitude": "77.5887"
    },
    {
        "id": 1,
        "city_name": "lahore",
        "country_name": "pakistan",
        "latitude": "12.9678",
        "longitude": "77.5887"
    },
    {
        "id": 1,
        "city_name": "islamabad",
        "country_name": "pakistan",
        "latitude": "12.9678",
        "longitude": "77.5887"
    },
    {
        "id": 3,
        "city_name": "Chennai",
        "country_name": "India",
        "latitude": "13.040538787842",
        "longitude": "80.233711242676"
    },
    {
        "id": 4,
        "city_name": "Delhi",
        "country_name": "India",
        "latitude": "28.7040592",
        "longitude": "77.10249019999999"
    },
    {
        "id": 5,
        "city_name": "London",
        "country_name": "United Kingdom",
        "latitude": "51.500999450684",
        "longitude": "-0.12634299695492"
    },
    {
        "id": 6,
        "city_name": "Mumbai",
        "country_name": "India",
        "latitude": "18.968976974487",
        "longitude": "72.818969726562"
    },
    {
        "id": 7,
        "city_name": "Miami beach",
        "country_name": "United states of america",
        "latitude": "25.790300369263",
        "longitude": "-80.130302429199"
    },
    {
        "id": 8,
        "city_name": "Singapore",
        "country_name": "Singapore",
        "latitude": "1.2930599451065",
        "longitude": "103.85600280762"
    },
    {
        "id": 9,
        "city_name": "Barcelona",
        "country_name": "Spain",
        "latitude": "41.387100219727",
        "longitude": "2.1700100898743"
    },
    {
        "id": 10,
        "city_name": "1. zurich old town–city centre",
        "country_name": "Switzerland",
        "latitude": "47.373659931838",
        "longitude": "8.5427136303716"
    },
    {
        "id": 11,
        "city_name": "Goa",
        "country_name": "India",
        "latitude": "15.2993",
        "longitude": "74.1240"
    },
    {
        "id": 12,
        "city_name": "Gran Canaria",
        "country_name": "Spain",
        "latitude": "27.9202202",
        "longitude": "-15.547437299999999"
    },
    {
        "id": 13,
        "city_name": "Berlin",
        "country_name": "Germany",
        "latitude": "52.520431518555",
        "longitude": "13.409406661987"
    },
    {
        "id": 14,
        "city_name": "Rome",
        "country_name": "Italy",
        "latitude": "41.89587020874",
        "longitude": "12.482617378235"
    },
    {
        "id": 15,
        "city_name": "Hamburg",
        "country_name": "Germany",
        "latitude": "53.54999923706",
        "longitude": "10"
    }
]

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

function kilometersToMiles(km) {
    const miles = km * 0.621371;
    return miles.toFixed(2);
}

const SkeletonCard = () => (
    <div className="bg-white w-full h-auto md:h-[175px] rounded-[20px] md:p-[8px] p-[15px] flex flex-wrap md:flex-nowrap gap-[16px] animate-pulse">
        <div className="relative w-full md:w-[159px] h-[120px] md:h-full rounded-[12px] overflow-hidden bg-gray-200" />

        <div className="flex flex-wrap md:flex-nowrap w-full md:w-[calc(100%-159px)] justify-between">
            <div className="w-full md:w-[59%] flex flex-col gap-3">
                <div className="h-[18px] bg-gray-200 rounded w-3/4" />
                <div className="h-[14px] bg-gray-200 rounded w-1/3" />
                <div className="h-[12px] bg-gray-200 rounded w-full" />
                <div className="h-[12px] bg-gray-200 rounded w-5/6" />
                <div className="h-[12px] bg-gray-200 rounded w-4/6" />
            </div>

            <div className="mt-4 md:mt-0 w-full md:w-[41%] h-full flex md:flex-col justify-between pr-[8px] py-[5px]">
                <div className="text-left md:text-right flex flex-col items-start md:items-end gap-1">
                    <div className="h-[18px] bg-gray-200 rounded w-[100px]" />
                    <div className="h-[12px] bg-gray-200 rounded w-[60px]" />
                </div>
                <div className="w-auto text-right">
                    <div className="ml-auto w-[140px] h-[40px] bg-gray-300 rounded-[12px]" />
                </div>
            </div>
        </div>
    </div>

);

const HotelCard = React.memo(({ item, selectHotel, router, selectedRegion, queryParams2 }) => {
    return (
        <div
            onMouseEnter={() => selectHotel(item)}
            // onClick={() => selectHotel(item)}
            className="bg-[#FFFFFF] w-full h-auto md:h-[175px] rounded-[20px] md:p-[8px] p-[15px] flex flex-wrap md:flex-nowrap gap-[16px] transition-all duration-300"
        >
            <div className="relative w-full md:w-[159px] h-full rounded-[12px] overflow-hidden">
                <img
                    src={item?.thumbNailUrl ? item?.thumbNailUrl : "data:image/png;base64,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"}
                    alt="hotel"
                    className="w-full h-full object-cover rounded-[12px] opacity-0 transition-opacity duration-500 ease-in-out"
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                    }}
                    key={item?.thumbNailUrl} // forces re-render on image change
                />

                <div className="flex justify-between items-center absolute top-0 left-0 p-[8px] w-full">
                    <span className="bg-[#29AF52] rounded-[30px] px-[10px] py-[2px] text-[11px] text-[#FFFF] font-[700]">
                        Popular choice
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" fill="#E4E4E4" />
                    </svg>
                </div>

                {/* <div className="absolute bottom-[8px] right-[8px]">
                                            <span className="bg-[#4B4D4D] w-[35px] h-[20px] flex items-center justify-center rounded-[12px] text-[12px] text-[#FFFFFF] font-[400]">
                                                {imageIndex[index]?.imageIndex + 1}/{imageIndex[index]?.imagesLength}
                                            </span>
                                        </div> */}

                {/* <div className="w-full px-[8px] absolute bottom-[50%] transform-[translate(0,50%)] flex justify-between items-center z-10">
                                            <button
                                                onClick={() => {
                                                    const arr = [...imageIndex];
                                                    if (arr[index].imageIndex > 0) {
                                                        arr[index].imageIndex -= 1;
                                                        setImageIndex(arr);
                                                    }
                                                }}
                                                className="border-0 outline-0 bg-[#ffffff99] w-[20px] h-[20px] rounded-full flex items-center justify-center hover:bg-[#FFF] transition"
                                            >
                                                {"<"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const arr = [...imageIndex];
                                                    if (arr[index].imageIndex < arr[index].imagesLength - 1) {
                                                        arr[index].imageIndex += 1;
                                                        setImageIndex(arr);
                                                    }
                                                }}
                                                className="border-0 outline-0 bg-[#ffffff99] w-[20px] h-[20px] rounded-full flex items-center justify-center hover:bg-[#FFF] transition"
                                            >
                                                {">"}
                                            </button>
                                        </div> */}
            </div>

            <div className='flex flex-wrap md:flex-nowrap w-full md:w-[calc(100%-159px)] justify-between'>
                <div className='w-full md:w-[59%]'>
                    <h2 className='text-[#4B4D4D] text-[16px] font-[700] mt-[5px] '>
                        {item?.hotelName?.length > 25 ? `${item?.hotelName?.slice(0, 25)}...` : item?.hotelName}
                    </h2>
                    <HotelRating rating={item?.hotelRating} />

                    <div className='flex items-start gap-2 mt-[6px]'>
                        <svg className='mt-[5px]' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66667 4.66666L6.32277 5.59602C5.87183 6.81466 5.64635 7.42399 5.20185 7.86852C4.75735 8.31299 4.14803 8.53846 2.92937 8.98946L2 9.33332L2.92937 9.67719C4.14803 10.1282 4.75735 10.3537 5.20185 10.7981C5.64635 11.2427 5.87183 11.852 6.32277 13.0706L6.66667 14L7.01053 13.0706C7.46153 11.852 7.687 11.2427 8.13147 10.7981C8.576 10.3537 9.18533 10.1282 10.4039 9.67719L11.3333 9.33332L10.4039 8.98946C9.18533 8.53846 8.576 8.31299 8.13147 7.86852C7.687 7.42399 7.46153 6.81466 7.01053 5.59602L6.66667 4.66666Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M12 2L11.8526 2.3983C11.6593 2.92058 11.5627 3.18173 11.3722 3.37222C11.1817 3.56272 10.9206 3.65935 10.3983 3.85261L10 4L10.3983 4.14739C10.9206 4.34065 11.1817 4.43728 11.3722 4.62778C11.5627 4.81827 11.6593 5.07942 11.8526 5.6017L12 6L12.1474 5.6017C12.3407 5.07942 12.4373 4.81827 12.6278 4.62777C12.8183 4.43728 13.0794 4.34065 13.6017 4.14739L14 4L13.6017 3.85261C13.0794 3.65935 12.8183 3.56272 12.6278 3.37222C12.4373 3.18173 12.3407 2.92058 12.1474 2.3983L12 2Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>

                        <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                            {item?.facilities?.slice(0, 6)?.map((a, i) => i < 5 ? `${a}, ` : `${a}.`).join()?.length > 80 ? `${item?.facilities?.slice(0, 6)?.map((a, i) => i < 5 ? `${a}, ` : `${a}.`).join().slice(0, 80)}...` : item?.facilities?.slice(0, 6)?.map((a, i) => i < 5 ? `${a}, ` : `${a}.`)}
                        </span>
                    </div>

                    <div className='flex items-start gap-2 mt-[10px]'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.66659 5.99998C9.66659 6.92045 8.92039 7.66665 7.99992 7.66665C7.07945 7.66665 6.33325 6.92045 6.33325 5.99998C6.33325 5.07951 7.07945 4.33331 7.99992 4.33331C8.92039 4.33331 9.66659 5.07951 9.66659 5.99998Z" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M8.83818 11.6624C8.61332 11.8789 8.31279 12 8.00005 12C7.68725 12 7.38672 11.8789 7.16185 11.6624C5.10279 9.66718 2.34338 7.43831 3.68906 4.20247C4.41665 2.45286 6.16321 1.33331 8.00005 1.33331C9.83685 1.33331 11.5834 2.45287 12.311 4.20247C13.655 7.43425 10.9023 9.67405 8.83818 11.6624Z" stroke="#4B4D4D" strokeWidth="1.5" />
                            <path d="M12 13.3333C12 14.0697 10.2091 14.6666 8 14.6666C5.79086 14.6666 4 14.0697 4 13.3333" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                            {kilometersToMiles(item?.distanceValue)} miles to City center
                        </span>
                    </div>

                    <div className='flex items-start gap-2 mt-[10px]'>
                        <span className='w-[29px] h-[17px] flex items-center justify-center rounded-[12px] bg-[#29AF52] text-[12px] text-[#ffffff] font-[600] '>{item?.hotelRating}</span>

                        {/* <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                                    <b>Excellent</b> (19232 ratings)
                                                </span> */}
                        <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                            <b>Ratings</b>
                        </span>
                    </div>
                </div>
                <div className='mt md:mt-0-5 w-full md:w-[41%] h-full flex md:flex-col justify-between pr-[8px] py-[5px]'>
                    <div className='text-left md:text-right'>
                        <h3 className='text-[#4B4D4D] text-[16px] font-[700] '>{item?.perNightArray ? item?.perNightArray[0]?.currency : ""} {item?.perNightArray ? item?.perNightArray[0]?.price : ""}</h3>
                        <span className='text-[#6B6B6B] text-[12px] font-[400] '>Per night</span>
                    </div>
                    <div className='w-auto text-right'>
                        <Button fullWidth={false} className="w-auto rounded-[12px] h-[40px] text-[14px]" onClick={() => {
                            router.push(
                                `/hotel-details/${item?.twxHotelId}?productId=${item?.productId}&tokenId=${item?.tokenId}&city=${selectedRegion.cityName}&country=${selectedRegion.countryName}&checkIn=${queryParams2.checkIn}&checkedOut=${queryParams2.checkOut}`
                            );
                        }}>Check Availability</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

function page() {

    const router = useRouter();

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
        let queryParams = { ...queryParams2 }
        queryParams.cityName = selectedRegion.cityName
        queryParams.countryName = selectedRegion.countryName
        setQueryParams(queryParams)
        router.push(
            `/hotel-listings?city=${selectedRegion.cityName}&country=${selectedRegion.countryName}&checkIn=${queryParams2.checkIn}&checkedOut=${queryParams2.checkOut}`
        );
    };

    const scrollRef = useRef(null);

    const scroll = (offset) => {
        scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    const filters = [
        "Rating 8.0+",
        "Al Ain",
        "Shahrjah",
        "Free cancellation",
        "Breakfast included",
        "Near city center",
        "Pets allowed",
        "WiFi"
    ];

    // let queryParams = { city: 'sydney', checkInDate: '2025-08-05' }

    let [selectedRegion, setselectedRegion] = useState({
        cityName: "Dubai",
        countryName: "United Arab Emirates",
    })

    let [queryParams2, setQueryParams2] = useState({
        "cityName": selectedRegion.cityName,
        "countryName": selectedRegion.countryName,
        "checkIn": new Date().toISOString().split("T")[0],
        "checkOut": new Date().toISOString().split("T")[0],
        "currency": "AED",
        "occupancy": [
            {
                "room_no": 1,
                "adult": 2,
                "child": 1,
                "child_age": [5]
            }
        ],
        "maxResult": 1000,
        "resultsPerPage": 1000,
        "nationality": "AE"
    })

    let [queryParams, setQueryParams] = useState({
        "cityName": "",
        "countryName": "",
        "checkIn": new Date().toISOString().split("T")[0],
        "checkOut": new Date().toISOString().split("T")[0],
        "currency": "AED",
        "occupancy": [
            {
                "room_no": 1,
                "adult": 2,
                "child": 1,
                "child_age": [5]
            }
        ],
        "maxResult": 1000,
        "resultsPerPage": 1000,
        "nationality": "AE"
    })

    const {
        data: hotelsData,
        isLoading: isHotelsLoading,
        isFetching,
        error,
        refetch: refetchHotels,
    } = useSearchHotelsQuery(queryParams, {
        skip: !queryParams.cityName,
    });

    let [selectedHotel, setSelectedHotel] = useState(false)

    useEffect(() => {
        if (hotelsData?.data?.itineraries) {
            setSelectedHotel(hotelsData?.data?.itineraries[0])
        }
    }, [hotelsData])

    const selectHotel = useCallback((hotel) => {
        setSelectedHotel((prevHotel) => {
            if (prevHotel?.twxHotelId !== hotel.twxHotelId) {
                return hotel;
            }
            return prevHotel;
        });
    }, []);


    const dropdownRef = useRef(null);
    const [showDropdownFeatureFilter, setShowDropdownFeatureFilter] = useState(false);
    const [featureFilterList, setFeatureFilterList] = useState([
        {
            name: "Featured stays",
            checked: false
        },
        {
            name: "Rating & Recommended",
            checked: false
        },
        {
            name: "Price & Recommended",
            checked: false
        },
        {
            name: "Distance & Recommended",
            checked: false
        },
        {
            name: "Top guest ratings",
            checked: false
        },
        {
            name: "Price only",
            checked: false
        },
        {
            name: "Distance from city center",
            checked: false
        },
    ])

    const dropdownRef2 = useRef(null);
    const [showDropdownFilters, setShowDropdownFilter] = useState(false);
    const [filterList, setFilterList] = useState([
        {
            name: "Popular filters",
            values: [
                {
                    name: "Breakfast included",
                    checked: false
                },
                {
                    name: "Free cancellation",
                    checked: false
                },
                {
                    name: "Parking",
                    checked: false
                },
                {
                    name: "Pool",
                    checked: false
                },
                {
                    name: "Beach",
                    checked: false
                },
                {
                    name: "Free WiFi",
                    checked: false
                },
                {
                    name: "Pet-friendly",
                    checked: false
                },
                {
                    name: "Spa",
                    checked: false
                },
                {
                    name: "Air conditioning",
                    checked: false
                },
                {
                    name: "Kitchen",
                    checked: false
                },
            ]
        },
        {
            name: "Payment",
            values: [
                {
                    name: "Free cancellation",
                    checked: false
                },
                {
                    name: "Pay at the property",
                    checked: false
                },
            ]
        },
        {
            name: "Property type",
            values: [
                {
                    name: "Hotels",
                    label: "Hotels, resorts and more",
                    checked: false
                },
                {
                    name: "Apartments",
                    label: "Entire houses / apartments",
                    checked: false
                },
                {
                    name: "Budget stays",
                    label: "B&Bs, hostels and more",
                    checked: false
                },
            ]
        },
        {
            name: "Meal options",
            values: [
                {
                    name: "Breakfast included",
                    label: "",
                    checked: false
                },
                {
                    name: "All-inclusive",
                    label: "All meals + some drinks and snacks included",
                    checked: false
                },
                {
                    name: "Half board",
                    label: "Breakfast and dinner included",
                    checked: false
                },
                {
                    name: "Full board",
                    label: "Breakfast, lunch and dinner included",
                    checked: false
                },
            ]
        },
        {
            name: "Property amenities",
            values: [
                {
                    name: "Parking",
                    checked: false
                },
                {
                    name: "Pool",
                    checked: false
                },
                {
                    name: "Beach",
                    checked: false
                },
                {
                    name: "Free WiFi",
                    checked: false
                },
                {
                    name: "Pet-friendly",
                    checked: false
                },
                {
                    name: "Spa",
                    checked: false
                },
                {
                    name: "Hot tub",
                    checked: false
                },
                {
                    name: "Air conditioning",
                    checked: false
                },
                {
                    name: "Kitchen",
                    checked: false
                },
                {
                    name: "Restaurant",
                    checked: false
                },
                {
                    name: "Gym",
                    checked: false
                },
                {
                    name: "24-hour reception",
                    checked: false
                },
                {
                    name: "Airport shuttle",
                    checked: false
                },
                {
                    name: "EV charger",
                    checked: false
                },
                {
                    name: "Sauna",
                    checked: false
                },
                {
                    name: "Indoor pool",
                    checked: false
                },
                {
                    name: "Sun umbrellas",
                    checked: false
                },
                {
                    name: "Adults only",
                    checked: false
                },
                {
                    name: "Fridge",
                    checked: false
                },
                {
                    name: "Hotel bar",
                    checked: false
                },
                {
                    name: "Non-smoking rooms",
                    checked: false
                },
                {
                    name: "Balcony",
                    checked: false
                },
            ]
        },
    ])

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdownFeatureFilter(false);
            }

            if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
                setShowDropdownFilter(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    let [imageIndex, setImageIndex] = useState([])

    // useEffect(() => {
    //     if (!hotelsData?.data?.itineraries) return;

    //     const imageIndexes = hotelsData.data.itineraries.map((a) => ({
    //         imageIndex: 0,
    //         imagesLength: a.images?.length || 0
    //     }));

    //     setImageIndex(imageIndexes);
    // }, [hotelsData?.data?.itineraries]);

    let searchParams = useSearchParams()
    useEffect(() => {
        let queryParams = { ...queryParams2 }

        const city = searchParams.get('city');
        const country = searchParams.get('country');
        const checkIn = searchParams.get('checkIn');
        const checkedOut = searchParams.get('checkedOut');

        setselectedRegion({
            cityName: city,
            countryName: country
        })

        queryParams.cityName = city
        queryParams.countryName = country
        queryParams.checkIn = checkIn
        queryParams.checkOut = checkedOut
        setQueryParams(queryParams)
        setQueryParams2(queryParams)
    }, [])

    useEffect(() => {
        console.log(isFetching)
    }, [isFetching])

    return (
        <div className='HotelListingMain'>
            <Navbar />

            <div className="md:shadow-[0_4px_50px_0_rgba(0,0,0,0.25)] w-[100%] flex-wrap md:flex-nowrap md:w-[1183px] container mx-auto bg-white p-[20px] flex justify-between mt-10 md:mt-[60px] z-50 rounded-[12px]">
                <div
                    tabIndex={0}
                    onClick={() => setShowDropdownRegion(true)}
                    onBlur={() => setTimeout(() => setShowDropdownRegion(false), 150)}
                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[25.36%] h-[60px]">
                    <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Where</label>
                    <span
                        className="inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer">{selectedRegion.cityName ? selectedRegion.cityName : "Select region(s)"}</span>
                    {showDropdownRegion && regionList.length > 0 && (
                        <ul className="pb-3 max-h-[300px] absolute left-0 top-[50px] w-[100%] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] z-10 max-h-auto overflow-y-auto">
                            <li className=" mb-2 flex items-center justify-between px-3 sm:px-4 py-3 border-b-1 border-b-gray-100">
                                Regions
                                <svg
                                    onClick={() => setTimeout(() => setShowDropdownRegion(false), 150)}
                                    width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 8L8.00108 23.9989M23.9989 24L8 8.00113" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </li>
                            {cities.map((item, index) => (
                                <li
                                    key={index}
                                    // onMouseDown={() => {
                                    //     // setQuery(location);
                                    //     // setShowDropdown(false);
                                    // }}
                                    onClick={() => {
                                        setTimeout(() => setShowDropdownRegion(false), 150)
                                        setselectedRegion({
                                            cityName: item?.city_name,
                                            countryName: item?.country_name
                                        })
                                    }}
                                    className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                >
                                    {/* <input
                                        onChange={(e) => {
                                            let arr = [...regionList]
                                            arr[index].checked = e.target.checked
                                            setRegionList(arr)
                                        }}
                                        className="accent-[#EF4A23]"
                                        checked={item?.checked} type="checkbox" id={`checkbox${index}`} /> */}
                                    <label htmlFor={`checkbox${index}`}>
                                        {item?.city_name}
                                        <br />
                                        ({item?.country_name})
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
                        selectedDate={queryParams2?.checkIn}
                        icon={
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
                                <CalendarDays size={20} />
                            </div>
                        }
                        setSelectedDate={(date) => {
                            let query = { ...queryParams2 }
                            query.checkIn = date.toISOString().split("T")[0]
                            setQueryParams2(query)
                        }}
                    />
                </div>

                <div className="mb-5 md:mb-0 inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[12px] w-full md:w-[14.37%] h-[60px]">
                    <label className="m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Check out</label>
                    <StyledDatePicker
                        className="border-0 outline-0 mt-[-5px]"
                        selectedDate={queryParams2?.checkOut}
                        icon={
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white flex items-center justify-center rounded-full">
                                <CalendarDays size={20} />
                            </div>
                        }
                        setSelectedDate={(date) => {
                            let query = { ...queryParams2 }
                            query.checkOut = date.toISOString().split("T")[0]
                            setQueryParams2(query)
                        }}
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
                                    {item?.name}
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
                                        <span className="w-[30px] h-[30px] rounded-[5px] border-[1px] border-[lightgrey] flex items-center justify-center text-[16px] text-[gray]" >{item?.value ? item?.value : 0}</span>
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

            <div className='px-5 md:px-auto flex-wrap md:flex-nowrap w-full sortFilterDiv mt-[50px] md:w-[1183px] mx-auto flex items-center pb-[35px]'>
                <div className='w-[100%] flex-wrap md:flex-nowrap flex gap-[10px]'>
                    <div className='w-full md:w-auto'>
                        <div
                            ref={dropdownRef}
                            tabIndex={0}
                            onClick={() => setShowDropdownFeatureFilter(true)}
                            className='relative cursor-pointer w-full flex flex-col'
                        >
                            <label className="text-[16px] text-[#4B4D4D] font-[500]">Sort by</label>
                            <span className='justify-between mt-[6px] text-[#848484] text-[16px] font-[400] flex items-center border-1 border-[#CECECE] py-[8px] px-[15px] rounded-[30px] h-[35px] w-full md:w-[178px]'>
                                Featured days
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0001 1.00001L6.00005 6.00001L0.999976 1" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>

                            {showDropdownFeatureFilter && featureFilterList.length > 0 && (
                                <ul className="pt-[20px] z-[50] pb-3 absolute left-0 top-[70px] w-[300px] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] max-h-auto overflow-y-auto">
                                    {featureFilterList.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                        >
                                            <input
                                                type="radio"
                                                name="featureFilter"
                                                id={`radio${index}`}
                                                className="accent-[#EF4A23]"
                                                checked={item?.checked}
                                                onChange={() => {
                                                    const updatedList = featureFilterList.map((feature, i) => ({
                                                        ...feature,
                                                        checked: i === index,
                                                    }));
                                                    setFeatureFilterList(updatedList);
                                                }}
                                            />
                                            <label htmlFor={`radio${index}`}>{item?.name}</label>
                                        </li>
                                    ))}
                                    <li className='text-right px-[20px] pb-0 pt-[10px] mt-[10px] border-t-1 border-[#80808035]'>
                                        <Button fullWidth={false} className="w-auto rounded-[12px] h-[40px] text-[14px]">Apply</Button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='w-full md:w-auto'>
                        <div
                            ref={dropdownRef2}
                            tabIndex={0}
                            onClick={() => setShowDropdownFilter(true)}
                            className='relative cursor-pointer w-full flex flex-col'
                        >
                            <label className="text-[16px] text-[#4B4D4D] font-[500]">Filters</label>
                            <span className='justify-between mt-[6px] text-[#848484] text-[16px] font-[400] flex items-center border-1 border-[#CECECE] py-[8px] px-[15px] rounded-[30px] h-[35px] w-full md:w-[178px]'>
                                Select
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0001 1.00001L6.00005 6.00001L0.999976 1" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>

                            {showDropdownFilters && filterList.length > 0 && (
                                <ul className="pt-[20px] max-h-[500px] flex justify-between items-center gap-2 flex-wrap z-[50] pb-3 absolute left-0 top-[70px] w-[650px] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] max-h-auto overflow-y-auto">
                                    {filterList.map((item, index) => (
                                        item?.name == "Popular filters" ?
                                            <>
                                                <li className='w-[100%] text-[16px] font-[700] px-3 sm:px-4 py-2 '>{item?.name}</li>
                                                {item?.values?.map((value, i) => (
                                                    <li
                                                        key={index}
                                                        className="w-[49%] flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name="featureFilter"
                                                            id={`radio${index}`}
                                                            className="accent-[#EF4A23]"
                                                            checked={value.checked}
                                                            onChange={() => {
                                                                // const updatedList = filterList[index]?.values.map((feature, i) => ({
                                                                //     ...feature,
                                                                //     checked: i === index,
                                                                // }));
                                                                // setFilterList(updatedList);
                                                            }}
                                                        />
                                                        <label htmlFor={`radio${index}`}>{value.name}</label>
                                                    </li>
                                                ))}
                                            </>
                                            :
                                            item?.name == "Payment" ?
                                                <>
                                                    <li className='w-[100%] text-[16px] font-[700] px-3 sm:px-4 py-2 '>{item?.name}</li>
                                                    {item?.values?.map((value, i) => (
                                                        <li
                                                            key={index}
                                                            className="w-[49%] flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name="featureFilter"
                                                                id={`radio${index}`}
                                                                className="accent-[#EF4A23]"
                                                                checked={value.checked}
                                                                onChange={() => {
                                                                    // const updatedList = filterList[index]?.values.map((feature, i) => ({
                                                                    //     ...feature,
                                                                    //     checked: i === index,
                                                                    // }));
                                                                    // setFilterList(updatedList);
                                                                }}
                                                            />
                                                            <label htmlFor={`radio${index}`}>{value.name}</label>
                                                        </li>
                                                    ))}
                                                </>
                                                :
                                                item?.name == "Property type" ?
                                                    <>
                                                        <li className='w-[100%] text-[16px] font-[700] px-3 sm:px-4 py-2 '>{item?.name}</li>
                                                        {item?.values?.map((value, i) => (
                                                            <li
                                                                key={index}
                                                                className="w-[100%] flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    name="featureFilter"
                                                                    id={`radio${index}`}
                                                                    className="accent-[#EF4A23]"
                                                                    checked={value.checked}
                                                                    onChange={() => {
                                                                        // const updatedList = filterList[index]?.values.map((feature, i) => ({
                                                                        //     ...feature,
                                                                        //     checked: i === index,
                                                                        // }));
                                                                        // setFilterList(updatedList);
                                                                    }}
                                                                />
                                                                <label className='flex flex-col' htmlFor={`radio${index}`}>
                                                                    {value.name}
                                                                    <span className='text-[12px] text-[lightgray]'>{value.label}</span>
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </>
                                                    :
                                                    item?.name == "Meal options" ?
                                                        <>
                                                            <li className='w-[100%] text-[16px] font-[700] px-3 sm:px-4 py-2 '>{item?.name}</li>
                                                            {item?.values?.map((value, i) => (
                                                                <li
                                                                    key={index}
                                                                    className="w-[49%] flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        name="featureFilter"
                                                                        id={`radio${index}`}
                                                                        className="accent-[#EF4A23]"
                                                                        checked={value.checked}
                                                                        onChange={() => {
                                                                            // const updatedList = filterList[index]?.values.map((feature, i) => ({
                                                                            //     ...feature,
                                                                            //     checked: i === index,
                                                                            // }));
                                                                            // setFilterList(updatedList);
                                                                        }}
                                                                    />
                                                                    <label className='flex flex-col' htmlFor={`radio${index}`}>
                                                                        {value.name}
                                                                        <span className='text-[12px] text-[lightgray]'>{value.label}</span>
                                                                    </label>
                                                                </li>
                                                            ))}
                                                        </>
                                                        :
                                                        item?.name == "Property amenities" &&
                                                        <>
                                                            <li className='w-[100%] text-[16px] font-[700] px-3 sm:px-4 py-2 '>{item?.name}</li>
                                                            {item?.values?.map((value, i) => (
                                                                <li
                                                                    key={index}
                                                                    className="w-[49%] flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        name="featureFilter"
                                                                        id={`radio${index}`}
                                                                        className="accent-[#EF4A23]"
                                                                        checked={value.checked}
                                                                        onChange={() => {
                                                                            // const updatedList = filterList[index]?.values.map((feature, i) => ({
                                                                            //     ...feature,
                                                                            //     checked: i === index,
                                                                            // }));
                                                                            // setFilterList(updatedList);
                                                                        }}
                                                                    />
                                                                    <label htmlFor={`radio${index}`}>{value.name}</label>
                                                                </li>
                                                            ))}
                                                        </>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className='w-full md:w-auto'>
                        <div className='w-full flex flex-col'>
                            <label className="text-[16px] text-[#4B4D4D] font-[500] ">Price</label>
                            <span className='justify-between mt-[6px] text-[#848484] text-[16px] font-[400] flex items-center border-1 border-[#CECECE] py-[8px] px-[15px] rounded-[30px] h-[35px] w-full md:w-[178px]'>
                                Select
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0001 1.00001L6.00005 6.00001L0.999976 1" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className='w-full md:w-auto'>
                        <div className='w-full flex flex-col'>
                            <label className="text-[16px] text-[#4B4D4D] font-[500] ">Location</label>
                            <span className='justify-between mt-[6px] text-[#848484] text-[16px] font-[400] flex items-center border-1 border-[#CECECE] py-[8px] px-[15px] rounded-[30px] h-[35px] w-full md:w-[178px]'>
                                Select
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.0001 1.00001L6.00005 6.00001L0.999976 1" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-[37%] mt-[30px]'>
                    <div className="relative w-full">
                        {/* Left arrow */}
                        <button
                            onClick={() => scroll(-150)}
                            className="shadow-[0_0_30px_25px_rgb(255,255,255)] absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1"
                        >
                            <FaChevronLeft className="text-gray-500" />
                        </button>

                        {/* Scrollabel container */}
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-3 px-[25px] py-2 
             [scrollbar-width:none] 
             [-ms-overflow-style:none] 
             [&::-webkit-scrollbar]:hidden"
                        >
                            {filters.map((label, i) => (
                                <div
                                    key={i}
                                    className="cursor-pointer flex-shrink-0 bg-[#F1F1F1] text-[#4B4D4D] text-[14px] font-[500] px-4 py-1.5 rounded-full whitespace-nowrap"
                                >
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* Right arrow */}
                        <button
                            onClick={() => scroll(150)}
                            className="shadow-[0_0_30px_25px_rgb(255,255,255)] absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1"
                        >
                            <FaChevronRight className="text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            <div className='listingDiv bg-[#F4F4F4] px-5 md:px-[30px] flex justify-between flex-wrap md:flex-nowrap py-[15px]'>
                <div className='mb-5 md:mb-0 Lists w-full md:w-[50%] pr-[20px]'>
                    {isFetching ?
                        <h5 className='mt-[20px] text-[#4B4D4D] text-[12px] font-[400] '>Loading...</h5>
                        :
                        <h5 className='mt-[20px] text-[#4B4D4D] text-[12px] font-[400] '>We found <b>{hotelsData?.data?.itineraries?.length ?? 0} hotels</b></h5>
                    }

                    <div className='Listings mt-[10px] flex flex-col gap-[10px]'>
                        {isFetching ?
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                            :
                            hotelsData?.data?.itineraries?.map((item, index) => {
                                return (
                                    <HotelCard
                                        key={item.twxHotelId}
                                        item={item}
                                        selectHotel={selectHotel}
                                        selectedRegion={selectedRegion}
                                        queryParams2={queryParams2}
                                        router={router}
                                    />
                                )
                            })}
                    </div>
                </div>
                <div className="w-full md:w-[50%] h-[300px] md:h-[calc(100vh-110px)] rounded-[20px] overflow-hidden sticky top-[95px]">
                    <MapWithInfoWindow selectedCity={queryParams.cityName} hotelsData={hotelsData} selectedHotelProps={selectedHotel} />
                </div>
            </div>

            <CTA />

            <HotelChains />

            <FooterNew />

        </div >
    )
}

export default page