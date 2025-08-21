'use client'
import React, { useEffect, useState } from 'react'
import Button from "@/components/ui/Button";
import { useGetProfileQuery } from "@/app/profile/services/userApi";

function page() {

    let [edit, setEdit] = useState(false)

    let [passwordShow, setPasswordShow] = useState(false)
    let [passwordRetypeShow, setPasswordRetypeShow] = useState(false)

    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
        refetch: refetchProfile,
    } = useGetProfileQuery({});

    let [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        password: "",
        retypePassword: ""
    })

    useEffect(() => {
        if (profileData?.data) {
            let data = {
                firstName: profileData?.data?.name?.split(" ")[0],
                lastName: profileData?.data?.name?.split(" ")[1],
                email: profileData?.data?.email,
                number: profileData?.data?.phone,
                password: "",
                retypePassword: ""
            }
            setFormData(data)
        }
    }, [profileData, edit])

    return (
        <div>
            <h1 className='text-[#4B4D4D] text-[24px] font-[700] mb-[20px]'>My Account</h1>

            <div className='flex flex-wrap justify-start items-center gap-[10px] mt-[20px]'>
                <div
                    tabIndex={0}
                    className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} mb-5 md:mb-0 relative inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(35%-5px)] h-[60px]`}>
                    <label className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]`}>First name</label>
                    <input
                        type='text'
                        placeholder='Enter first name'
                        className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px]`}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        disabled={!edit}
                    />
                </div>
                <div
                    tabIndex={0}
                    className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} mb-5 md:mb-0 relative inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(35%-5px)] h-[60px]`}>
                    <label className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]`}>Last name</label>
                    <input
                        type='text'
                        placeholder='Enter last name'
                        className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px]`}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        disabled={!edit}
                    />
                </div>
                <div
                    tabIndex={0}
                    className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} mb-5 md:mb-0 relative inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(35%-5px)] h-[60px]`}>
                    <label className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]`}>Email</label>
                    <input
                        type='email'
                        placeholder='Enter email address'
                        className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px]`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={!edit}
                    />
                </div>
                <div
                    tabIndex={0}
                    className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} mb-5 md:mb-0 relative inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(35%-5px)] h-[60px]`}>
                    <label className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]`}>Phone number</label>
                    <input
                        type='number'
                        placeholder='+971'
                        className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px]`}
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        disabled={!edit}
                    />
                </div>
            </div>

            <h1 className='text-[#4B4D4D] text-[24px] font-[700] mb-[20px] mt-[30px]'>My Account</h1>
            <div className='flex flex-wrap justify-start items-center gap-[10px] mt-[20px]'>
                <div
                    tabIndex={0}
                    className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} mb-5 md:mb-0 relative inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(35%-5px)] h-[60px]`}>
                    <label className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]`}>Password</label>
                    <input
                        type={passwordShow ? "text" : "password"}
                        placeholder='Eg: @Example123'
                        className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px]`}
                        // value={formData.password}
                        // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={!edit}
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
                <div
                    tabIndex={0}
                    className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} mb-5 md:mb-0 relative inputDiv flex flex-col rounded-[12px] bg-[#E4E4E4] py-[12px] px-[16px] w-[100%] md:w-[calc(35%-5px)] h-[60px]`}>
                    <label className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} m-0 text-[16px] text-[#4B4D4D] font-[500] mt-[-2px]`}>Retype password</label>
                    <input
                        type={passwordRetypeShow ? "text" : "password"}
                        placeholder='Eg: @Example123'
                        className={`${!edit ? "cursor-not-allowed" : "cursor-pointer"} outline-0 inline-block w-full text-[16px] text-[#848484] font-[400] mt-[-5px]`}
                        // value={formData.password}
                        // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={!edit}
                    />
                    <div onClick={() => setPasswordRetypeShow(!passwordRetypeShow)} className='absolute right-[15px] top-[20px] '>
                        {passwordRetypeShow ?
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
            </div>
            <div className='mt-[20px]'>
                {!edit ?
                    <Button fullWidth={false} className="w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]" onClick={() => setEdit(true)}>Edit</Button>
                    :
                    <>
                        <Button fullWidth={false} className="w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]">Save</Button>
                        <Button theme="outline" fullWidth={false} className="ml-[10px] w-full md:w-[163px] rounded-[12px] h-[60px] mt-[10px]" onClick={() => setEdit(false)}>Cancel</Button>
                    </>
                }
            </div>
        </div>
    )
}

export default page