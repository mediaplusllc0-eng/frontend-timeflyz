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
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.3334 2.66663V7.99996M10.6667 2.66663V7.99996" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.3333 5.33337H14.6667C9.63835 5.33337 7.1242 5.33337 5.56209 6.89547C4 8.45757 4 10.9717 4 16V18.6667C4 23.695 4 26.2092 5.56209 27.7712C7.1242 29.3334 9.63835 29.3334 14.6667 29.3334H17.3333C22.3616 29.3334 24.8759 29.3334 26.4379 27.7712C28 26.2092 28 23.695 28 18.6667V16C28 10.9717 28 8.45757 26.4379 6.89547C24.8759 5.33337 22.3616 5.33337 17.3333 5.33337Z" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 13.3334H28" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 22C12 22 14 22.6667 14.6667 24.6667C14.6667 24.6667 17.5687 19.3333 21.3333 18" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h3 className='text-[16px] text-[#4B4D4D] font-[700] mt-[12px]'>Hand-picked properties</h3>
                            <p className='text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Plan your trip or event with ease with one of our exclusive country house rentals. Browse over 100 hand-picked venues, from historic hotels.</p>
                        </div>

                        <div className='text-center md:text-left md:w-[47%]'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66663 2.66675H21.3333C23.8474 2.66675 25.1045 2.66675 25.8856 3.4478C26.6666 4.22884 26.6666 5.48592 26.6666 8.00008V16.0001C26.6666 18.5142 26.6666 19.7713 25.8856 20.5523C25.1045 21.3334 23.8474 21.3334 21.3333 21.3334H12" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.3334 8.66675H21.3334" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.66663 22.6667V17.3334C2.66663 16.0763 2.66663 15.4478 3.05715 15.0573C3.44768 14.6667 4.07621 14.6667 5.33329 14.6667H7.99996M2.66663 22.6667H7.99996M2.66663 22.6667V29.3334M7.99996 14.6667V22.6667M7.99996 14.6667H12H16M7.99996 22.6667V29.3334" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.99996 8.66667C7.99996 10.1394 6.80605 11.3333 5.33329 11.3333C3.86053 11.3333 2.66663 10.1394 2.66663 8.66667C2.66663 7.19391 3.86053 6 5.33329 6C6.80605 6 7.99996 7.19391 7.99996 8.66667Z" stroke="#EF4A23" strokeWidth="1.5" />
                            </svg>
                            <h3 className='text-[16px] text-[#4B4D4D] font-[700] mt-[12px]'>Hand-picked properties</h3>
                            <p className='text-[16px] text-[#4B4D4D] font-[400] mt-[16px]'>Plan your trip or event with ease with one of our exclusive country house rentals. Browse over 100 hand-picked venues, from historic hotels.</p>
                        </div>

                        <div className='text-center md:text-left md:w-[47%]'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.6897 18.6667C5.62246 18.6667 7.99994 21.0442 7.99994 23.977" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.99994 5.35645C7.99994 8.28921 5.62246 10.6667 2.6897 10.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24 5.35645C24 8.26354 26.3587 10.625 29.2564 10.6661" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M29.3334 14.6666V13.3333C29.3334 9.56201 29.3334 7.6764 28.1618 6.50483C26.9902 5.33325 25.1046 5.33325 21.3334 5.33325H10.6667C6.89551 5.33325 5.00989 5.33325 3.83832 6.50483C2.66675 7.6764 2.66675 9.56201 2.66675 13.3333V15.9999C2.66675 19.7711 2.66675 21.6567 3.83832 22.8283C5.00989 23.9999 6.89551 23.9999 10.6667 23.9999H14.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 14.6667C20 16.8759 18.2092 18.6667 16 18.6667C13.7908 18.6667 12 16.8759 12 14.6667C12 12.4576 13.7908 10.6667 16 10.6667C18.2092 10.6667 20 12.4576 20 14.6667Z" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.6667 24.0001C18.6667 24.0001 20.0001 24.0001 21.3334 26.6667C21.3334 26.6667 25.5687 20.0001 29.3334 18.6667" stroke="#EF4A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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