import React from 'react'

function UseCases() {
    return (
        <section className="px-[30px] py-[80px]">
            <h5 className="text-[16px] text-[#4B4D4D] font-[400]">Use cases</h5>
            <h2 className="text-[55px] font-[700] text-[#4B4D4D] mb-10 tracking-normal">
                More than you can imagine
            </h2>

            <div className='flex items-center justify-between'>
                <div className='w-[32%]'>
                    <img src="/img/imagine1.png" className='w-full' />
                    <h3 className='text-[20px] text-[#4B4D4D] font-[700] mt-[16px]'>Relax</h3>
                    <p className='text-[16px] text-[#6B6B6B] font-[400] mt-[8px]'>Lorem ipsum dolor sit amet consectetur. Vel ut diam nulla faucibus elementum pellentesque sed gravida aenean. Fringilla tempor neque fermentum ultrices. Commodo turpis penatibus commodo ac aliquet ullamcorper amet ac facilisis.</p>
                </div>

                <div className='w-[32%]'>
                    <img src="/img/imagine3.png" className='w-full' />
                    <h3 className='text-[20px] text-[#4B4D4D] font-[700] mt-[16px]'>Travel</h3>
                    <p className='text-[16px] text-[#6B6B6B] font-[400] mt-[8px]'>Lorem ipsum dolor sit amet consectetur. Vel ut diam nulla faucibus elementum pellentesque sed gravida aenean. Fringilla tempor neque fermentum ultrices. Commodo turpis penatibus commodo ac aliquet ullamcorper </p>
                </div>

                <div className='w-[32%]'>
                    <img src="/img/imagine2.png" className='w-full' />
                    <h3 className='text-[20px] text-[#4B4D4D] font-[700] mt-[16px]'>Business</h3>
                    <p className='text-[16px] text-[#6B6B6B] font-[400] mt-[8px]'>Lorem ipsum dolor sit amet consectetur. Vel ut diam nulla faucibus elementum pellentesque sed gravida aenean. Fringilla tempor neque fermentum ultrices. </p>
                </div>
            </div>

            <div className='bg-[#E4E4E4] h-[280px] rounded-[20px] mt-[80px] flex items-center justify-center flex-col'>
                <h5 className='text-[16px] text-[#4B4D4D] font-[400]'>Hire amazing manor hotels</h5>
                <h2 className='text-[55px] text-[#4B4D4D] font-[700] mt-[16px]'>
                    <span className='flex items-center gap-4'>
                        for <img src='/img/forBusiness.png' /> <span className='underline'>business</span>
                    </span>
                    <span className='flex items-center gap-4'>
                        and <img src='/img/forHolidays.png' /><span className='underline'>holidays</span>
                    </span>
                </h2>
            </div>
        </section>
    )
}

export default UseCases