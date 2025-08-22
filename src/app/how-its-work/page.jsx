'use client'
import React, { useState } from 'react'
import Navbar from "@/components/layout/Header-new";
import FooterNew from '@/components/layout/FooterNew';
import Slider from 'react-slick';
import Button from "@/components/ui/Button";
import Reviews from '@/components/page-components/home/Reviews';
import CTA from '@/components/page-components/home/CTA';
import HotelChains from '@/components/page-components/home/HotelChains';

function page() {

    const accordionData = [
        {
            title: 'When and how can I cancel a reservation?',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
        {
            title: 'Can I modify my reservation?',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
        {
            title: 'Can more than two people stay in a room?',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
        {
            title: 'I am a minor, can I make a reservation?',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
        {
            title: 'When is the payment made?',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
    ];

    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    var settings = {
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280, // for large screens
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024, // for medium screens (tablet landscape)
                settings: {
                    slidesToShow: 2.5,
                },
            },
            {
                breakpoint: 768, // for small tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // for mobile
                settings: {
                    slidesToShow: 1.5,
                },
            },
            {
                breakpoint: 480, // small phones
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div>
            <Navbar menuColor="light" isFixed={false} />
            <div className='flex items-center p-[30px] pb-[0px]'>
                <div className='w-[50%]'>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>Pay only for the time you need</h1>
                    <p className='pr-[20px] text-[#4B4D4D] text-[16px] font-[400] '>Select your city or hotel, choose your stay length, and set your own check-in time. The flexibility you need, when you need it.</p>
                    <Button fullWidth={false} className="mx-auto text-[16px] w-[228px] h-[60px] rounded-[12px] mt-[20px]">
                        Search hotel by hour
                    </Button>
                </div>
                <div className='w-[50%]'>
                    <img alt='timeflyz' className='w-full' src='/img/howWorkSection1.webp' />
                </div>
            </div>

            <div className='flex items-center justify-between mt-[80px] px-[30px]'>
                <div className='w-[50%]'>
                    <img alt='timeflyz' className='w-[calc(100%-60px)]' src='/img/howWorkSection2.webp' />
                </div>
                <div className='w-[50%]'>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>What is Timeflyz?</h1>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>At Timeflyz we revolutionize the way you book hotels. Forget about traditional reservations of at least 1 day and enjoy the freedom of paying only for the time you really need. Whether it's to rest a few hours between flights, to have a space to work or simply relax before an event, BYHOURS offers you a new way to use hotels.</p>
                </div>
            </div>

            <div className='px-[30px] mt-[80px]'>
                <div className='bg-[#FED1C7] w-full h-[420px] rounded-[20px] p-[50px]'>
                    <h2 className='text-center text-[#4B4D4D] text-[55px] font-[700]'>How does it work?</h2>
                    <div className='w-full flex justify-between items-center mt-[40px]'>

                        <div className='w-[calc(33%-20px)] flex flex-col items-center'>
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 13.3334V66.6667C10 69.8094 10 71.3807 10.9763 72.357C11.9526 73.3334 13.524 73.3334 16.6667 73.3334H63.3333C66.476 73.3334 68.0473 73.3334 69.0237 72.357C70 71.3807 70 69.8094 70 66.6667V13.3334" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M35 26.6666V31.6666M35 31.6666V36.6666M35 31.6666H45M45 26.6666V31.6666M45 31.6666V36.6666" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M46.6673 73.3333V59.9997C46.6673 56.318 43.6827 53.333 40.0007 53.333C36.3187 53.333 33.334 56.318 33.334 59.9997V73.3333" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.66602 13.3333H26.666C28.799 9.42419 33.965 6.66663 39.9993 6.66663C46.0337 6.66663 51.1997 9.42419 53.3327 13.3333H73.3327" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 26.6666H23.3333M20 40H23.3333M20 53.3333H23.3333" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M56.666 26.6666H59.9993M56.666 40H59.9993M56.666 53.3333H59.9993" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[24px] font-[700] text-center mb-[12px] mt-[10px]'>Choose your hotel</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>Search among hundreds of quality hotels around the world, from large chains to small boutique hotels.</p>
                        </div>

                        <div className='w-[calc(33%-20px)] flex flex-col items-center'>
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.9993 73.3333C58.4088 73.3333 73.3327 58.4095 73.3327 40C73.3327 21.5905 58.4088 6.66663 39.9993 6.66663C21.5899 6.66663 6.66602 21.5905 6.66602 40C6.66602 58.4095 21.5899 73.3333 39.9993 73.3333Z" stroke="#EF4A23" strokeWidth="3" />
                                <path d="M31.666 31.6666L43.3323 43.332M53.3327 26.6666L36.666 43.3333" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[24px] font-[700] text-center mb-[12px] mt-[10px]'>Select a pack of hours</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>Choose between 3, 6 or 24 hours, depending on what you need. You have total control over the length of your stay.</p>
                        </div>

                        <div className='w-[calc(33%-20px)] flex flex-col items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <path d="M53.3327 6.66663V20M26.666 6.66663V20" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M43.3333 13.3334H36.6667C24.0959 13.3334 17.8105 13.3334 13.9052 17.2386C10 21.1439 10 27.4292 10 40V46.6667C10 59.2374 10 65.523 13.9052 69.428C17.8105 73.3334 24.0959 73.3334 36.6667 73.3334H43.3333C55.904 73.3334 62.1897 73.3334 66.0947 69.428C70 65.523 70 59.2374 70 46.6667V40C70 27.4292 70 21.1439 66.0947 17.2386C62.1897 13.3334 55.904 13.3334 43.3333 13.3334Z" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 33.3334H70" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M39.9843 46.6666H40.0143M39.9843 60H40.0143M53.3027 46.6666H53.3327M26.666 46.6666H26.6959M26.666 60H26.6959" stroke="#EF4A23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[24px] font-[700] text-center mb-[12px] mt-[10px]'>Confirm your check-in time</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>Choose the exact time you want to arrive at the hotel. No restrictions, enjoy total flexibility when checking in.</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between mt-[80px] px-[30px]'>
                <div className='w-[50%]'>
                    <img alt='timeflyz' className='w-[calc(100%-60px)]' src='/img/howWorkSection3.webp' />
                </div>
                <div className='w-[50%]'>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>Why choose Timeflyz?</h1>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>We adapt to your schedule and your budget. Whether you want to rest between meetings, enjoy a few hours of relaxation or have a temporary base on your travels, BYHOURS offers a flexible hotel experience that fits your needs.</p>

                    <div className='mt-[26px]'>
                        <h2 className='text-[#4B4D4D] text-[20px] font-[700] mt-[16px]'>1. Total flexibility</h2>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] '>Check in at any time, without limitations.</p>

                        <h2 className='text-[#4B4D4D] text-[20px] font-[700] mt-[16px]'>2. Savings</h2>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] '>Pay only for the time you use, no unnecessary fees.</p>

                        <h2 className='text-[#4B4D4D] text-[20px] font-[700] mt-[16px]'>3. Freedom of choice</h2>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] '>Find hotels in hundreds of global destinations.</p>

                        <h2 className='text-[#4B4D4D] text-[20px] font-[700] mt-[16px]'>4. No surprises</h2>
                        <p className='text-[#4B4D4D] text-[16px] font-[400] '>Everything is transparent, no hidden costs.</p>
                    </div>
                </div>
            </div>

            <div className='px-[30px] mt-[80px]'>
                <div className='bg-[#F4F4F4] w-full h-[657px] rounded-[20px] p-[50px]'>
                    <h2 className='text-center text-[#4B4D4D] text-[55px] font-[700]'>Who is Timeflyz for?</h2>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px] text-center'>It doesn't matter if you're traveling for business, tourism or just need a place to relax for a few hours.</p>
                    <div className='w-full flex justify-between mt-[40px]'>

                        <div className='w-[calc(25%-20px)] flex flex-col'>
                            <img alt='timeflyz' className='w-full object-cover h-[260px] rounded-[20px] overflow-hidden' src='/img/how1.png' />
                            <h1 className='text-[#4B4D4D] text-[20px] font-[700] mt-[20px]'>Business travelers</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] mt-[2px]'>Take a break between meetings or use the hotel as a temporary workspace.</p>
                        </div>

                        <div className='w-[calc(25%-20px)] flex flex-col'>
                            <img alt='timeflyz' className='w-full object-cover h-[260px] rounded-[20px] overflow-hidden' src='/img/how2.png' />
                            <h1 className='text-[#4B4D4D] text-[20px] font-[700] mt-[20px]'>Tourists</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] mt-[2px]'>Rest a few hours before or after your flight.</p>
                        </div>

                        <div className='w-[calc(25%-20px)] flex flex-col'>
                            <img alt='timeflyz' className='w-full object-cover h-[260px] rounded-[20px] overflow-hidden' src='/img/how3.png' />
                            <h1 className='text-[#4B4D4D] text-[20px] font-[700] mt-[20px]'>Special events</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] mt-[2px]'>Relax before a wedding, meeting or event.</p>
                        </div>

                        <div className='w-[calc(25%-20px)] flex flex-col'>
                            <img alt='timeflyz' className='w-full object-cover h-[260px] rounded-[20px] overflow-hidden' src='/img/how4.png' />
                            <h1 className='text-[#4B4D4D] text-[20px] font-[700] mt-[20px]'>Day stays</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] mt-[2px]'>Enjoy a quick getaway without the need for a full stay.</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between mt-[80px] px-[30px]'>
                <div className='w-[50%]'>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>Frequently asked questions</h1>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>Do you have questions? Here are the answers to the most common questions about Timeflyz.</p>
                </div>
                <div className='w-[50%] pl-[20px]'>
                    <div className="w-full mx-auto space-y-[12px]">
                        {accordionData.map((item, index) => (
                            <div
                                key={index}
                                className=""
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="bg-[#FED1C7] rounded-[12px] w-full flex items-center justify-between text-[#4B4D4D] text-[20px] font-[700] px-[20px] h-[50px]"
                                >
                                    {item.title}
                                    <span
                                        className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-90' : 'rotate-0'
                                            }`}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 18C9 18 15 13.5811 15 12C15 10.4188 9 6 9 6" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>
                                {openIndex === index && (
                                    <div className="px-[20px] py-[26px] text-[16px] text-[#6B6B6B]">
                                        {item.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <CTA />
            <HotelChains />

            <FooterNew />
        </div>
    )
}

export default page