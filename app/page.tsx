import CTASection from "@/components/hero/CTASection";
import FeaturesSection from "@/components/hero/FeaturesSection";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/hero/StatsSection";
import TestimonialSection from "@/components/hero/TestimonialSection";
import Footer from "@/components/shared/Footer";
import { NextPage } from "next";

const Homepage: NextPage = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </>
  )
}

export default Homepage