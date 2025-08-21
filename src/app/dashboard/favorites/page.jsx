'use client'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <h1 className='text-[#4B4D4D] text-[24px] font-[700] mb-[20px]'>My Favorites</h1>

            <div className="container max-w-[100%] flex items-center flex-wrap gap-[18px] mt-[28px]">
                <Link className="md:w-[24%] w-full md:border-0 border-b-1 mb-5 pb-5 md:pb-0 md:mb-0 border-[lightgrey]" href={`/hoteldetail/test`}>
                    <div className="w-full bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                        <div className="relative w-full overflow-hidden">
                            <img
                                src={'/img/hotel1.png'}
                                alt='timeflyz'
                                className="h-[200px] md:h-[164px] w-full rounded-[20px] object-cover"
                            />
                            <div className='absolute top-[20px] right-[20px]'>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.4107 16.9677C5.58942 14.858 0 10.0348 0 5.69444C0 2.82563 2.10526 0.5 5 0.5C6.5 0.5 8 1 10 3C12 1 13.5 0.5 15 0.5C17.8947 0.5 20 2.82563 20 5.69444C20 10.0348 14.4106 14.858 11.5893 16.9677C10.6399 17.6776 9.3601 17.6776 8.4107 16.9677Z" fill="#EB001B" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between pt-[15px] flex-1">
                            <div className="">
                                <span className="text-[20px] font-semibold text-[#4B4D4D]">
                                    ★★★★★
                                </span>
                            </div>

                            <div>
                                <h3 className="text-[16px] text-[#4B4D4D] font-[700] mt-[5px]">
                                    Fizaya Plaza Hotel
                                </h3>
                                <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[5px]">
                                    Abu Dhabi
                                </p>
                            </div>

                            <div className="text-sm mt-[5px]">
                                <div>
                                    <span className="text-[12px] text-[#6B6B6B] font-[400]">
                                        Per hour
                                    </span>{" "}
                                    <span className="ml-2 text-[20px] text-[#4B4D4D] font-[700]">AED 149</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Link>
                <Link className="md:w-[24%] w-full md:border-0 border-b-1 mb-5 pb-5 md:pb-0 md:mb-0 border-[lightgrey]" href={`/hoteldetail/test`}>
                    <div className="w-full bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                        <div className="relative w-full overflow-hidden">
                            <img
                                src={'/img/hotel2.png'}
                                alt='timeflyz'
                                className="h-[200px] md:h-[164px] w-full rounded-[20px] object-cover"
                            />
                            <div className='absolute top-[20px] right-[20px]'>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.4107 16.9677C5.58942 14.858 0 10.0348 0 5.69444C0 2.82563 2.10526 0.5 5 0.5C6.5 0.5 8 1 10 3C12 1 13.5 0.5 15 0.5C17.8947 0.5 20 2.82563 20 5.69444C20 10.0348 14.4106 14.858 11.5893 16.9677C10.6399 17.6776 9.3601 17.6776 8.4107 16.9677Z" fill="#EB001B" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between pt-[15px] flex-1">
                            <div className="">
                                <span className="text-[20px] font-semibold text-[#4B4D4D]">
                                    ★★★★★
                                </span>
                            </div>

                            <div>
                                <h3 className="text-[16px] text-[#4B4D4D] font-[700] mt-[5px]">
                                    Fizaya Plaza Hotel
                                </h3>
                                <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[5px]">
                                    Abu Dhabi
                                </p>
                            </div>

                            <div className="text-sm mt-[5px]">
                                <div>
                                    <span className="text-[12px] text-[#6B6B6B] font-[400]">
                                        Per hour
                                    </span>{" "}
                                    <span className="ml-2 text-[20px] text-[#4B4D4D] font-[700]">AED 149</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Link>
                <Link className="md:w-[24%] w-full md:border-0 border-b-1 mb-5 pb-5 md:pb-0 md:mb-0 border-[lightgrey]" href={`/hoteldetail/test`}>
                    <div className="w-full bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                        <div className="relative w-full overflow-hidden">
                            <img
                                src={'/img/hotel3.png'}
                                alt='timeflyz'
                                className="h-[200px] md:h-[164px] w-full rounded-[20px] object-cover"
                            />
                            <div className='absolute top-[20px] right-[20px]'>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.4107 16.9677C5.58942 14.858 0 10.0348 0 5.69444C0 2.82563 2.10526 0.5 5 0.5C6.5 0.5 8 1 10 3C12 1 13.5 0.5 15 0.5C17.8947 0.5 20 2.82563 20 5.69444C20 10.0348 14.4106 14.858 11.5893 16.9677C10.6399 17.6776 9.3601 17.6776 8.4107 16.9677Z" fill="#EB001B" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between pt-[15px] flex-1">
                            <div className="">
                                <span className="text-[20px] font-semibold text-[#4B4D4D]">
                                    ★★★★★
                                </span>
                            </div>

                            <div>
                                <h3 className="text-[16px] text-[#4B4D4D] font-[700] mt-[5px]">
                                    Fizaya Plaza Hotel
                                </h3>
                                <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[5px]">
                                    Abu Dhabi
                                </p>
                            </div>

                            <div className="text-sm mt-[5px]">
                                <div>
                                    <span className="text-[12px] text-[#6B6B6B] font-[400]">
                                        Per hour
                                    </span>{" "}
                                    <span className="ml-2 text-[20px] text-[#4B4D4D] font-[700]">AED 149</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Link>
                <Link className="md:w-[24%] w-full md:border-0 border-b-1 mb-5 pb-5 md:pb-0 md:mb-0 border-[lightgrey]" href={`/hoteldetail/test`}>
                    <div className="w-full bg-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                        <div className="relative w-full overflow-hidden">
                            <img
                                src={'/img/hotel4.png'}
                                alt='timeflyz'
                                className="h-[200px] md:h-[164px] w-full rounded-[20px] object-cover"
                            />
                            <div className='absolute top-[20px] right-[20px]'>
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.4107 16.9677C5.58942 14.858 0 10.0348 0 5.69444C0 2.82563 2.10526 0.5 5 0.5C6.5 0.5 8 1 10 3C12 1 13.5 0.5 15 0.5C17.8947 0.5 20 2.82563 20 5.69444C20 10.0348 14.4106 14.858 11.5893 16.9677C10.6399 17.6776 9.3601 17.6776 8.4107 16.9677Z" fill="#EB001B" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between pt-[15px] flex-1">
                            <div className="">
                                <span className="text-[20px] font-semibold text-[#4B4D4D]">
                                    ★★★★★
                                </span>
                            </div>

                            <div>
                                <h3 className="text-[16px] text-[#4B4D4D] font-[700] mt-[5px]">
                                    Fizaya Plaza Hotel
                                </h3>
                                <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[5px]">
                                    Abu Dhabi
                                </p>
                            </div>

                            <div className="text-sm mt-[5px]">
                                <div>
                                    <span className="text-[12px] text-[#6B6B6B] font-[400]">
                                        Per hour
                                    </span>{" "}
                                    <span className="ml-2 text-[20px] text-[#4B4D4D] font-[700]">AED 149</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Link>
            </div>
        </div>
    )
}

export default page