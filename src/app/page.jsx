'use client'

import React from 'react'
import Navbar from "@/components/layout/Header-new";
import Hero from "@/components/page-components/home/Hero-new";
import Hotels from "@/components/page-components/home/Hotels";
import WhyUseUs from '@/components/page-components/home/WhyUseUs';
import UseCases from '@/components/page-components/home/UseCases';
import Reviews from '@/components/page-components/home/Reviews';
import CTA from '@/components/page-components/home/CTA';
import HotelChains from '../components/page-components/home/HotelChains';
import FooterNew from '../components/layout/FooterNew';

function page() {
    return (
        <div className='homeMain'>
            <Navbar menuColor="light" isFixed={false} />
            <Hero />
            <Hotels />
            <WhyUseUs />
            <UseCases />
            <Reviews />
            <CTA />
            <HotelChains />
            <FooterNew />
        </div>
    )
}

export default page