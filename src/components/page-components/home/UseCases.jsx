import Link from 'next/link'
import React from 'react'

function UseCases() {
    return (
        <section className="px-5 md:px-[30px] md:py-[80px] py-[30px]">
            <h5 className="text-center md:text-left text-[16px] text-[#4B4D4D] font-[400]">Use cases</h5>
            <h2 className="text-center md:text-left text-[28px] md:text-[55px] font-[700] text-[#4B4D4D] mb-10 tracking-normal">
                More than you can imagine
            </h2>

            <div className='flex items-center justify-between flex-wrap md:flex-nowrap text-center md:text-left'>
                <div className='w-full md:w-[32%] mb-10 md:mb-0'>
                    <img alt='timeflyz' src="/img/imagine1.png" className='w-full' />
                    <h3 className='text-[20px] text-[#4B4D4D] font-[700] mt-[16px]'>Relax</h3>
                    <p className='text-[16px] text-[#6B6B6B] font-[400] mt-[8px]'>Lorem ipsum dolor sit amet consectetur. Vel ut diam nulla faucibus elementum pellentesque sed gravida aenean. Fringilla tempor neque fermentum ultrices. Commodo turpis penatibus commodo ac aliquet ullamcorper amet ac facilisis.</p>
                </div>

                <div className='w-full md:w-[32%] mb-10 md:mb-0'>
                    <img alt='timeflyz' src="/img/imagine3.png" className='w-full' />
                    <h3 className='text-[20px] text-[#4B4D4D] font-[700] mt-[16px]'>Travel</h3>
                    <p className='text-[16px] text-[#6B6B6B] font-[400] mt-[8px]'>Lorem ipsum dolor sit amet consectetur. Vel ut diam nulla faucibus elementum pellentesque sed gravida aenean. Fringilla tempor neque fermentum ultrices. Commodo turpis penatibus commodo ac aliquet ullamcorper </p>
                </div>

                <div className='w-full md:w-[32%] mb-10 md:mb-0'>
                    <img alt='timeflyz' src="/img/imagine2.png" className='w-full' />
                    <h3 className='text-[20px] text-[#4B4D4D] font-[700] mt-[16px]'>Business</h3>
                    <p className='text-[16px] text-[#6B6B6B] font-[400] mt-[8px]'>Lorem ipsum dolor sit amet consectetur. Vel ut diam nulla faucibus elementum pellentesque sed gravida aenean. Fringilla tempor neque fermentum ultrices. </p>
                </div>
            </div>

            <div className='bg-[#E4E4E4] h-[280px] rounded-[20px] mt-5 md:mt-[80px] flex items-center justify-center flex-col'>
                <h5 className='text-[16px] text-[#4B4D4D] font-[400]'>Hire amazing manor hotels</h5>
                <h2 className='text-[28px] md:text-[55px] text-[#4B4D4D] font-[700] mt-[16px]'>
                    <span className='flex items-center gap-4 mb-5 md:mb-0'>
                        for
                        <img alt='timeflyz' src='/img/forBusiness.png' />
                        <span className='underline'>
                            <Link href="#">
                                business
                            </Link>
                        </span>
                    </span>
                    <span className='flex items-center gap-4'>
                        and
                        <img alt='timeflyz' src='/img/forHolidays.png' />
                        <span className='underline'>
                            <Link href="#">
                                holidays
                            </Link>
                        </span>
                    </span>
                </h2>
            </div>
        </section>
    )
}

export default UseCases