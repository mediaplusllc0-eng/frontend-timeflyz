'use client'
import React, { useRef, useState } from 'react'
import Navbar from "@/components/layout/Header-new";
import Slider from 'react-slick';
import Link from 'next/link';
import Button from "@/components/ui/Button";
import { useDispatch } from 'react-redux';
import { setAuthUser } from "../../components/layout/auth/authSlice";
import { useLoginMutation } from "../../components/layout/auth/authApi";
import { setProfile } from "@/app/profile/services/userSlice";
import { useGetProfileQuery } from "@/app/profile/services/userApi";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function page() {

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        let value = e.target.value;

        // Take only first digit if user enters more than one character
        value = value.replace(/\D/g, '').slice(0, 1);

        if (value) {
            e.target.value = value; // Ensure input only contains one digit
            if (index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        } else {
            // If input is cleared (like pressing backspace)
            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div className='loginMain h-[100vh] overflow-hidden'>
            <Navbar />
            <div className='w-full h-[calc(100vh-80px)] flex'>
                <div className='w-[50%] h-full'>
                    <div className="sliderDiv w-full h-full mx-auto">
                        <Slider touchMove={true} pauseOnHover={false} autoplay={true} autoplaySpeed={4000} {...settings}>
                            <div className="text-black">
                                <img src="/img/loginSlide1.png" className="w-full h-[calc(100vh-80px)] object-cover" />
                            </div>
                            <div className="text-black">
                                <img src="/img/loginSlide2.png" className="w-full h-[calc(100vh-80px)] object-cover" />
                            </div>
                            <div className="text-black">
                                <img src="/img/loginSlide3.png" className="w-full h-[calc(100vh-80px)] object-cover" />
                            </div>
                            <div className="text-black">
                                <img src="/img/loginSlide4.png" className="w-full h-[calc(100vh-80px)] object-cover" />
                            </div>
                            <div className="text-black">
                                <img src="/img/loginSlide5.png" className="w-full h-[calc(100vh-80px)] object-cover" />
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className='w-[50%] h-full relative p-[50px] flex flex-col justify-center overflow-y-scroll'>
                    <div className='h-[calc(100%-60px)] flex flex-col justify-center'>
                        <h1 className='text-[#4B4D4D] text-[24px] font-[600] '>OTP Varification</h1>
                        <p className='text-[#848484] text-[16px] font-[400] '>Please enter your 6 digit OTP we have send on you email or phone.</p>

                        <form >
                            <div className="flex gap-[30px] mt-[20px] mb-5">
                                {[...Array(6)].map((_, i) => (
                                    <input
                                        key={i}
                                        type="number"
                                        maxLength="1"
                                        className="w-[60px] h-[60px] bg-[#E4E4E4] text-center text-xl rounded-[12px] outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => handleChange(e, i)}
                                        ref={(el) => (inputsRef.current[i] = el)}
                                    />
                                ))}
                            </div>
                            <div className='w-full'>
                                <Button type="submit" fullWidth={false} className="w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]">Verify</Button>
                            </div>
                        </form>
                    </div>
                    <div className='absolute bottom-[20px] w-[calc(100%-100px)]'>
                        <div className='h-[1px] w-full bg-[#CECECE] mb-[15px]' />
                        <p className='text-center text-[#848484] text-[16px] font-[400] '>Don’t have an account? <Link href="sign-up" className='text-[#EF4A23]'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page