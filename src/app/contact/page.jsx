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
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>Submit a request</h1>
                    <p className='pr-[20px] text-[#4B4D4D] text-[16px] font-[400] '>Have questions or need assistance? We're here to help—reach out to us anytime!</p>
                    <div className='w-[calc(100%-132px)] flex flex-wrap justify-between items-center gap-y-[10px] mt-[28px] pr-[20px]'>
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
                        <div
                            tabIndex={0}
                            className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-full h-[60px]">
                            <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Subject</label>
                            <input
                                type='text'
                                placeholder='Enter subject'
                                className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                        </div>
                        <div
                            tabIndex={0}
                            className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[100%] h-auto">
                            <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Description</label>
                            <textarea
                                rows={5}
                                placeholder='Enter max 500 words'
                                className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer" />
                        </div>

                        <Button fullWidth={false} className="w-full md:w-[228px] rounded-[12px] h-[60px] mt-[10px]">Submit request</Button>

                    </div>
                </div>
                <div className='w-[50%]'>
                    <img alt='timeflyz' className='w-full' src='/img/contactPage.png' />
                </div>
            </div>

            <CTA />
            <HotelChains />

            <FooterNew />
        </div>
    )
}

export default page