"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiArrowRight, HiMagnifyingGlass } from "react-icons/hi2";
import Link from "next/link";

import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "../ui/Modal";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgetPassword from "./auth/ForgetPassword";
import OtpVerification from "./auth/OtpVerification";
import ResetPassword from "./auth/ResetPassword";
import Image from "next/image";
import OtpVerificationRegistration from "./auth/OtpVerificationRegistration";
import { useAppDispatch } from "@/utils/hooks";
import { useGetProfileQuery } from "@/app/profile/services/userApi";
import { setProfile } from "@/app/profile/services/userSlice";

const NAV_ITEMS = [
    { title: "Home", href: "/" },
    { title: "How does it work?", href: "/its-work" },
    { title: "Contact Us", href: "/Contacts" },
];

export default function Navbar({
    isFixed = false,
}) {

    const [scrolled, setScrolled] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isLnDropdownOpen, setIsLnDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [selectedCurrency, setSelectedCurrency] = useState("AED");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const langDropdownRef = useRef(null);
    const currencyDropdownRef = useRef(null);

    const dropdownRef2 = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        const handleClickOutside = (event) => {
            const dropdown = document.querySelector(".absolute.right-0.mt-2");
            const dropdown2 = document.querySelector(".fixed.left-0.top-0");
            console.log(dropdown2)
            if (dropdown && !dropdown.contains(event.target)) {
                setIsLnDropdownOpen(false);
                setIsLangDropdownOpen(false);
                setIsCurrencyDropdownOpen(false);
            }

            if (dropdown2 && !dropdown2.contains(event.target)) {
                // setShowDropdown(false)
            }

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsUserDropdownOpen(false);
            }
            if (
                dropdownRef2.current &&
                !dropdownRef2.current.contains(event.target)
            ) {
                // setShowDropdown(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [showDropdown, setShowDropdown] = useState(false);
    const [menuList, setMenuList] = useState([
        {
            name: "My reservations",
            path: "/dashboard/reservations",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.99153 15.1475C2.86713 15.0618 2.75138 14.9654 2.64298 14.857C1.66667 13.8807 1.66667 12.3093 1.66667 9.16667C1.66667 6.02397 1.66667 4.45262 2.64298 3.47631C3.61929 2.5 5.19063 2.5 8.33333 2.5H11.6667C14.8093 2.5 16.3808 2.5 17.357 3.47631C18.3333 4.45262 18.3333 6.02397 18.3333 9.16667C18.3333 12.3093 18.3333 13.8807 17.357 14.857C17.2486 14.9654 17.1329 15.0618 17.0085 15.1475" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7.23858 14.105C6.51809 14.5438 4.62903 15.4397 5.7796 16.5608C6.34164 17.1083 6.96761 17.5 7.75461 17.5H12.2454C13.0324 17.5 13.6583 17.1083 14.2204 16.5608C15.371 15.4397 13.4819 14.5438 12.7614 14.105C11.0719 13.0761 8.92808 13.0761 7.23858 14.105Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0833 9.16665C12.0833 10.3172 11.1506 11.25 10 11.25C8.84942 11.25 7.91667 10.3172 7.91667 9.16665C7.91667 8.01605 8.84942 7.08331 10 7.08331C11.1506 7.08331 12.0833 8.01605 12.0833 9.16665Z" stroke="#4B4D4D" strokeWidth="1.5" />
            </svg>
        },
        {
            name: "My favorites",
            path: "/dashboard/favorites",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.67558 16.6398C6.32452 14.8817 1.66667 10.8624 1.66667 7.24539C1.66667 4.85471 3.42105 2.91669 5.83333 2.91669C7.08333 2.91669 8.33333 3.33335 10 5.00002C11.6667 3.33335 12.9167 2.91669 14.1667 2.91669C16.5789 2.91669 18.3333 4.85471 18.3333 7.24539C18.3333 10.8624 13.6755 14.8817 11.3244 16.6398C10.5333 17.2314 9.46675 17.2314 8.67558 16.6398Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            name: "How it works",
            path: "/how-its-work",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 2.5V17.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 2.5V17.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 5.83331H2.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 14.1667H2.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            name: "About us",
            path: "/about-us",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 9.99137V12.0834C2.5 14.8332 2.5 16.2081 3.35427 17.0625C4.20854 17.9167 5.58347 17.9167 8.33333 17.9167H11.6667C14.4165 17.9167 15.7914 17.9167 16.6457 17.0625C17.5 16.2081 17.5 14.8332 17.5 12.0834V9.99137C17.5 8.59029 17.5 7.88982 17.2034 7.28342C16.9068 6.67702 16.3539 6.24694 15.248 5.3868L13.5813 4.0905C11.8609 2.75242 11.0007 2.08337 10 2.08337C8.99925 2.08337 8.13908 2.75242 6.41868 4.0905L4.75201 5.3868C3.64611 6.24694 3.09316 6.67702 2.79658 7.28342C2.5 7.88982 2.5 8.59029 2.5 9.99137Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5002 14.1666C11.8339 14.6853 10.9587 15 10.0002 15C9.04158 15 8.16642 14.6853 7.50015 14.1666" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            name: "Help center",
            path: "/help-center",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_86_241)">
                    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6024 1.66663 10 1.66663C5.39763 1.66663 1.66667 5.39759 1.66667 9.99996C1.66667 14.6023 5.39763 18.3333 10 18.3333Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.91667 7.91671C7.91667 6.76612 8.84942 5.83337 10 5.83337C11.1506 5.83337 12.0833 6.76612 12.0833 7.91671C12.0833 8.63079 11.7241 9.26096 11.1764 9.63637C10.6069 10.0266 10 10.5597 10 11.25" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.0001 14.1666H10.0075" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_86_241">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        }
    ])

    const [menuList2, setMenuList2] = useState([
        {
            name: "How it works",
            path: "/how-its-work",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 2.5V17.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.1667 2.5V17.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 5.83331H2.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 14.1667H2.5" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            name: "About us",
            path: "/about-us",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 9.99137V12.0834C2.5 14.8332 2.5 16.2081 3.35427 17.0625C4.20854 17.9167 5.58347 17.9167 8.33333 17.9167H11.6667C14.4165 17.9167 15.7914 17.9167 16.6457 17.0625C17.5 16.2081 17.5 14.8332 17.5 12.0834V9.99137C17.5 8.59029 17.5 7.88982 17.2034 7.28342C16.9068 6.67702 16.3539 6.24694 15.248 5.3868L13.5813 4.0905C11.8609 2.75242 11.0007 2.08337 10 2.08337C8.99925 2.08337 8.13908 2.75242 6.41868 4.0905L4.75201 5.3868C3.64611 6.24694 3.09316 6.67702 2.79658 7.28342C2.5 7.88982 2.5 8.59029 2.5 9.99137Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5002 14.1666C11.8339 14.6853 10.9587 15 10.0002 15C9.04158 15 8.16642 14.6853 7.50015 14.1666" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            name: "Help center",
            path: "/help-center",
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_86_241)">
                    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6024 1.66663 10 1.66663C5.39763 1.66663 1.66667 5.39759 1.66667 9.99996C1.66667 14.6023 5.39763 18.3333 10 18.3333Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.91667 7.91671C7.91667 6.76612 8.84942 5.83337 10 5.83337C11.1506 5.83337 12.0833 6.76612 12.0833 7.91671C12.0833 8.63079 11.7241 9.26096 11.1764 9.63637C10.6069 10.0266 10 10.5597 10 11.25" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.0001 14.1666H10.0075" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_86_241">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        }
    ])

    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
        refetch: refetchProfile,
    } = useGetProfileQuery({});

    useEffect(() => {
        console.log(selectedCurrency)
    }, [selectedCurrency])


    return (
        <>
            <nav
                className={` z-50 sticky top-0  backdrop-blur bg-white/90 ${isFixed
                    ? `fixed top-0 left-0 right-0 ${scrolled ? "bg-[#FFFFFF] shadow-md" : "bg-transparent"
                    }`
                    : "md:relative bg-[#FFFFFF] shadow-sm"
                    } transition-all duration-300 ease-in-out`}
            >
                <div className="mx-auto px-4 md:px-6 lg:px-8 flex md:flex-nowrap justify-between items-center gap-y-2 md:h-20 h-auto py-3 w-full">

                    {/* Desktop Menu */}
                    <div className="flex items-center lg:gap-6 gap-2 relative">
                        <div
                            tabIndex={0}
                            className="cursor-pointer flex items-center gap-2 relative"
                        // onBlur={() => setTimeout(() => setShowDropdown(!showDropdown), 150)}
                        >
                            {showDropdown ?
                                <svg onClick={() => setShowDropdown(false)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 8L8.00108 23.9989M23.9989 24L8 8.00113" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                :
                                <svg
                                    onClick={() => {
                                        setShowDropdown(true)
                                    }}
                                    width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3334 6.66667H26.6667" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.33337 16H26.6667" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.33337 25.3333H18.6667" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                            <p className="text-[12px] font-[400] hidden md:block">Menu</p>
                        </div>

                        {showDropdown && menuList.length > 0 && (
                            <>
                                <div onClick={() => setShowDropdown(false)} className="md:hidden block h-[100vh] w-[100vw] fixed top-0 left-0 bg-[#000000CC]">

                                </div>
                                <ul ref={dropdownRef2} className="fixed md:absolute left-0 top-0 md:top-[50px] w-[337px] md:w-[200px] md:mt-1 bg-white border border-gray-200 md:rounded-[12px] shadow-[0_4px_25px_0_rgba(0,0,0,0.25)] z-10 max-h-[100vh] md:max-h-48 h-[100vh] md:h-auto overflow-y-auto">
                                    <li className="md:hidden flex items-center gap-3 px-[16px] sm:px-4 py-[20px] hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700">
                                        <svg onClick={() => setShowDropdown(false)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 8L8.00108 23.9989M23.9989 24L8 8.00113" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </li>
                                    {profileData?.data ? menuList.map((item, index) => (
                                        <Link key={index} href={item?.path}>
                                            <li
                                                onMouseDown={() => {
                                                    // setQuery(location);
                                                    // setShowDropdown(false);
                                                }}
                                                className="flex items-center gap-3 px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                            >
                                                {item.icon}
                                                {item.name}
                                            </li>
                                        </Link>
                                    ))
                                        :
                                        menuList2.map((item, index) => (
                                            <Link key={index} href={item?.path}>
                                                <li
                                                    key={index}
                                                    onMouseDown={() => {
                                                        // setQuery(location);
                                                        // setShowDropdown(false);
                                                    }}
                                                    className="flex items-center gap-3 px-[16px] md:px-3 sm:px-4 md:py-2 py-[15px] hover:bg-gray-100 cursor-pointer text-sm md:text-sm text-gray-700"
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </li>
                                            </Link>
                                        ))
                                    }
                                </ul>
                            </>
                        )}
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="relative">
                            <img
                                src={isSearchOpen ? "img/timeFlyz.png" : "/img/logo-black.png"}
                                alt="Logo"
                                className="h-auto w-[188px] md:w-[218px] lg:w-[218px] xl:w-54 object-contain"
                                width={200}
                                height={110}
                            // priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Buttons */}
                    <div className="flex items-center space-x-4 md:space-x-4 justify-end md:justify-start">
                        <div ref={dropdownRef} className="relative block">
                            <button
                                onClick={() => setIsLnDropdownOpen(!isLnDropdownOpen)}
                                className="flex items-center space-x-2 py-2 md:py-2 md:px-2 px-0 border-gray-300"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.0001 29.3333C8.63628 29.3333 2.66675 23.3637 2.66675 16C2.66675 12.2766 4.19295 8.90969 6.65391 6.49069M16.0001 29.3333C14.7161 28.3819 14.921 27.274 15.5651 26.1663C16.5555 24.4632 16.5555 24.4632 16.5555 22.1925C16.5555 19.9219 17.9049 18.8572 22.6667 19.8095C24.8063 20.2375 26.3655 17.2812 29.1431 18.2573M16.0001 29.3333C22.5945 29.3333 28.0707 24.5461 29.1431 18.2573M6.65391 6.49069C7.78629 6.6102 8.42031 7.21685 9.47336 8.32955C11.4726 10.442 13.4718 10.6183 14.8047 9.91413C16.8039 8.85791 15.1239 7.14707 17.4703 6.21731C18.9089 5.64735 19.183 4.15465 18.5022 2.90105M6.65391 6.49069C9.06001 4.12561 12.3597 2.66667 16.0001 2.66667C16.8553 2.66667 17.6917 2.74719 18.5022 2.90105M29.1431 18.2573C29.2682 17.5236 29.3334 16.7695 29.3334 16C29.3334 9.49143 24.6699 4.07207 18.5022 2.90105" stroke="#4B4D4D" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm text-[12px] font-[400]">
                                    {selectedLanguage === "English"
                                        ? "Eng"
                                        : selectedLanguage === "Spanish"
                                            ? "Spa"
                                            : selectedLanguage === "French"
                                                ? "Fre"
                                                : selectedLanguage === "Italiano"
                                                    ? "Ita"
                                                    : selectedLanguage === "Français"
                                                        ? "Fra"
                                                        : selectedLanguage === "Deutsch"
                                                            ? "Ger"
                                                            : selectedLanguage === "Español"
                                                                ? "Espan"
                                                                : selectedLanguage === "Nederlands"
                                                                    ? "Neder"
                                                                    : selectedLanguage}
                                    {" - "}
                                    {selectedCurrency}
                                </span>
                            </button>
                            <AnimatePresence>
                                {isLnDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 px-5"
                                    >
                                        {/* Language Sub-dropdown */}
                                        <div className="relative" ref={langDropdownRef}>
                                            <button
                                                onClick={() => {
                                                    setIsLangDropdownOpen(!isLangDropdownOpen);
                                                    if (!isLangDropdownOpen) {
                                                        setIsCurrencyDropdownOpen(false);
                                                    }
                                                }}
                                                className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border rounded-full"
                                            >
                                                <span>
                                                    {selectedLanguage === "English"
                                                        ? "English"
                                                        : selectedLanguage === "Spanish"
                                                            ? "Spanish"
                                                            : selectedLanguage === "French"
                                                                ? "French"
                                                                : selectedLanguage === "Italiano"
                                                                    ? "Italiano"
                                                                    : selectedLanguage === "Français"
                                                                        ? "Français"
                                                                        : selectedLanguage === "Deutsch"
                                                                            ? "Deutsch"
                                                                            : selectedLanguage === "Español"
                                                                                ? "Español"
                                                                                : selectedLanguage === "Nederlands"
                                                                                    ? "Nederlands"
                                                                                    : selectedLanguage}
                                                </span>
                                                <RiArrowDropDownLine className="w-4 h-4 text-[#4B4D4D]" />
                                            </button>
                                            <AnimatePresence>
                                                {isLangDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute left-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100"
                                                    >
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("English");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            English
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("Spanish");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            Spanish
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("Italiano");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            Italiano
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("Français");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            Français
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("Deutsch");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            Deutsch
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("Español");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            Español
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedLanguage("Nederlands");
                                                                setIsLangDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            Nederlands
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        {/* Currency Sub-dropdown */}
                                        <div className="relative" ref={currencyDropdownRef}>
                                            <button
                                                onClick={() => {
                                                    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                                                    if (!isCurrencyDropdownOpen) {
                                                        setIsLangDropdownOpen(false);
                                                    }
                                                }}
                                                className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 border rounded-full mt-3"
                                            >
                                                <span>{selectedCurrency}</span>
                                                <RiArrowDropDownLine className="w-4 h-4 text-[#4B4D4D]" />
                                            </button>
                                            <AnimatePresence>
                                                {isCurrencyDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute left-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100"
                                                    >
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("AED");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            AED
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("INR");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            INR
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("USD");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            USD
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("EURO");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            EUR
                                                        </button>
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("CHF");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            CHF
                                                        </button>{" "}
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("POUND");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            GBP
                                                        </button>{" "}
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("CAD");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            CAD
                                                        </button>{" "}
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("AUD");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            AUD
                                                        </button>{" "}
                                                        <button
                                                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                                                            onClick={() => {
                                                                setSelectedCurrency("SAR");
                                                                setIsCurrencyDropdownOpen(false);
                                                                setIsLnDropdownOpen(false);
                                                            }}
                                                        >
                                                            SAR
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!profileData?.data ?
                            <div>
                                <Link href="/sign-in" className="flex items-center space-x-2">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.3334 16C29.3334 23.3637 23.3638 29.3333 16.0001 29.3333C8.63628 29.3333 2.66675 23.3637 2.66675 16C2.66675 8.6362 8.63628 2.66667 16.0001 2.66667C23.3638 2.66667 29.3334 8.6362 29.3334 16Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                        <path d="M19.6666 12.6667C19.6666 14.6917 18.025 16.3333 15.9999 16.3333C13.9749 16.3333 12.3333 14.6917 12.3333 12.6667C12.3333 10.6416 13.9749 9 15.9999 9C18.025 9 19.6666 10.6416 19.6666 12.6667Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                        <path d="M7.33325 25.3335L8.08045 24.0259C9.2674 21.9488 11.4764 20.6668 13.8688 20.6668H18.1311C20.5235 20.6668 22.7324 21.9488 23.9193 24.0259L24.6665 25.3335" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-sm text-[12px] font-[400]">Login</span>
                                </Link>
                            </div>
                            :
                            <div>
                                <Link href="/dashboard/reservations" className="flex items-center space-x-2">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.3334 16C29.3334 23.3637 23.3638 29.3333 16.0001 29.3333C8.63628 29.3333 2.66675 23.3637 2.66675 16C2.66675 8.6362 8.63628 2.66667 16.0001 2.66667C23.3638 2.66667 29.3334 8.6362 29.3334 16Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                        <path d="M19.6666 12.6667C19.6666 14.6917 18.025 16.3333 15.9999 16.3333C13.9749 16.3333 12.3333 14.6917 12.3333 12.6667C12.3333 10.6416 13.9749 9 15.9999 9C18.025 9 19.6666 10.6416 19.6666 12.6667Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                        <path d="M7.33325 25.3335L8.08045 24.0259C9.2674 21.9488 11.4764 20.6668 13.8688 20.6668H18.1311C20.5235 20.6668 22.7324 21.9488 23.9193 24.0259L24.6665 25.3335" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-sm text-[12px] font-[400]">{profileData?.data?.name}</span>
                                </Link>
                            </div>
                        }
                    </div>

                </div>
            </nav>
        </>
    );
}
