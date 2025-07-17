import FeaturesSection from "@/components/hero/FeaturesSection";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/hero/StatsSection";
import { NextPage } from "next";

const Homepage: NextPage = () => {
  return (
    <>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
    </>
  )
}

export default Homepage