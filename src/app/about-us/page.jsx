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
            title: 'A leading brand',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
        {
            title: 'Best in hotel search',
            content: `Lorem ipsum dolor sit amet consectetur. Blandit magnis id pretium fermentum non leo lacinia in pellentesque. Venenatis sed magna ac eu. Quis amet morbi malesuada dictum integer semper. Lectus scelerisque tincidunt turpis aliquam non. Ligula egestas cras integer euismod amet mi dis metus scelerisque. Nisl proin urna lobortis tristique est sollicitudin quis placerat.`,
        },
        {
            title: 'Empowering travelers',
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
                    <h5 className='text-[#EF4A23] text-[16px] font-[400] mb-[10px]'>Our mission</h5>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>When travelers are searching for a hotel, we want the obvious choice to be timeflyz.</h1>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>We help them find the best place to stay and the best time to go. We empower them to book with confidence, saving them valuable time and money.</p>
                </div>
                <div className='w-[50%]'>
                    <img className='w-full' src='/img/aboutSection1.png' />
                </div>
            </div>

            <div className='flex items-center justify-between mt-[80px] px-[30px]'>
                <div className='w-[50%]'>
                    <img className='w-[calc(100%-60px)]' src='/img/aboutSection2.png' />
                </div>
                <div className='w-[50%] pl-[20px]'>
                    <h5 className='text-[#EF4A23] text-[16px] font-[400] mb-[10px]'>Our strategy</h5>
                    <div className="w-full mx-auto space-y-[12px]">
                        {accordionData.map((item, index) => (
                            <div
                                key={index}
                                className=""
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="bg-[#FED1C7] rounded-[12px] w-full flex items-center justify-between text-[#4B4D4D] text-[28px] font-[700] px-[20px] h-[50px]"
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

            <div className='flex items-center px-[30px] mt-[80px]'>
                <div className='w-[50%]'>
                    <h5 className='text-[#EF4A23] text-[16px] font-[400] mb-[10px]'>Our story</h5>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>Timeflyz is one of the most successful European travel brands to scale globally.</h1>
                </div>
                <div className='w-[50%] pl-[140px]'>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>Lorem ipsum dolor sit amet consectetur. Quis facilisis in turpis elementum fringilla. Velit quisque lacus habitasse phasellus bibendum libero pharetra velit. Ultrices lacus gravida vulputate fames eget malesuada auctor. Ipsum suspendisse bibendum volutpat lectus velit. Facilisi morbi arcu cursus suspendisse nulla at. Lorem ipsum dolor sit amet consectetur. Quis facilisis in turpis elementum fringilla. Velit quisque lacus habitasse phasellus bibendum libero pharetra velit. Ultrices lacus gravida vulputate fames eget malesuada auctor. Ipsum suspendisse bibendum volutpat lectus </p>
                </div>
            </div>

            <div className='flex items-center px-[30px] mb-[80px]'>
                <div className='w-[50%]'>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>Lorem ipsum dolor sit amet consectetur. Quis facilisis in turpis elementum fringilla. Velit quisque lacus habitasse phasellus bibendum libero pharetra velit. Ultrices lacus gravida vulputate fames eget malesuada auctor. Ipsum suspendisse bibendum volutpat lectus velit. Facilisi morbi arcu cursus suspendisse nulla at.</p>
                    <br />
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>Lorem ipsum dolor sit amet consectetur. Quis facilisis in turpis elementum fringilla. Velit quisque lacus habitasse phasellus bibendum libero pharetra velit. Ultrices lacus gravida vulputate fames eget malesuada auctor. Ipsum suspendisse bibendum volutpat lectus </p>
                </div>
                <div className='w-[50%]'>
                    <img className='w-full pl-[140px]' src='/img/aboutSection3.png' />
                </div>
            </div>

            <div className='px-[30px]'>
                <div className='bg-[#FED1C7] w-full h-[450px] rounded-[20px] p-[50px]'>
                    <h2 className='text-center text-[#4B4D4D] text-[28px] font-[700]'>Our company stats</h2>
                    <div className='w-full flex justify-between items-center mt-[40px]'>
                        <div className='w-[calc(25%-20px)] flex flex-col items-center'>
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M91.6663 50C91.6663 26.9882 73.0113 8.33337 49.9997 8.33337C26.9878 8.33337 8.33301 26.9882 8.33301 50C8.33301 73.0117 26.9878 91.6667 49.9997 91.6667C73.0113 91.6667 91.6663 73.0117 91.6663 50Z" stroke="#EF4A23" strokeWidth="4" />
                                <path d="M83.3337 23.7458C79.4391 24.0265 74.4507 25.5344 70.9916 30.0116C64.7441 38.0984 58.4961 38.7732 54.3311 36.0776C48.0832 32.0342 53.3336 25.4849 46.0007 21.9257C41.2217 19.606 40.5554 13.2936 43.2153 8.33337" stroke="#EF4A23" strokeWidth="4" strokeLinejoin="round" />
                                <path d="M8.33301 45.8334C11.5101 48.5921 15.9599 51.1175 21.2028 51.1175C32.0348 51.1175 34.2012 53.1871 34.2012 61.4659C34.2012 69.7446 34.2012 69.7446 36.3676 75.9534C37.7768 79.9921 38.2693 84.0309 35.4605 87.5" stroke="#EF4A23" strokeWidth="4" strokeLinejoin="round" />
                                <path d="M91.6663 56.0513C87.9701 53.9213 83.333 53.045 78.6388 56.4188C69.6568 62.8742 63.4638 57.525 60.6743 62.8704C56.5684 70.7396 71.2318 73.2129 58.333 91.6667" stroke="#EF4A23" strokeWidth="4" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[55px] font-[700] text-center mb-[12px] mt-[20px]'>190</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>We are present in 190 countries</p>
                        </div>

                        <div className='w-[calc(25%-20px)] flex flex-col items-center'>
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M82.2724 54.1667C85.5678 49.4425 87.5003 43.6967 87.5003 37.5C87.5003 21.3917 74.442 8.33337 58.3337 8.33337C42.2253 8.33337 29.167 21.3917 29.167 37.5C29.167 41.9734 30.174 46.2113 31.9738 50" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M58.3333 25C53.7308 25 50 27.7982 50 31.25C50 34.7018 53.7308 37.5 58.3333 37.5C62.9358 37.5 66.6667 40.2982 66.6667 43.75C66.6667 47.2017 62.9358 50 58.3333 50M58.3333 25C61.9617 25 65.0483 26.7392 66.1925 29.1667M58.3333 25V20.8334M58.3333 50C54.705 50 51.6183 48.2609 50.4742 45.8334M58.3333 50V54.1667" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" />
                                <path d="M12.5 58.3334H22.4784C23.704 58.3334 24.9128 58.6096 26.009 59.14L34.5173 63.2567C35.6135 63.7871 36.8223 64.063 38.0479 64.063H42.3921C46.5938 64.063 50 67.3592 50 71.425C50 71.5892 49.8875 71.7338 49.7242 71.7788L39.137 74.7063C37.2378 75.2313 35.2042 75.0484 33.4375 74.1934L24.3421 69.793M50 68.75L69.1367 62.8705C72.5292 61.8134 76.1963 63.0667 78.3213 66.0096C79.8579 68.1371 79.2321 71.1842 76.9938 72.4759L45.6788 90.5438C43.6871 91.693 41.3373 91.9734 39.1465 91.3234L12.5 83.4163" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[55px] font-[700] text-center mb-[12px] mt-[20px]'>100s</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>We compare price from hundreds of sites, helping you save time and money</p>
                        </div>

                        <div className='w-[calc(25%-20px)] flex flex-col items-center'>
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 16.6666V83.3333C12.5 87.2616 12.5 89.2258 13.7204 90.4462C14.9408 91.6666 16.905 91.6666 20.8333 91.6666H79.1667C83.095 91.6666 85.0592 91.6666 86.2796 90.4462C87.5 89.2258 87.5 87.2616 87.5 83.3333V16.6666" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M43.75 33.3334V39.5834M43.75 39.5834V45.8334M43.75 39.5834H56.25M56.25 33.3334V39.5834M56.25 39.5834V45.8334" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M58.3337 91.6667V74.9996C58.3337 70.3975 54.6028 66.6663 50.0003 66.6663C45.3978 66.6663 41.667 70.3975 41.667 74.9996V91.6667" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.33301 16.6667H33.333C35.9993 11.7803 42.4568 8.33337 49.9997 8.33337C57.5426 8.33337 64.0001 11.7803 66.6663 16.6667H91.6663" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M25 33.3334H29.1667M25 50H29.1667M25 66.6667H29.1667" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M70.833 33.3334H74.9997M70.833 50H74.9997M70.833 66.6667H74.9997" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[55px] font-[700] text-center mb-[12px] mt-[20px]'>50+m</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>We help millions of monthly users find great hotel deal with a few simple clicks</p>
                        </div>

                        <div className='w-[calc(25%-20px)] flex flex-col items-center'>
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M62.5 33.3334C62.5 40.2369 56.9037 45.8334 50 45.8334C43.0962 45.8334 37.5 40.2369 37.5 33.3334C37.5 26.4298 43.0962 20.8334 50 20.8334C56.9037 20.8334 62.5 26.4298 62.5 33.3334Z" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M66.667 16.6666C73.5703 16.6666 79.167 22.2631 79.167 29.1666C79.167 34.2628 76.117 38.6468 71.7432 40.5929" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M57.143 58.3334H42.8572C32.9949 58.3334 25 66.3284 25 76.1905C25 80.1355 28.198 83.3334 32.1428 83.3334H67.8572C71.8022 83.3334 75.0001 80.1355 75.0001 76.1905C75.0001 66.3284 67.0051 58.3334 57.143 58.3334Z" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M73.8096 54.1666C83.6717 54.1666 91.6667 62.1616 91.6667 72.0237C91.6667 75.9687 88.4687 79.1666 84.5237 79.1666" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M33.333 16.6666C26.4295 16.6666 20.833 22.2631 20.833 29.1666C20.833 34.2628 23.8827 38.6468 28.2567 40.5929" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.4759 79.1666C11.531 79.1666 8.33301 75.9687 8.33301 72.0237C8.33301 62.1616 16.3279 54.1666 26.1901 54.1666" stroke="#EF4A23" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h1 className='text-[#4B4D4D] text-[55px] font-[700] text-center mb-[12px] mt-[20px]'>600+</h1>
                            <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>We are proud of our international team.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap items-center px-[30px] mt-[80px]'>
                <div className='w-[50%]'>
                    <h5 className='text-[#EF4A23] text-[16px] font-[400] mb-[10px]'>Leadership</h5>
                    <h1 className='text-[#4B4D4D] text-[55px] font-[700] mb-[16px]'>We are a team of passionate innovators and entrepreneurs.</h1>
                </div>
                <div className='w-[50%] pl-[140px]'>
                    <p className='text-[#4B4D4D] text-[16px] font-[400] '>Our dynamic leadership team has deep roots in trivago, and have been instrumental in our global growth. Bold and execution-focused, they possess extensive experience across marketing, product, and operations. Driven by a commitment to consistent incremental improvements they are focused on creating significant value for both users and advertising partners. The team’s entrepreneurial expertise and deep industry knowledge uniquely position them to drive sustainable growth and elevate trivago to new heights.</p>
                </div>

                <div className='w-[100%] flex justify-between my-[50px]'>
                    <div className='w-[calc(25%-15px)]'>
                        <img className='w-full' src='/img/team1.png' />
                        <h3 className='text-[#4B4D4D] text-[18px] font-[600] mt-[20px]'>John Albart</h3>
                        <span className='text-[#848484] text-[16px] font-[400]'>Co Founder</span>
                    </div>
                    <div className='w-[calc(25%-15px)]'>
                        <img className='w-full' src='/img/team2.png' />
                        <h3 className='text-[#4B4D4D] text-[18px] font-[600] mt-[20px]'>John Albart</h3>
                        <span className='text-[#848484] text-[16px] font-[400]'>Co Founder</span>
                    </div>
                    <div className='w-[calc(25%-15px)]'>
                        <img className='w-full' src='/img/team3.png' />
                        <h3 className='text-[#4B4D4D] text-[18px] font-[600] mt-[20px]'>John Albart</h3>
                        <span className='text-[#848484] text-[16px] font-[400]'>Co Founder</span>
                    </div>
                    <div className='w-[calc(25%-15px)]'>
                        <img className='w-full' src='/img/team4.png' />
                        <h3 className='text-[#4B4D4D] text-[18px] font-[600] mt-[20px]'>John Albart</h3>
                        <span className='text-[#848484] text-[16px] font-[400]'>Co Founder</span>
                    </div>
                </div>
            </div>

            <div className='w-full pl-[30px] mb-[80px]'>
                <h2 className='text-center text-[#4B4D4D] text-[28px] font-[700] '>Latest news</h2>

                <div className='w-[100%] flex justify-between mt-[40px] mb-[50px]'>
                    <Slider className='w-full' infinite={false} autoplay={false} autoplaySpeed={2000} pauseOnHover={false} {...settings}>
                        <div>
                            <div className='w-[calc(100%-15px)] bg-[#F4F4F4] p-[12px] rounded-[20px]'>
                                <img src='/img/news1.png' className='w-full h-[158px] object-cover rounded-[20px] overflow-hidden' />
                                <h2 className='text-[#4B4D4D] text-[18px] font-[700] mt-[12px]'>Timeflyz Reports 17% Growth in Second Consecutive Quarter of Strong Performance</h2>
                                <span className='text-[#848484] text-[14px] font-[400] mt-[50px] block'>Aug 6, 2025</span>
                            </div>
                        </div>

                        <div>
                            <div className='w-[calc(100%-15px)] bg-[#F4F4F4] p-[12px] rounded-[20px]'>
                                <img src='/img/news2.png' className='w-full h-[158px] object-cover rounded-[20px] overflow-hidden' />
                                <h2 className='text-[#4B4D4D] text-[18px] font-[700] mt-[12px]'>Timeflyz Unveils Savvy Traveler Guide, Revealing What Drives U.S. Travel in 2025</h2>
                                <span className='text-[#848484] text-[14px] font-[400] mt-[50px] block'>Aug 6, 2025</span>
                            </div>
                        </div>

                        <div>
                            <div className='w-[calc(100%-15px)] bg-[#F4F4F4] p-[12px] rounded-[20px]'>
                                <img src='/img/news3.png' className='w-full h-[158px] object-cover rounded-[20px] overflow-hidden' />
                                <h2 className='text-[#4B4D4D] text-[18px] font-[700] mt-[12px]'>Don’t let the 4th of July blow up your budget: Check out our affordable destination list</h2>
                                <span className='text-[#848484] text-[14px] font-[400] mt-[50px] block'>Aug 6, 2025</span>
                            </div>
                        </div>

                        <div>
                            <div className='w-[calc(100%-15px)] bg-[#F4F4F4] p-[12px] rounded-[20px]'>
                                <img src='/img/news4.png' className='w-full h-[158px] object-cover rounded-[20px] overflow-hidden' />
                                <h2 className='text-[#4B4D4D] text-[18px] font-[700] mt-[12px]'>Timeflyz Reports 17% Growth in Second Consecutive Quarter of Strong Performance</h2>
                                <span className='text-[#848484] text-[14px] font-[400] mt-[50px] block'>Aug 6, 2025</span>
                            </div>
                        </div>
                    </Slider>
                </div>

                <div className='w-full text-center'>
                    <Button fullWidth={false} className="mx-auto text-[16px] w-[259px] h-[60px] rounded-[12px]">
                        Read more in newsroom
                    </Button>
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