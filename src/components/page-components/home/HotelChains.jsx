import React from 'react'
import Slider from 'react-slick';

function HotelChains() {

    const brands = [
        { name: "Intercontinental", src: "/img/atlants.png" },
        { name: "Holiday Inn", src: "/img/holidayinn.png" },
        { name: "Courtyard by Marriott", src: "/img/courtyard.png" },
        { name: "Best Western", src: "/img/bestwestern.png" },
        { name: "Campanile", src: "/img/campanile.png" },
        { name: "DoubleTree", src: "/img/doubletree.png" },
        { name: "Ibis", src: "/img/ibis.png" },
        { name: "Jurys Inn", src: "/img/jurysinn.png" },
        { name: "Kyriad", src: "/img/kyriad.png" },
        { name: "Marriott", src: "/img/marriott.png" },
        { name: "Mercure", src: "/img/mercure.png" },
        { name: "Gallery", src: "/img/gallery.png" },
        { name: "NH Hotel Group", src: "/img/nh.png" },
        { name: "Novotel", src: "/img/novotel.png" },
        { name: "Pullman", src: "/img/pullman.png" },
        { name: "The Hoxton", src: "/img/thehoxton.png" },
        { name: "Millennium", src: "/img/millennium.png" },
    ];

    var settings = {
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "80px",
        responsive: [
            {
                breakpoint: 1536, // 2xl
                settings: {
                    slidesToShow: 5,
                    centerPadding: "60px",
                },
            },
            {
                breakpoint: 1280, // xl
                settings: {
                    slidesToShow: 4,
                    centerPadding: "60px",
                },
            },
            {
                breakpoint: 1024, // lg
                settings: {
                    slidesToShow: 3,
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 768, // md
                settings: {
                    slidesToShow: 2,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 640, // sm
                settings: {
                    slidesToShow: 2,
                    centerPadding: "20px",
                },
            },
            {
                breakpoint: 480, // mobile
                settings: {
                    slidesToShow: 2,
                    centerPadding: "10px",
                },
            },
        ],
    };


    return (
        <div className='px-5 md:px-[30px] hotelChain pb-[80px] w-full overflow-x-hidden'>
            <h5 className="text-center md:text-left text-[16px] text-[#4B4D4D] font-[400] mb-[16px]">Hotel chains</h5>
            <h2 className="text-center md:text-left text-[28px] md:text-[55px] font-[700] text-[#4B4D4D] mb-10 tracking-normal">
                Always with the best
            </h2>

            <div className="sliderDiv w-full mx-auto mt-[50px] px-[30px]">
                <Slider autoplay={true} infinite={true} pauseOnHover={false} initialSlide={5} {...settings} arrows={false}>
                    {brands?.map((a, i) => (
                        <div key={i}>
                            <img className='h-[60px] w-auto mx-auto grayscale transition hover:grayscale-0' src={a.src} alt={a.name} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default HotelChains