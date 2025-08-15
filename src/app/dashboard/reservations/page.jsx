'use client'
import React from 'react'
import Navbar from "@/components/layout/Header-new";
import Button from "@/components/ui/Button";

function page() {
    return (
        <div>
            <h1 className='text-[#4B4D4D] text-[24px] font-[700] mb-[20px]'>My Booking</h1>

            <div className='Listings mt-[10px] flex flex-col gap-[10px]'>
                <div
                    className="bg-[#FFFFFF] shadow-[0px_4px_10px_0px_#00000026] w-full h-auto md:h-[175px] rounded-[20px] md:p-[8px] p-[15px] flex flex-wrap md:flex-nowrap gap-[16px] transition-all duration-300"
                >
                    <div className="relative w-full md:w-[159px] h-full rounded-[12px] overflow-hidden">
                        <img
                            src={"data:image/png;base64,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"}
                            alt="hotel"
                            className="w-full h-full object-cover rounded-[12px] opacity-0 transition-opacity duration-500 ease-in-out"
                            onLoad={(e) => {
                                e.currentTarget.style.opacity = 1;
                            }}
                        />
                    </div>

                    <div className='flex flex-wrap md:flex-nowrap w-full md:w-[calc(100%-159px)] justify-between'>
                        <div className='w-full md:w-[59%]'>
                            <h2 className='text-[#4B4D4D] text-[16px] font-[700] mt-[5px] '>
                                Deluxe King Room
                            </h2>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 13.333V11.9799C11 11.1517 10.6271 10.3396 9.87351 9.99607C8.95431 9.57707 7.85191 9.33301 6.66665 9.33301C5.48139 9.33301 4.37898 9.57707 3.45977 9.99607C2.70616 10.3396 2.33331 11.1517 2.33331 11.9799V13.333" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.6667 13.3337V11.9805C13.6667 11.1523 13.2938 10.3403 12.5402 9.99672C12.3665 9.91752 12.1861 9.84452 12 9.77832" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.66665 7.33366C7.95531 7.33366 8.99998 6.28899 8.99998 5.00033C8.99998 3.71166 7.95531 2.66699 6.66665 2.66699C5.37798 2.66699 4.33331 3.71166 4.33331 5.00033C4.33331 6.28899 5.37798 7.33366 6.66665 7.33366Z" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 2.7627C10.9638 3.04955 11.6667 3.9424 11.6667 4.9994C11.6667 6.05641 10.9638 6.94928 10 7.23614" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    2 Guests
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6666 11.667H1.33331" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.6666 14V10.6667C14.6666 9.4096 14.6666 8.78107 14.2761 8.39053C13.8856 8 13.257 8 12 8H3.99998C2.7429 8 2.11436 8 1.72384 8.39053C1.33331 8.78107 1.33331 9.4096 1.33331 10.6667V14" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.33333 8V6.80893C7.33333 6.55515 7.2952 6.47027 7.0998 6.37025C6.693 6.16195 6.1991 6 5.66667 6C5.13423 6 4.64037 6.16195 4.2335 6.37025C4.03814 6.47027 4 6.55515 4 6.80893V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M12 8V6.80893C12 6.55515 11.9619 6.47027 11.7665 6.37025C11.3597 6.16195 10.8658 6 10.3334 6C9.80089 6 9.30702 6.16195 8.90022 6.37025C8.70482 6.47027 8.66669 6.55515 8.66669 6.80893V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M14 8V4.90705C14 4.44595 14 4.21541 13.8719 3.99769C13.7438 3.77997 13.5613 3.66727 13.1963 3.44189C11.7246 2.53319 9.93287 2 8 2C6.06711 2 4.27543 2.53319 2.80372 3.44189C2.43869 3.66727 2.25618 3.77997 2.12809 3.99769C2 4.21541 2 4.44595 2 4.90705V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    Extra king size
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_291_861)">
                                        <path d="M7.99998 14.6663C11.6819 14.6663 14.6666 11.6816 14.6666 7.99967C14.6666 4.31778 11.6819 1.33301 7.99998 1.33301C4.31808 1.33301 1.33331 4.31778 1.33331 7.99967C1.33331 11.6816 4.31808 14.6663 7.99998 14.6663Z" stroke="#6B6B6B" stroke-width="1.5" />
                                        <path d="M6.33331 6.33301L8.66658 8.66607M10.6666 5.33301L7.33331 8.66634" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_291_861">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    05 Aug, 11:00 AM / 05 Aug, 03:00 PM
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.66665 5.99967C9.66665 6.92014 8.92045 7.66634 7.99998 7.66634C7.07951 7.66634 6.33331 6.92014 6.33331 5.99967C6.33331 5.0792 7.07951 4.33301 7.99998 4.33301C8.92045 4.33301 9.66665 5.0792 9.66665 5.99967Z" stroke="#6B6B6B" stroke-width="1.5" />
                                    <path d="M8.83825 11.6621C8.61338 11.8786 8.31285 11.9997 8.00011 11.9997C7.68731 11.9997 7.38678 11.8786 7.16191 11.6621C5.10285 9.66688 2.34344 7.43801 3.68912 4.20216C4.41671 2.45255 6.16327 1.33301 8.00011 1.33301C9.83691 1.33301 11.5834 2.45256 12.311 4.20216C13.655 7.43394 10.9024 9.67374 8.83825 11.6621Z" stroke="#6B6B6B" stroke-width="1.5" />
                                    <path d="M12 13.333C12 14.0694 10.2091 14.6663 8 14.6663C5.79086 14.6663 4 14.0694 4 13.333" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    Sheikh Khalifah Bin Zayed St. Opp Burjuman Centre, Dubai, United Arab Emirates
                                </span>
                            </div>
                        </div>
                        <div className='mt md:mt-0-5 w-full md:w-[41%] h-full flex md:flex-col justify-between pr-[8px] py-[5px]'>
                            <div className='text-left md:text-right flex justify-end'>
                                <span className="flex items-center justify-center w-[82px] h-[25px] bg-[#29AF52] rounded-[30px] text-[14px] text-[#FFFF] font-[700]">
                                    Confirm
                                </span>
                            </div>
                            <div className='w-auto text-right'>
                                <Button fullWidth={false} className="w-[118px] rounded-[12px] h-[40px] text-[14px]">Details</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-[#FFFFFF] shadow-[0px_4px_10px_0px_#00000026] w-full h-auto md:h-[175px] rounded-[20px] md:p-[8px] p-[15px] flex flex-wrap md:flex-nowrap gap-[16px] transition-all duration-300"
                >
                    <div className="relative w-full md:w-[159px] h-full rounded-[12px] overflow-hidden">
                        <img
                            src={"data:image/png;base64,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"}
                            alt="hotel"
                            className="w-full h-full object-cover rounded-[12px] opacity-0 transition-opacity duration-500 ease-in-out"
                            onLoad={(e) => {
                                e.currentTarget.style.opacity = 1;
                            }}
                        />
                    </div>

                    <div className='flex flex-wrap md:flex-nowrap w-full md:w-[calc(100%-159px)] justify-between'>
                        <div className='w-full md:w-[59%]'>
                            <h2 className='text-[#4B4D4D] text-[16px] font-[700] mt-[5px] '>
                                Deluxe King Room
                            </h2>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 13.333V11.9799C11 11.1517 10.6271 10.3396 9.87351 9.99607C8.95431 9.57707 7.85191 9.33301 6.66665 9.33301C5.48139 9.33301 4.37898 9.57707 3.45977 9.99607C2.70616 10.3396 2.33331 11.1517 2.33331 11.9799V13.333" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.6667 13.3337V11.9805C13.6667 11.1523 13.2938 10.3403 12.5402 9.99672C12.3665 9.91752 12.1861 9.84452 12 9.77832" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.66665 7.33366C7.95531 7.33366 8.99998 6.28899 8.99998 5.00033C8.99998 3.71166 7.95531 2.66699 6.66665 2.66699C5.37798 2.66699 4.33331 3.71166 4.33331 5.00033C4.33331 6.28899 5.37798 7.33366 6.66665 7.33366Z" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 2.7627C10.9638 3.04955 11.6667 3.9424 11.6667 4.9994C11.6667 6.05641 10.9638 6.94928 10 7.23614" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    2 Guests
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6666 11.667H1.33331" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.6666 14V10.6667C14.6666 9.4096 14.6666 8.78107 14.2761 8.39053C13.8856 8 13.257 8 12 8H3.99998C2.7429 8 2.11436 8 1.72384 8.39053C1.33331 8.78107 1.33331 9.4096 1.33331 10.6667V14" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.33333 8V6.80893C7.33333 6.55515 7.2952 6.47027 7.0998 6.37025C6.693 6.16195 6.1991 6 5.66667 6C5.13423 6 4.64037 6.16195 4.2335 6.37025C4.03814 6.47027 4 6.55515 4 6.80893V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M12 8V6.80893C12 6.55515 11.9619 6.47027 11.7665 6.37025C11.3597 6.16195 10.8658 6 10.3334 6C9.80089 6 9.30702 6.16195 8.90022 6.37025C8.70482 6.47027 8.66669 6.55515 8.66669 6.80893V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M14 8V4.90705C14 4.44595 14 4.21541 13.8719 3.99769C13.7438 3.77997 13.5613 3.66727 13.1963 3.44189C11.7246 2.53319 9.93287 2 8 2C6.06711 2 4.27543 2.53319 2.80372 3.44189C2.43869 3.66727 2.25618 3.77997 2.12809 3.99769C2 4.21541 2 4.44595 2 4.90705V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    Extra king size
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_291_861)">
                                        <path d="M7.99998 14.6663C11.6819 14.6663 14.6666 11.6816 14.6666 7.99967C14.6666 4.31778 11.6819 1.33301 7.99998 1.33301C4.31808 1.33301 1.33331 4.31778 1.33331 7.99967C1.33331 11.6816 4.31808 14.6663 7.99998 14.6663Z" stroke="#6B6B6B" stroke-width="1.5" />
                                        <path d="M6.33331 6.33301L8.66658 8.66607M10.6666 5.33301L7.33331 8.66634" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_291_861">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    05 Aug, 11:00 AM / 05 Aug, 03:00 PM
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.66665 5.99967C9.66665 6.92014 8.92045 7.66634 7.99998 7.66634C7.07951 7.66634 6.33331 6.92014 6.33331 5.99967C6.33331 5.0792 7.07951 4.33301 7.99998 4.33301C8.92045 4.33301 9.66665 5.0792 9.66665 5.99967Z" stroke="#6B6B6B" stroke-width="1.5" />
                                    <path d="M8.83825 11.6621C8.61338 11.8786 8.31285 11.9997 8.00011 11.9997C7.68731 11.9997 7.38678 11.8786 7.16191 11.6621C5.10285 9.66688 2.34344 7.43801 3.68912 4.20216C4.41671 2.45255 6.16327 1.33301 8.00011 1.33301C9.83691 1.33301 11.5834 2.45256 12.311 4.20216C13.655 7.43394 10.9024 9.67374 8.83825 11.6621Z" stroke="#6B6B6B" stroke-width="1.5" />
                                    <path d="M12 13.333C12 14.0694 10.2091 14.6663 8 14.6663C5.79086 14.6663 4 14.0694 4 13.333" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    Sheikh Khalifah Bin Zayed St. Opp Burjuman Centre, Dubai, United Arab Emirates
                                </span>
                            </div>
                        </div>
                        <div className='mt md:mt-0-5 w-full md:w-[41%] h-full flex md:flex-col justify-between pr-[8px] py-[5px]'>
                            <div className='text-left md:text-right flex justify-end'>
                                <span className="flex items-center justify-center w-[82px] h-[25px] bg-[#AF8029] rounded-[30px] text-[14px] text-[#FFFF] font-[700]">
                                    Pending
                                </span>
                            </div>
                            <div className='w-auto text-right'>
                                <Button fullWidth={false} className="w-[118px] rounded-[12px] h-[40px] text-[14px]">Details</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-[#FFFFFF] shadow-[0px_4px_10px_0px_#00000026] w-full h-auto md:h-[175px] rounded-[20px] md:p-[8px] p-[15px] flex flex-wrap md:flex-nowrap gap-[16px] transition-all duration-300"
                >
                    <div className="relative w-full md:w-[159px] h-full rounded-[12px] overflow-hidden">
                        <img
                            src={"data:image/png;base64,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"}
                            alt="hotel"
                            className="w-full h-full object-cover rounded-[12px] opacity-0 transition-opacity duration-500 ease-in-out"
                            onLoad={(e) => {
                                e.currentTarget.style.opacity = 1;
                            }}
                        />
                    </div>

                    <div className='flex flex-wrap md:flex-nowrap w-full md:w-[calc(100%-159px)] justify-between'>
                        <div className='w-full md:w-[59%]'>
                            <h2 className='text-[#4B4D4D] text-[16px] font-[700] mt-[5px] '>
                                Deluxe King Room
                            </h2>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 13.333V11.9799C11 11.1517 10.6271 10.3396 9.87351 9.99607C8.95431 9.57707 7.85191 9.33301 6.66665 9.33301C5.48139 9.33301 4.37898 9.57707 3.45977 9.99607C2.70616 10.3396 2.33331 11.1517 2.33331 11.9799V13.333" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.6667 13.3337V11.9805C13.6667 11.1523 13.2938 10.3403 12.5402 9.99672C12.3665 9.91752 12.1861 9.84452 12 9.77832" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.66665 7.33366C7.95531 7.33366 8.99998 6.28899 8.99998 5.00033C8.99998 3.71166 7.95531 2.66699 6.66665 2.66699C5.37798 2.66699 4.33331 3.71166 4.33331 5.00033C4.33331 6.28899 5.37798 7.33366 6.66665 7.33366Z" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 2.7627C10.9638 3.04955 11.6667 3.9424 11.6667 4.9994C11.6667 6.05641 10.9638 6.94928 10 7.23614" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    2 Guests
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6666 11.667H1.33331" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.6666 14V10.6667C14.6666 9.4096 14.6666 8.78107 14.2761 8.39053C13.8856 8 13.257 8 12 8H3.99998C2.7429 8 2.11436 8 1.72384 8.39053C1.33331 8.78107 1.33331 9.4096 1.33331 10.6667V14" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.33333 8V6.80893C7.33333 6.55515 7.2952 6.47027 7.0998 6.37025C6.693 6.16195 6.1991 6 5.66667 6C5.13423 6 4.64037 6.16195 4.2335 6.37025C4.03814 6.47027 4 6.55515 4 6.80893V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M12 8V6.80893C12 6.55515 11.9619 6.47027 11.7665 6.37025C11.3597 6.16195 10.8658 6 10.3334 6C9.80089 6 9.30702 6.16195 8.90022 6.37025C8.70482 6.47027 8.66669 6.55515 8.66669 6.80893V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                    <path d="M14 8V4.90705C14 4.44595 14 4.21541 13.8719 3.99769C13.7438 3.77997 13.5613 3.66727 13.1963 3.44189C11.7246 2.53319 9.93287 2 8 2C6.06711 2 4.27543 2.53319 2.80372 3.44189C2.43869 3.66727 2.25618 3.77997 2.12809 3.99769C2 4.21541 2 4.44595 2 4.90705V8" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    Extra king size
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_291_861)">
                                        <path d="M7.99998 14.6663C11.6819 14.6663 14.6666 11.6816 14.6666 7.99967C14.6666 4.31778 11.6819 1.33301 7.99998 1.33301C4.31808 1.33301 1.33331 4.31778 1.33331 7.99967C1.33331 11.6816 4.31808 14.6663 7.99998 14.6663Z" stroke="#6B6B6B" stroke-width="1.5" />
                                        <path d="M6.33331 6.33301L8.66658 8.66607M10.6666 5.33301L7.33331 8.66634" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_291_861">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    05 Aug, 11:00 AM / 05 Aug, 03:00 PM
                                </span>
                            </div>

                            <div className='flex items-start gap-2 mt-[6px]'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.66665 5.99967C9.66665 6.92014 8.92045 7.66634 7.99998 7.66634C7.07951 7.66634 6.33331 6.92014 6.33331 5.99967C6.33331 5.0792 7.07951 4.33301 7.99998 4.33301C8.92045 4.33301 9.66665 5.0792 9.66665 5.99967Z" stroke="#6B6B6B" stroke-width="1.5" />
                                    <path d="M8.83825 11.6621C8.61338 11.8786 8.31285 11.9997 8.00011 11.9997C7.68731 11.9997 7.38678 11.8786 7.16191 11.6621C5.10285 9.66688 2.34344 7.43801 3.68912 4.20216C4.41671 2.45255 6.16327 1.33301 8.00011 1.33301C9.83691 1.33301 11.5834 2.45256 12.311 4.20216C13.655 7.43394 10.9024 9.67374 8.83825 11.6621Z" stroke="#6B6B6B" stroke-width="1.5" />
                                    <path d="M12 13.333C12 14.0694 10.2091 14.6663 8 14.6663C5.79086 14.6663 4 14.0694 4 13.333" stroke="#6B6B6B" stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                                <span className='w-[calc(100%-16px)] text-[#6B6B6B] text-[12px] font-[400] '>
                                    Sheikh Khalifah Bin Zayed St. Opp Burjuman Centre, Dubai, United Arab Emirates
                                </span>
                            </div>
                        </div>
                        <div className='mt md:mt-0-5 w-full md:w-[41%] h-full flex md:flex-col justify-between pr-[8px] py-[5px]'>
                            <div className='text-left md:text-right flex justify-end'>
                                <span className="flex items-center justify-center w-auto px-[10px] h-[25px] bg-[#AF2929] rounded-[30px] text-[14px] text-[#FFFF] font-[700]">
                                    Cancelled
                                </span>
                            </div>
                            <div className='w-auto text-right'>
                                <Button fullWidth={false} className="w-[118px] rounded-[12px] h-[40px] text-[14px]">Details</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page