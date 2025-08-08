import React from 'react'
import Slider from 'react-slick'

import Button from "@/components/ui/Button";

function Reviews() {

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
        <div className='px-5 md:px-[30px] reviewsmain w-full overflow-x-hidden'>
            <div className='flex justify-between items-end flex-wrap md:flex-nowrap'>
                <div>
                    <h2 className="text-center md:text-left text-[28px] md:text-[55px] font-[700] text-[#4B4D4D] mb-[16px] tracking-normal">
                        Satisfied customers in <br /> over 29 countries
                    </h2>
                    <h5 className="text-center md:text-left text-[16px] text-[#4B4D4D] font-[400]">People who have tried daytime hotels have not been disappointed. Read about<br /> their experiences!</h5>
                </div>
                <div className='mt-5 w-full md:w-auto'>
                    <img className='m-auto' src="/img/trustpilot-logo.png" />
                    <img src="/img/trustpilot_5_stars.png" className='m-auto mt-[10px]' />
                    <span className='inline-block w-full text-center md:text-right text-[12px] text-[#181818] font-[400] mt-[7px]'><span className='font-[700]'>4.8</span> out of 5</span>
                </div>
            </div>

            <div className="sliderDiv w-full mx-auto mt-[40px] px-[30px]">
                <Slider infinite autoplay autoplaySpeed={2000} pauseOnHover={false} {...settings}>
                    <div className="text-black overflow-visible">
                        <div className='p-5 md:p-[30px] w-[97%] md:h-[322px] shadow-[0_4px_50px_rgba(0,0,0,0.25)] bg-white rounded-[20px] flex flex-col justify-between'>
                            <h3 className='text-[20px] text-[#000] font-[400]'>Lorem ipsum dolor sit amet consectetur. Placerat mauris lorem sed vitae. Amet eget viverra at placerat quis consequat. Blandit ac ut eget vitae varius amet. </h3>

                            <div>
                                <img src="/img/trustpilot_5_stars.png" className='w-[144px]' />
                                <h2 className='text-[20px] text-[#4B4D4D] font-[700] mt-[6px]'>Marc</h2>
                            </div>
                        </div>
                    </div>

                    <div className="text-black overflow-visible">
                        <div className='p-5 md:p-[30px] w-[97%] md:h-[322px] shadow-[0_4px_50px_rgba(0,0,0,0.25)] bg-white rounded-[20px] flex flex-col justify-between'>
                            <h3 className='text-[20px] text-[#000] font-[400]'>Lorem ipsum dolor sit amet consectetur. Placerat mauris lorem sed vitae. Amet eget viverra at placerat quis consequat. </h3>

                            <div>
                                <img src="/img/trustpilot_5_stars.png" className='w-[144px]' />
                                <h2 className='text-[20px] text-[#4B4D4D] font-[700] mt-[6px]'>John</h2>
                            </div>
                        </div>
                    </div>

                    <div className="text-black overflow-visible">
                        <div className='p-5 md:p-[30px] w-[97%] md:h-[322px] shadow-[0_4px_50px_rgba(0,0,0,0.25)] bg-white rounded-[20px] flex flex-col justify-between'>
                            <h3 className='text-[20px] text-[#000] font-[400]'>Lorem ipsum dolor sit amet consectetur. Placerat mauris lorem sed vitae. Amet eget viverra at place ratlorem lorem sed vitae sed vitae. </h3>

                            <div>
                                <img src="/img/trustpilot_5_stars.png" className='w-[144px]' />
                                <h2 className='text-[20px] text-[#4B4D4D] font-[700] mt-[6px]'>Sophia</h2>
                            </div>
                        </div>
                    </div>

                    <div className="text-black overflow-visible">
                        <div className='p-5 md:p-[30px] w-[97%] md:h-[322px] shadow-[0_4px_50px_rgba(0,0,0,0.25)] bg-white rounded-[20px] flex flex-col justify-between'>
                            <h3 className='text-[20px] text-[#000] font-[400]'>Lorem ipsum dolor sit amet consectetur. Placerat mauris lorem sed vitae. Amet eget viverra at placerat quis consequat. Blandit ac ut eget vitae  </h3>

                            <div>
                                <img src="/img/trustpilot_5_stars.png" className='w-[144px]' />
                                <h2 className='text-[20px] text-[#4B4D4D] font-[700] mt-[6px]'>Ava</h2>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            <div className='w-full text-center mt-[48px]'>
                <Button fullWidth={false} className="mx-auto text-md capitalize w-[217px] h-[60px] rounded-[12px]">
                    Read more reviews
                </Button>
            </div>
        </div>
    )
}

export default Reviews