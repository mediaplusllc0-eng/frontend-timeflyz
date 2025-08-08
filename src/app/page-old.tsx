"use client";
import { useEffect } from "react";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/page-components/home/Hero";
import Hotels from "@/components/page-components/home/Hotels";
import TestimonialSection from "@/components/page-components/home/TestimonialSection";
import TrustedBy from "@/components/page-components/home/TrustedBy";
import Whyus from "@/components/page-components/home/Whyus";
import { setProfile } from "./profile/services/userSlice";
import { useAppDispatch } from "@/utils/hooks";
import { useGetProfileQuery } from "./profile/services/userApi";
import FullPageLoader from "@/components/ui/FullPageLoader";
export default function Home() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetProfileQuery({});
  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <FullPageLoader />;
  return (
    <>
      <Hero />
      <Whyus />
      <Hotels />
      <TestimonialSection />
      <TrustedBy />
      <Footer />
    </>
  );
}
