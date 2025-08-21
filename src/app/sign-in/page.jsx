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

    const dispatch = useDispatch();
    const router = useRouter();

    const [loginUser, { isLoading }] = useLoginMutation();
    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
        refetch: refetchProfile,
    } = useGetProfileQuery({});

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
        password: "",
    })

    let [passwordShow, setPasswordShow] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        const loginData = formData

        try {
            const response = await loginUser(loginData).unwrap();
            const { access_token, refresh_token, ...userData } = response.data;
            console.log(userData)
            if (access_token && refresh_token && userData) {
                dispatch(
                    setAuthUser({
                        token: access_token,
                        refreshToken: refresh_token,
                        user: userData,
                    })
                );

                localStorage.setItem("token", access_token);
                localStorage.setItem("refreshToken", refresh_token);
                localStorage.removeItem("guestFavorites");
                toast.success(response.message);

                const profileRes = await refetchProfile();
                if (profileRes.data) {
                    dispatch(setProfile(profileRes.data));
                }

                router.push("/dashboard/reservations")
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            const message = "Login failed";
            toast.error(message);
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
                        <h1 className='text-[#4B4D4D] text-[24px] font-[600] '>Sign in</h1>
                        <p className='text-[#848484] text-[16px] font-[400] '>Please enter your valid details to sign in</p>

                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='flex flex-wrap justify-between items-center gap-y-[10px] mt-[20px]'>
                                <div
                                    tabIndex={0}
                                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(50%-5px)] h-[60px]">
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
                                <div
                                    tabIndex={0}
                                    className="mb-5 md:mb-0 relative cursor-pointer inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(50%-5px)] h-[60px]">
                                    <label className="cursor-pointer m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]">Password</label>
                                    <input
                                        type={passwordShow ? "text" : "password"}
                                        placeholder='Eg: @Example123'
                                        className="outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px] cursor-pointer"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <div onClick={() => setPasswordShow(!passwordShow)} className='absolute right-[15px] top-[20px] '>
                                        {passwordShow ?
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M3 3L21 21" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            :
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                                <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                            </svg>
                                        }
                                    </div>
                                </div>
                                <div className='w-full mt-[5px]'>
                                    <Link href="forgot-password" className='text-[#EF4A23] text-[16px] font-[400]'>Forgot password?</Link>
                                </div>
                                <div className='w-full flex gap-[16px]'>
                                    <Button type="submit" fullWidth={false} className="w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]">Sign in</Button>
                                    <Button theme="google" type="submit" fullWidth={false} className="flex items-center gap-[3px] bg-[#4285F4] w-full md:w-[180px] rounded-[12px] h-[60px] mt-[10px]">
                                        <img src='/img/googleIcon.png' />
                                        Sign in google
                                    </Button>
                                    <Button theme="apple" type="submit" fullWidth={false} className="flex items-center gap-[3px] bg-[#000000] w-full md:w-[170px] rounded-[12px] h-[60px] mt-[10px]">
                                        <img src='/img/appleIcon.png' />
                                        Sign in apple
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='absolute bottom-[20px] w-[calc(100%-100px)]'>
                        <div className='h-[1px] w-full bg-[#CECECE] mb-[15px]' />
                        <p className='text-center text-[#848484] text-[16px] font-[400] '>Don’t have an account? <Link href="sign-up" className='text-[#EF4A23]'>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page