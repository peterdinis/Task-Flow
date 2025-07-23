import HeroWrapper from "@/components/home/HeroWrapper";
import { NextPage } from "next";

const LandingPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-background">
        <HeroWrapper />
    </div>
  )
}

export default LandingPage;