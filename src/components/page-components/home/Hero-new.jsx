"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import StyledDatePicker from "@/components/ui/StyledDatePicker";
import { CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";
import Slider from "react-slick";

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

export default function Hero() {
    const router = useRouter();

    const handleSearch = () => {
        router.push(
            `/hotel-listings?city=${selectedRegion.cityName}&country=${selectedRegion.countryName}&checkIn=${queryParams2.checkIn}&checkedOut=${queryParams2.checkOut}`
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
            name: "Rooms",
            value: 0,
        }
    ])

    let [guests, setGuests] = useState([])
    let [childrens, setChildrens] = useState([])

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

    useEffect(() => {
        console.log(whoList)
        console.log(childrens)
        console.log(guests)
    }, [whoList, guests, childrens])

    return (
        <main className="relative min-h-screen">

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center md:pt-[50px] md:py-[80px] py-[40px]">
                <h1 className="text-[#4B4D4D] text-[40px] md:text-6xl lg:text-7xl font-[700] leading-tight text-center px-[16px]">
                    Find dream country<br /> hotels to rent
                </h1>
                <p className="px-[16px] text-[16px] font-[400] mt-[16px] text-center">Book hotels in packs of 3, 6 or 24 hours and choose the check-in time you want.</p>

                <div className=" w-[85%] flex-wrap md:flex-nowrap md:w-[1183px] container mx-auto bg-white p-[20px] flex justify-between mt-[7px] md:mt-[60px] z-50 rounded-[12px]">
                    <div
                        tabIndex={0}
                        onClick={() => setShowDropdownRegion(true)}
                        onBlur={() => setTimeout(() => setShowDropdownRegion(false), 150)}
                        className="mb-[10px] md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[300px] h-[60px]">
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

                    <div className="mb-[10px] md:mb-0 inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[12px] w-[calc(50%-5px)] md:w-[170px] h-[60px]">
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

                    <div className="mb-[10px] md:mb-0 inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[12px] w-[calc(50%-5px)] md:w-[170px] h-[60px]">
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
                        className="mb-[10px] md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[300px] h-[60px]">
                        <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Who</label>
                        <span
                            className="inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer">Add guests</span>
                        {showDropdownWho && whoList.length > 0 && (
                            <ul className="pb-3 absolute left-0 top-[50px] w-[100%] mt-1 bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] z-10 max-h-auto overflow-y-auto">
                                <li className=" mb-2 flex items-center justify-between px-3 sm:px-4 py-3 pb-0">
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
                                        className="flex flex-wrap items-center justify-between gap-2 py-3 cursor-pointer text-sm md:text-[16px] text-[#4B4D4D]"
                                    >
                                        <span className="px-[20px]">
                                            {item?.name}
                                        </span>
                                        <div className="px-[20px] w-full flex items-center justify-between w-max gap-2">
                                            <div
                                                onClick={() => {
                                                    let arr = [...whoList]
                                                    if (Number(arr[index].value) > 0) {
                                                        arr[index].value = Number(arr[index].value) - 1
                                                    }
                                                    let arr2 = [...guests]
                                                    arr2.pop()
                                                    let arr3 = [...childrens]
                                                    arr3.pop()
                                                    setChildrens(arr3)
                                                    setGuests(arr2)
                                                    setWhoList(arr)
                                                }}
                                                className="cursor-pointer w-[30px] h-[30px] rounded-[10px] border-[1px] border-[#626363] hover:border-[#EF4A23] hover:text-[#EF4A23] flex items-center justify-center text-[16px] text-[#4B4D4D]"
                                            >-</div>
                                            <span className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center text-[16px] text-[#4B4D4D]" >{item?.value ? item?.value : 0}</span>
                                            <div
                                                onClick={() => {
                                                    let arr = [...whoList]
                                                    arr[index].value = Number(arr[index].value) + 1
                                                    let arr2 = [...guests]
                                                    arr2.push({
                                                        room_no: arr[index].value,
                                                        guests: 0
                                                    })
                                                    let arr3 = [...childrens]
                                                    arr3.push({
                                                        room_no: arr[index].value,
                                                        value: 0,
                                                        childrens: []
                                                    })
                                                    setChildrens(arr3)
                                                    setGuests(arr2)
                                                    setWhoList(arr)
                                                }}
                                                className="cursor-pointer w-[30px] h-[30px] rounded-[10px] border-[1px] border-[#626363] hover:border-[#EF4A23] hover:text-[#EF4A23] flex items-center justify-center text-[16px] text-[#4B4D4D]"
                                            >+</div>
                                        </div>
                                        {guests.length ?
                                            guests.map((a, i) => (
                                                <React.Fragment key={`room${i}`}>
                                                    <div className="w-full mt-[10px] px-[20px]">
                                                        <span className="text-[#4B4D4D] text-[16px] font-[700] w-full flex justify-between items-center">
                                                            Room {i + 1}
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#EB001B" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#EB001B" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M9.5 16.5V10.5" stroke="#EB001B" strokeWidth="1.5" strokeLinecap="round" />
                                                                <path d="M14.5 16.5V10.5" stroke="#EB001B" strokeWidth="1.5" strokeLinecap="round" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="bg-[#FFF1ED] rounded-[6px] w-full mx-[10px] px-[10px] flex flex-col gap-[10px] py-[10px]">
                                                        <div
                                                            onMouseDown={() => {
                                                                // setQuery(location);
                                                                // setShowDropdown(false);
                                                            }}
                                                            className="flex flex-wrap items-center justify-between gap-2 py-0 cursor-pointer text-sm md:text-[16px] text-[#4B4D4D] w-full"
                                                        >
                                                            Guest
                                                            <div className="w-full flex items-center justify-between w-max gap-2">
                                                                <div
                                                                    onClick={() => {
                                                                        let arr = [...guests]
                                                                        if (Number(arr[i].guests) > 0) {
                                                                            arr[i].guests = Number(arr[i].guests) - 1
                                                                        }
                                                                        setGuests(arr)
                                                                    }}
                                                                    className="cursor-pointer w-[30px] h-[30px] rounded-[10px] border-[1px] border-[#626363] hover:border-[#EF4A23] hover:text-[#EF4A23] flex items-center justify-center text-[16px] text-[#4B4D4D]"
                                                                >-</div>
                                                                <span className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center text-[16px] text-[#4B4D4D]" >{guests[i]?.guests ? guests[i]?.guests : 0}</span>
                                                                <div
                                                                    onClick={() => {
                                                                        let arr = [...guests]
                                                                        arr[i].guests = Number(arr[i].guests) + 1
                                                                        setGuests(arr)
                                                                    }}
                                                                    className="cursor-pointer w-[30px] h-[30px] rounded-[10px] border-[1px] border-[#626363] hover:border-[#EF4A23] hover:text-[#EF4A23] flex items-center justify-center text-[16px] text-[#4B4D4D]"
                                                                >+</div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            onMouseDown={() => {
                                                                // setQuery(location);
                                                                // setShowDropdown(false);
                                                            }}
                                                            className="flex flex-wrap items-center justify-between gap-2 py-0 cursor-pointer text-sm md:text-[16px] text-[#4B4D4D] w-full"
                                                        >
                                                            <span className="flex flex-col">
                                                                Children
                                                                <span className="text-[#4B4D4D] text-[10px] font-[400]">0-17 years Old</span>
                                                            </span>
                                                            <div className="w-full flex items-center justify-between w-max gap-2">
                                                                <div
                                                                    onClick={() => {
                                                                        let arr = [...childrens]
                                                                        if (Number(arr[i].value) > 0) {
                                                                            arr[i].value = Number(arr[i].value) - 1
                                                                        }
                                                                        arr[i].childrens.pop()
                                                                        setChildrens(arr)
                                                                    }}
                                                                    className="cursor-pointer w-[30px] h-[30px] rounded-[10px] border-[1px] border-[#626363] hover:border-[#EF4A23] hover:text-[#EF4A23] flex items-center justify-center text-[16px] text-[#4B4D4D]"
                                                                >-</div>
                                                                <span className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center text-[16px] text-[#4B4D4D]" >{childrens[i]?.value ? childrens[i]?.value : 0}</span>
                                                                <div
                                                                    onClick={() => {
                                                                        let arr = [...childrens]
                                                                        arr[i].value = Number(arr[i].value) + 1
                                                                        arr[i].childrens?.push({
                                                                            name: `Child ${arr[i].value}`,
                                                                            value: 5
                                                                        })
                                                                        setChildrens(arr)
                                                                    }}
                                                                    className="cursor-pointer w-[30px] h-[30px] rounded-[10px] border-[1px] border-[#626363] hover:border-[#EF4A23] hover:text-[#EF4A23] flex items-center justify-center text-[16px] text-[#4B4D4D]"
                                                                >+</div>
                                                            </div>
                                                        </div>
                                                        <p className="pb-[10px] border-b-1 border-[#B5B3B3] text-[10px] text-[#4B4D4D] font-[400]">Please provide the right number of children's with there right age for best options and prices.</p>
                                                        {childrens[i]?.childrens?.length ?
                                                            <div className="flex flex-wrap items-center justify-between w-full ">
                                                                <div
                                                                    onMouseDown={() => {
                                                                        // setQuery(location);
                                                                        // setShowDropdown(false);
                                                                    }}
                                                                    className="flex flex-wrap items-center justify-between gap-2 py-0 cursor-pointer text-sm md:text-[16px] text-[#4B4D4D] w-full"
                                                                >
                                                                    Age of Children
                                                                </div>
                                                                {childrens[i]?.childrens?.map((b, ind) => (
                                                                    <div className="mt-[10px] flex items-center justify-between w-[calc(50%-10px)]">
                                                                        {b.name}
                                                                        <select className="text-center border-[#626363] border-1 w-[54px] h-[21.579px] rounded-[6px]">
                                                                            {Array.from({ length: 17 - 5 + 1 }, (_, i) => (
                                                                                <option key={i} value={i + 5}>
                                                                                    {i + 5}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            : null}
                                                    </div>
                                                </React.Fragment>
                                            ))
                                            : null}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Button fullWidth={false} className="w-full md:w-[14.37%] rounded-[12px] h-[60px]" onClick={handleSearch}>Search</Button>
                </div>

                <div className="sliderDiv w-full mx-auto mt-[-150px] md:mt-[-50px] px-[16px] md:px-[30px]">
                    <Slider touchMove={false} pauseOnHover={false} autoplay autoplaySpeed={2000} {...settings}>
                        <div className="text-black">
                            <img
                                alt="timeflyz"
                                className="w-full h-[680px] object-cover rounded-[20px]"
                                src="/img/heroSlide1.webp"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="text-black">
                            <img
                                alt="timeflyz"
                                className="w-full h-[680px] object-cover rounded-[20px]"
                                src="/img/heroSlide2.webp"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="text-black">
                            <img
                                alt="timeflyz"
                                className="w-full h-[680px] object-cover rounded-[20px]"
                                src="/img/heroSlide3.webp"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="text-black">
                            <img
                                alt="timeflyz"
                                className="w-full h-[680px] object-cover rounded-[20px]"
                                src="/img/heroSlide4.webp"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                        <div className="text-black">
                            <img
                                alt="timeflyz"
                                className="w-full h-[680px] object-cover rounded-[20px]"
                                src="/img/heroSlide5.webp"
                                loading="eager"
                                fetchPriority="high"
                            />
                        </div>
                    </Slider>
                </div>
            </div>
        </main>
    );
}
