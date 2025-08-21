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

interface NavbarProps {
  menuColor?: "light" | "dark";
  isFixed?: boolean;
  forceShowSearch?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchValue?: string;
  onCitySelect?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Navbar({
  menuColor = "light",
  isFixed = false,
  forceShowSearch = false,
  onSearch,
  onKeyPress,
  onCitySelect,
  searchValue = "",
}: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isForgetModalOpen, setIsForgetModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLnDropdownOpen, setIsLnDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [otpFor, setOtpFor] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [emailToVerify, setEmailToVerify] = useState({ email: "", status: "" });
  const [showRegisterOtpModal, setShowRegisterOtpModal] = useState(false);

  const authCheck = localStorage.getItem("token");
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".absolute.right-0.mt-2");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsLnDropdownOpen(false);
        setIsLangDropdownOpen(false);
        setIsCurrencyDropdownOpen(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const textColor = menuColor === "light" ? "text-white" : "text-[#292935]";
  const hoverColor =
    menuColor === "light" ? "hover:text-gold" : "hover:text-orange-500";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (onSearch) onSearch(e);
    if (onCitySelect) onCitySelect(value === "" ? null : value);
    setLocalSearchValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const params = new URLSearchParams(searchParams.toString());
      if (localSearchValue) {
        params.set("city", localSearchValue);
      } else {
        params.delete("city");
      }

      const newUrl = `/slots?${params.toString()}`;
      router.push(newUrl);
    }
  };

  const handleRedirectionforReserve = () => {
    if (authCheck) {
      router.push("/bookings");
    } else {
      router.push("/reservation");
    }
  };

  return (
    <>
      <nav
        className={` z-50 ${
          isFixed
            ? `fixed top-0 left-0 right-0 ${
                scrolled ? "bg-[#0F1B2B] shadow-md" : "bg-transparent"
              }`
            : "relative bg-[#0F1B2B] shadow-sm text-white"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center md:h-20 h-16 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative">
              <img
                src={isSearchOpen ? "img/timeFlyz.png" : "/img/logo.png"}
                alt="Logo"
                className="h-auto w-32 md:w-40 lg:w-52 xl:w-60 object-contain"
                width={200}
                height={110}
                // priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex lg:gap-6 gap-2 items-center">
            {NAV_ITEMS.map((item, index) => (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`uppercase ${
                    isFixed
                      ? scrolled
                        ? "text-white font-medium"
                        : textColor
                      : "text-white font-medium"
                  } text-sm md:text-sm lg:text-lg tracking-wide ${hoverColor} transition`}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search Bar */}
            {!isFixed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: !isFixed || (isFixed && scrolled) ? 1 : 0,
                  y: !isFixed || (isFixed && scrolled) ? 0 : 20,
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex-1 max-w-sm"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={localSearchValue}
                    onChange={handleSearch}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full text-white focus:outline-none "
                  />
                  <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4D4D]" />
                </div>
              </motion.div>
            ) : (
              scrolled && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex-1 max-w-sm"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search city..."
                      value={localSearchValue}
                      onChange={handleSearch}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4D4D]" />
                  </div>
                </motion.div>
              )
            )}

            <div className="hidden md:flex items-center space-x-4">
              {/* ...existing user dropdown... */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsLnDropdownOpen(!isLnDropdownOpen)}
                  className="flex items-center space-x-2 border rounded-full py-2 md:py-2 md:px-2 px-4 border-gray-300 text-white"
                >
                  <span className="text-sm md:text-sm lg:text-base">
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
                    {" • "}
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
                                  setSelectedCurrency("EUR");
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
                                  setSelectedCurrency("GBP");
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
            </div>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className={`flex items-center space-x-3 border rounded-full py-2 lg:px-4 px-2 ${
                  isUserDropdownOpen ? "border-gold" : "border-gray-300"
                } ${scrolled ? "text-white" : "text-white "}`}
              >
                <div className="lg:w-8 lg:h-8 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaRegUser className="w-4 h-4 text-gray-600" />
                </div>
                <FaBarsStaggered
                  className={`lg:w-5 lg:h-5 w-4 h-4 text-white transform transition-transform duration-300 ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-[-126px] mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100"
                  >
                    <button
                      onClick={() => {
                        handleRedirectionforReserve();
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span>Reservation</span>
                      <HiArrowRight className="w-4 h-4 text-[#4B4D4D]" />
                    </button>
                    <button
                      onClick={() => {
                        router.push("/favorites");
                        setIsUserDropdownOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span>My Favorites</span>
                      <HiArrowRight className="w-4 h-4 text-[#4B4D4D]" />
                    </button>
                    {!authCheck && (
                      <>
                        <button
                          onClick={openLoginModal}
                          className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <span>Login</span>
                          <HiArrowRight className="w-4 h-4 text-[#4B4D4D]" />
                        </button>
                        <button
                          onClick={openRegisterModal}
                          className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <span>Register</span>
                          <HiArrowRight className="w-4 h-4 text-[#4B4D4D]" />
                        </button>
                      </>
                    )}
                    {/* <div className="border-t border-gray-100 my-1">
                      <button
                        onClick={() => {
                          router.push("/book");
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gold hover:bg-gold/5 transition-colors duration-150"
                      >
                        <span>Book Now</span>
                        <HiArrowRight className="w-4 h-4" />
                      </button>
                    </div> */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              className="p-2 text-[#4B4D4D] hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <HiMiniBars3CenterLeft className="w-7 h-7" />
              ) : (
                <HiMiniBars3 className="w-7 h-7" />
              )}
            </button>
            <button
              className="p-2 text-[#4B4D4D] hover:text-white transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <HiMagnifyingGlass className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden w-full px-4 mt-2"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search city..."
                    value={searchValue}
                    onChange={handleSearch}
                    onKeyPress={onKeyPress}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#ff8200] focus:border-transparent"
                  />
                  <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4D4D]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <Login
          onRegisterClick={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
          onForgotPassword={() => {
            setIsLoginModalOpen(false);
            setIsForgetModalOpen(true);
          }}
          onLoginSuccess={() => setIsLoginModalOpen(false)}
        />
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <Register
          onLoginClick={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
          onVerifyClick={() => {
            setShowRegisterOtpModal(true);
            setIsRegisterModalOpen(false);
          }}
          setEmailToVerify={setEmailToVerify}
          setOtpFor={setOtpFor}
        />
      </Modal>
      {/* registration otp varify */}
      <Modal
        isOpen={showRegisterOtpModal}
        onClose={() => setShowRegisterOtpModal(false)}
      >
        <OtpVerificationRegistration
          otpFor={otpFor}
          emailToVerify={emailToVerify}
          onVerify={() => {
            setShowRegisterOtpModal(false);
            setIsRegisterModalOpen(false);
          }}
          onClose={() => setShowRegisterOtpModal(false)}
        />
      </Modal>

      {/* Forget Password Modal */}
      <Modal
        isOpen={isForgetModalOpen}
        onClose={() => setIsForgetModalOpen(false)}
      >
        <ForgetPassword
          onClose={() => setIsForgetModalOpen(false)}
          onSend={(email, phone) => {
            setUserEmail(email);
            setUserPhone(phone);
            setIsForgetModalOpen(false);
            setIsOtpModalOpen(true);
            setOtpFor("password_reset");
          }}
        />
      </Modal>
      <Modal isOpen={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)}>
        <OtpVerification
          onClose={() => setIsOtpModalOpen(false)}
          onVerify={() => {
            setIsOtpModalOpen(false);
            setIsResetModalOpen(true);
          }}
          otpFor={otpFor}
          setResetPasswordToken={setResetPasswordToken}
        />
      </Modal>
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      >
        <ResetPassword
          onClose={() => setIsResetModalOpen(false)}
          onSuccess={() => {
            setIsResetModalOpen(false);
            setIsLoginModalOpen(true);
          }}
          email={userEmail}
          resetPasswordToken={resetPasswordToken}
        />
      </Modal>
    </>
  );
}
