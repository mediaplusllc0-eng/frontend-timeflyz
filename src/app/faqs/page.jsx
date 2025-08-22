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
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>Frequently Asked Questions</h1>
                    <p className='pr-[20px] text-[#4B4D4D] text-[16px] font-[400] '>Do you have questions? Here are the answers to the most common questions about Timeflyz.</p>
                </div>
                <div className='w-[50%]'>
                    <img alt='timeflyz' className='w-full' src='/img/faq.png' />
                </div>
            </div>

            <div className='flex items-center justify-between my-[80px] px-[30px]'>
                <div className='w-full'>
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

            <Reviews />
            <CTA />
            <HotelChains />

            <FooterNew />
        </div>
    )
}

export default page