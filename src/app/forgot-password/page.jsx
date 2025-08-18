'use client'
import React, { useState } from 'react'
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

    let [formData, setFormData] = useState({
        email: "",
    })

    let [activeState, setActiveState] = useState("email")

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
                        <h1 className='text-[#4B4D4D] text-[24px] font-[600] '>Reset Password</h1>
                        <p className='text-[#848484] text-[16px] font-[400] '>Please enter your registered email or phone to reset</p>

                        <div className='mt-[20px] w-[292px] h-[35px] bg-[#E4E4E4] flex justify-between rounded-[50px]'>
                            <button onClick={() => setActiveState("email")} className={`${activeState === "email" ? "shadow-[0_4px_15px_0_rgba(0,0,0,0.25)] bg-[#EF4A23] text-[#FFFFFF]" : ""} w-[50%] rounded-[50px] text-[16px] font-[500] transition-all`}>Email</button>
                            <button onClick={() => setActiveState("phone")} className={`${activeState === "phone" ? "shadow-[0_4px_15px_0_rgba(0,0,0,0.25)] bg-[#EF4A23] text-[#FFFFFF]" : ""} w-[50%] rounded-[50px] text-[16px] font-[500] transition-all`}>Phone</button>
                        </div>

                        <form >
                            <div className='flex flex-wrap justify-between items-center gap-y-[10px] mt-[20px]'>
                                {activeState === "email" ?
                                    <div
                                        tabIndex={0}
                                        className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[100%] h-[60px]">
                                        <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Email</label>
                                        <input
                                            type='email'
                                            placeholder='Enter email address'
                                            className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    :
                                    <div
                                        tabIndex={0}
                                        className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[100%] h-[60px]">
                                        <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Phone number</label>
                                        <input
                                            type='number'
                                            placeholder='+971'
                                            className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                }
                                <div className='w-full'>
                                    <Button type="submit" fullWidth={false} className="w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]">Send OTP</Button>
                                </div>
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