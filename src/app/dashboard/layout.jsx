'use client'
import React, { useEffect, useState } from 'react'
import Navbar from "@/components/layout/Header-new";
import FooterNew from '@/components/layout/FooterNew';
import Link from 'next/link';
import { useGetProfileQuery } from "@/app/profile/services/userApi";
import { setProfile, clearProfile } from "@/app/profile/services/userSlice";
import { persistor } from "@/utils/store";
import { api } from "@/utils/api2";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

function layout(props) {

    let [current, setCurrent] = useState()

    let dispatch = useDispatch()
    let router = useRouter()
    let pathname = usePathname()

    useEffect(() => {
        let route = window.location.pathname
        if (route == "/dashboard/reservations") {
            setCurrent("reservations")
        }
        if (route == "/dashboard/favorites") {
            setCurrent("favorites")
        }
        if (route == "/dashboard/account") {
            setCurrent("account")
        }
    }, [pathname])

    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
        refetch: refetchProfile,
    } = useGetProfileQuery({});

    const handleLogout = async () => {
        try {
            localStorage.clear();

            dispatch(clearProfile());

            await persistor.purge();

            await dispatch(api.util.resetApiState());
            toast.success("Logged out successfully!");
            router.push("/");
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='dashboardLayoutMain flex justify-between my-[30px] px-[30px]'>
                <div className='h-[314px] w-[283px] bg-[#FED1C7] rounded-[20px] p-[20px] '>
                    <h2 className='text-[#4B4D4D] text-[16px] font-[400]'>Welcome Back 😍</h2>
                    <h1 className='text-[#4B4D4D] text-[16px] font-[700]'>{profileData?.data?.name}</h1>
                    <ul className='w-full mt-[20px]'>
                        <li className='w-full'>
                            <Link href='/dashboard/reservations' className={`hover:bg-[#fff] rounded-[12px] px-[15px] p-[10px] w-full h-[43px] flex items-center justify-between ${current == "reservations" ? "bg-[#FFFFFF]" : ""}`}>
                                <span className='flex items-center gap-[10px]'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.99153 15.1475C2.86712 15.0618 2.75138 14.9654 2.64297 14.857C1.66666 13.8807 1.66666 12.3093 1.66666 9.16667C1.66666 6.02397 1.66666 4.45262 2.64297 3.47631C3.61929 2.5 5.19063 2.5 8.33333 2.5H11.6667C14.8093 2.5 16.3807 2.5 17.357 3.47631C18.3333 4.45262 18.3333 6.02397 18.3333 9.16667C18.3333 12.3093 18.3333 13.8807 17.357 14.857C17.2486 14.9654 17.1329 15.0618 17.0085 15.1475" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M7.23858 14.1047C6.51809 14.5434 4.62902 15.4394 5.7796 16.5604C6.34164 17.108 6.96761 17.4997 7.75461 17.4997H12.2454C13.0324 17.4997 13.6583 17.108 14.2204 16.5604C15.371 15.4394 13.4819 14.5434 12.7614 14.1047C11.0719 13.0758 8.92808 13.0758 7.23858 14.1047Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.0833 9.16634C12.0833 10.3169 11.1506 11.2497 10 11.2497C8.84941 11.2497 7.91666 10.3169 7.91666 9.16634C7.91666 8.01575 8.84941 7.08301 10 7.08301C11.1506 7.08301 12.0833 8.01575 12.0833 9.16634Z" stroke="#4B4D4D" strokeWidth="1.5" />
                                    </svg>
                                    Reservations
                                </span>
                                {current == "reservations" &&
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.00001 1L7 6.99997L1 13" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                }
                            </Link>
                        </li>
                        <li className='w-full mt-[10px]'>
                            <Link href='/dashboard/favorites' className={`hover:bg-[#fff] rounded-[12px] px-[15px] p-[10px] w-full h-[43px] flex items-center justify-between ${current == "favorites" ? "bg-[#FFFFFF]" : ""}`}>
                                <span className='flex items-center gap-[10px]'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.67558 16.6401C6.32451 14.882 1.66666 10.8627 1.66666 7.24569C1.66666 4.85502 3.42105 2.91699 5.83333 2.91699C7.08333 2.91699 8.33333 3.33366 10 5.00033C11.6667 3.33366 12.9167 2.91699 14.1667 2.91699C16.5789 2.91699 18.3333 4.85502 18.3333 7.24569C18.3333 10.8627 13.6755 14.882 11.3244 16.6401C10.5332 17.2317 9.46675 17.2317 8.67558 16.6401Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    My Favorites
                                </span>
                                {current == "favorites" &&
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.00001 1L7 6.99997L1 13" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                }
                            </Link>
                        </li>
                        <li className='w-full mt-[10px]'>
                            <Link href='/dashboard/account' className={`hover:bg-[#fff] rounded-[12px] px-[15px] p-[10px] w-full h-[43px] flex items-center justify-between ${current == "account" ? "bg-[#FFFFFF]" : ""}`}>
                                <span className='flex items-center gap-[10px]'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_291_829)">
                                            <path d="M12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61925 5 7.5 6.11929 7.5 7.5C7.5 8.88075 8.61925 10 10 10C11.3807 10 12.5 8.88075 12.5 7.5Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.3333 10.0003C18.3333 5.39795 14.6023 1.66699 10 1.66699C5.39762 1.66699 1.66666 5.39795 1.66666 10.0003C1.66666 14.6027 5.39762 18.3337 10 18.3337C14.6023 18.3337 18.3333 14.6027 18.3333 10.0003Z" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.1667 14.1667C14.1667 11.8655 12.3012 10 10 10C7.69882 10 5.83334 11.8655 5.83334 14.1667" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_291_829">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    My Account
                                </span>
                                {current == "account" &&
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.00001 1L7 6.99997L1 13" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                }
                            </Link>
                        </li>
                        <li className='w-full mt-[10px]'>
                            <Link onClick={handleLogout} href='#' className={`hover:bg-[#fff] rounded-[12px] px-[15px] p-[10px] w-full h-[43px] flex items-center justify-between`}>
                                <span className='flex items-center gap-[10px]'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 14.5823C12.5 15.3573 12.5 15.7448 12.4148 16.0628C12.1837 16.9255 11.5097 17.5993 10.6471 17.8305C10.3292 17.9157 9.94167 17.9157 9.16667 17.9157H7.5C5.14297 17.9157 3.96447 17.9157 3.23223 17.1835C2.5 16.4513 2.5 15.2728 2.5 12.9157V7.08412C2.5 4.72728 2.5 3.54886 3.23216 2.81664C3.96432 2.08442 5.14274 2.08432 7.49958 2.08412L9.168 2.08399C9.9415 2.08392 10.3283 2.08389 10.6457 2.16873C11.5094 2.39965 12.1842 3.07429 12.4152 3.93805C12.5 4.2554 12.5 4.64218 12.5 5.41571" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.5 16.251C14.857 16.251 16.0355 16.251 16.7677 15.5188C17.5 14.7865 17.5 13.608 17.5 11.251V8.75101C17.5 6.39395 17.5 5.21544 16.7677 4.48321C16.0355 3.75098 14.857 3.75098 12.5 3.75098" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.3333 10.0004H7.5M12.0834 7.91699C12.0834 7.91699 14.1667 9.45136 14.1667 10.0004C14.1667 10.5494 12.0833 12.0837 12.0833 12.0837" stroke="#4B4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Log out
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='w-[calc(100%-313px)]'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default layout