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
        arrows: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "80px", // shows half-slide left and right
        arrows: true,
    };

    return (
        <div className='px-[30px] hotelChain pb-[80px]'>
            <h5 className="text-[16px] text-[#4B4D4D] font-[400]">Hotel chains</h5>
            <h2 className="text-[55px] font-[700] text-[#4B4D4D] mb-10 tracking-normal">
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