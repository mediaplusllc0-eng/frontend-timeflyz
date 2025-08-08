import React from 'react'
import Slider from 'react-slick';

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            onClick={onClick}
        >
            {/* Your custom SVG */}
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.7071 8.69735C26.0976 8.30682 26.0976 7.67366 25.7071 7.28313L19.3431 0.91917C18.9526 0.528645 18.3195 0.528645 17.9289 0.91917C17.5384 1.30969 17.5384 1.94286 17.9289 2.33338L23.5858 7.99024L17.9289 13.6471C17.5384 14.0376 17.5384 14.6708 17.9289 15.0613C18.3195 15.4518 18.9526 15.4518 19.3431 15.0613L25.7071 8.69735ZM0 7.99023L-1.74846e-07 8.99023L25 8.99024L25 7.99024L25 6.99024L1.74846e-07 6.99023L0 7.99023Z" fill="#4B4D4D" />
            </svg>
        </div>
    );
};

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            onClick={onClick}
        >
            {/* Your custom SVG */}
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.538409 7.04738 0.538409 6.65685 0.928934L0.292892 7.2929ZM26 8L26 7L1 7L1 8L1 9L26 9L26 8Z" fill="#4B4D4D" />
            </svg>
        </div>
    );
};


function FooterNew() {

    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div className='px-[30px] footerNew'>
            <footer className='pt-[50px] px-[40px] pb-[27px] w-full bg-[#E4E4E4] rounded-t-[20px] rounded-b-none '>
                <div className="w-full mx-auto px-[30px]">
                    <Slider {...settings}>
                        {["Hotel for the stay", "Short Stay hotel", "Room by the hour", "Day rooms", "Early check in hotels", "9 to 5 hotels"].map((a, i) => (
                            <div key={i}>
                                <p className='text-[#4B4D4D] text-[16px] font-[400] text-center'>{a}</p>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className='w-full flex justify-between mt-[40px]'>
                    <div className='w-[30%]'>
                        <img src='/img/logo-black.png' className='w-[265px]' />
                        <p className='text-[#4B4D4D] text-[16px] font-[400]'>
                            Lorem ipsum dolor sit amet consectetur. Malesuada congue in vitae elementum suspendisse nec orci euismod enim. At dignissim id vel egestas in cursus.
                        </p>
                        <div className='flex gap-2 mt-[25px]'>
                            <img src="/img/appStore.png" />
                            <img src="/img/playStore.png" />
                        </div>
                    </div>
                    <div className='w-[59%] flex justify-between'>
                        <div className='w-[32%]'>
                            <h3 className='text-[#4B4D4D] text-[16px] font-[700] mb-[20px] '>Countries</h3>

                            <ul>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>UAE</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Singapore</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Australia</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Malaysia</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px] underline'>View more</li>
                            </ul>
                        </div>
                        <div className='w-[32%]'>
                            <h3 className='text-[#4B4D4D] text-[16px] font-[700] mb-[20px] '>About</h3>

                            <ul>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>The company</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Reviews</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Press</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Carriers</li>
                            </ul>
                        </div>
                        <div className='w-[32%]'>
                            <h3 className='text-[#4B4D4D] text-[16px] font-[700] mb-[20px] '>Help</h3>

                            <ul>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Contact</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>FAQs</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Help</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Privacy policy</li>
                                <li className='text-[#4B4D4D] text-[16px] font-[400] mt-[16px]'>Terms of service</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between mt-[60px] items-center'>
                    <p className='text-[#4B4D4D] text-[14px] font-[400]'>© 2025 Timeflyz • All Rights Reserved</p>

                    <div className='flex items-center gap-[18px]'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z" fill="#989898" />
                        </svg>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 9.5H4C3.05719 9.5 2.58579 9.5 2.29289 9.79289C2 10.0858 2 10.5572 2 11.5V20C2 20.9428 2 21.4142 2.29289 21.7071C2.58579 22 3.05719 22 4 22H4.5C5.44281 22 5.91421 22 6.20711 21.7071C6.5 21.4142 6.5 20.9428 6.5 20V11.5C6.5 10.5572 6.5 10.0858 6.20711 9.79289C5.91421 9.5 5.44281 9.5 4.5 9.5Z" fill="#989898" />
                            <path d="M6.5 4.25C6.5 5.49264 5.49264 6.5 4.25 6.5C3.00736 6.5 2 5.49264 2 4.25C2 3.00736 3.00736 2 4.25 2C5.49264 2 6.5 3.00736 6.5 4.25Z" fill="#989898" />
                            <path d="M12.326 9.5H11.5C10.5572 9.5 10.0858 9.5 9.79289 9.79289C9.5 10.0858 9.5 10.5572 9.5 11.5V20C9.5 20.9428 9.5 21.4142 9.79289 21.7071C10.0858 22 10.5572 22 11.5 22H12C12.9428 22 13.4142 22 13.7071 21.7071C14 21.4142 14 20.9428 14 20L14.0001 16.5001C14.0001 14.8433 14.5281 13.5001 16.0879 13.5001C16.8677 13.5001 17.5 14.1717 17.5 15.0001V19.5001C17.5 20.4429 17.5 20.9143 17.7929 21.2072C18.0857 21.5001 18.5572 21.5001 19.5 21.5001H19.9987C20.9413 21.5001 21.4126 21.5001 21.7055 21.2073C21.9984 20.9145 21.9985 20.4432 21.9987 19.5006L22.0001 14.0002C22.0001 11.515 19.6364 9.50024 17.2968 9.50024C15.9649 9.50024 14.7767 10.1531 14.0001 11.174C14 10.5439 14 10.2289 13.8632 9.995C13.7765 9.84686 13.6531 9.72353 13.505 9.63687C13.2711 9.5 12.9561 9.5 12.326 9.5Z" fill="#989898" />
                        </svg>

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" fill="#989898" />
                            <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" fill="#E4E4E4" />
                            <path d="M17.5078 6.5H17.4988" stroke="#E4E4E4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default FooterNew