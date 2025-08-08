import React from 'react'
import Button from "@/components/ui/Button";

function WhyUseUs() {
    return (
        <div className='px-5 md:px-[30px] w-full'>
            <div className='w-full h-auto bg-[#FED1C7] rounded-[20px] px-5 md:px-[40px] py-8 md:py-[60px]'>
                <div className='flex justify-between flex-wrap md:flex-nowrap gap-10 md:gap-20'>
                    <div className='w-full md:w-[50%] text-center md:text-left'>
                        <h2 className='text-center md:text-left text-[28px] md:text-[55px] text-[#4B4D4D] font-[700]'>Why use us for hotel booking?</h2>
                        <p className='text-center md:text-left text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Whatever your business, we’re your little black book of trusted big holiday hotels.</p>
                        <Button fullWidth={false} className="text-md capitalize w-[191px] h-[60px] rounded-[12px] mt-[30px]">
                            Search hotels
                        </Button>
                    </div>

                    <div className='w-full md:w-[60%] flex flex-wrap gap-y-10 md:gap-y-[60px] justify-between md:gap-x-[20px]'>
                        <div className='text-center md:text-left md:w-[47%]'>
                            <svg className='m-auto md:m-0' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 15.9862V19.3334C4 23.7331 4 25.933 5.36684 27.2999C6.73367 28.6667 8.93356 28.6667 13.3333 28.6667H18.6667C23.0664 28.6667 25.2663 28.6667 26.6332 27.2999C28 25.933 28 23.7331 28 19.3334V15.9862C28 13.7444 28 12.6237 27.5255 11.6534C27.0509 10.6832 26.1663 9.99508 24.3968 8.61885L21.7301 6.54477C18.9775 4.40384 17.6012 3.33337 16 3.33337C14.3988 3.33337 13.0225 4.40384 10.2699 6.54477L7.60321 8.61885C5.83377 9.99508 4.94905 10.6832 4.47453 11.6534C4 12.6237 4 13.7444 4 15.9862Z" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 28.6667V22C20 20.1144 20 19.1716 19.4143 18.5857C18.8284 18 17.8856 18 16 18C14.1144 18 13.1716 18 12.5858 18.5857C12 19.1716 12 20.1144 12 22V28.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className='text-[16px] text-[#4B4D4D] font-[700] mt-[12px]'>Hand-picked properties</h3>
                            <p className='text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Plan your trip or event with ease with one of our exclusive country house rentals. Browse over 100 hand-picked venues, from historic hotels.</p>
                        </div>

                        <div className='text-center md:text-left md:w-[47%]'>
                            <svg className='m-auto md:m-0' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 15.9862V19.3334C4 23.7331 4 25.933 5.36684 27.2999C6.73367 28.6667 8.93356 28.6667 13.3333 28.6667H18.6667C23.0664 28.6667 25.2663 28.6667 26.6332 27.2999C28 25.933 28 23.7331 28 19.3334V15.9862C28 13.7444 28 12.6237 27.5255 11.6534C27.0509 10.6832 26.1663 9.99508 24.3968 8.61885L21.7301 6.54477C18.9775 4.40384 17.6012 3.33337 16 3.33337C14.3988 3.33337 13.0225 4.40384 10.2699 6.54477L7.60321 8.61885C5.83377 9.99508 4.94905 10.6832 4.47453 11.6534C4 12.6237 4 13.7444 4 15.9862Z" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 28.6667V22C20 20.1144 20 19.1716 19.4143 18.5857C18.8284 18 17.8856 18 16 18C14.1144 18 13.1716 18 12.5858 18.5857C12 19.1716 12 20.1144 12 22V28.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className='text-[16px] text-[#4B4D4D] font-[700] mt-[12px]'>Hand-picked properties</h3>
                            <p className='text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Plan your trip or event with ease with one of our exclusive country house rentals. Browse over 100 hand-picked venues, from historic hotels.</p>
                        </div>

                        <div className='text-center md:text-left md:w-[47%]'>
                            <svg className='m-auto md:m-0' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 15.9862V19.3334C4 23.7331 4 25.933 5.36684 27.2999C6.73367 28.6667 8.93356 28.6667 13.3333 28.6667H18.6667C23.0664 28.6667 25.2663 28.6667 26.6332 27.2999C28 25.933 28 23.7331 28 19.3334V15.9862C28 13.7444 28 12.6237 27.5255 11.6534C27.0509 10.6832 26.1663 9.99508 24.3968 8.61885L21.7301 6.54477C18.9775 4.40384 17.6012 3.33337 16 3.33337C14.3988 3.33337 13.0225 4.40384 10.2699 6.54477L7.60321 8.61885C5.83377 9.99508 4.94905 10.6832 4.47453 11.6534C4 12.6237 4 13.7444 4 15.9862Z" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 28.6667V22C20 20.1144 20 19.1716 19.4143 18.5857C18.8284 18 17.8856 18 16 18C14.1144 18 13.1716 18 12.5858 18.5857C12 19.1716 12 20.1144 12 22V28.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className='text-[16px] text-[#4B4D4D] font-[700] mt-[12px]'>Hand-picked properties</h3>
                            <p className='text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Plan your trip or event with ease with one of our exclusive country house rentals. Browse over 100 hand-picked venues, from historic hotels.</p>
                        </div>

                        <div className='text-center md:text-left md:w-[47%]'>
                            <svg className='m-auto md:m-0' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 15.9862V19.3334C4 23.7331 4 25.933 5.36684 27.2999C6.73367 28.6667 8.93356 28.6667 13.3333 28.6667H18.6667C23.0664 28.6667 25.2663 28.6667 26.6332 27.2999C28 25.933 28 23.7331 28 19.3334V15.9862C28 13.7444 28 12.6237 27.5255 11.6534C27.0509 10.6832 26.1663 9.99508 24.3968 8.61885L21.7301 6.54477C18.9775 4.40384 17.6012 3.33337 16 3.33337C14.3988 3.33337 13.0225 4.40384 10.2699 6.54477L7.60321 8.61885C5.83377 9.99508 4.94905 10.6832 4.47453 11.6534C4 12.6237 4 13.7444 4 15.9862Z" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 28.6667V22C20 20.1144 20 19.1716 19.4143 18.5857C18.8284 18 17.8856 18 16 18C14.1144 18 13.1716 18 12.5858 18.5857C12 19.1716 12 20.1144 12 22V28.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className='text-[16px] text-[#4B4D4D] font-[700] mt-[12px]'>Hand-picked properties</h3>
                            <p className='text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Plan your trip or event with ease with one of our exclusive country house rentals. Browse over 100 hand-picked venues, from historic hotels.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUseUs