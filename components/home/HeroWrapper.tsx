import { FC } from "react";
import Navigation from "../shared/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Stats from "./Stats";
import Features from "./Features";
import TestimonialsSection from "./TestimonialsSection";
import CTA from "./CTA";
import Footer from "../shared/Footer";

const HeroWrapper: FC = () => {
    return (
        <>
            <Navigation />
            <section className="py-12 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge className="mb-4 sm:mb-6">New: AI-Powered Task Suggestions</Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in">
                            Project Management
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block sm:inline sm:ml-3">
                                Made Simple
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                            Streamline your workflow, collaborate with your team, and deliver projects on time with TaskFlow's intuitive project management platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/dashboard">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <Stats />
            <Features />
            <TestimonialsSection />
            <CTA />
            <Footer />
        </>
    )
}

export default HeroWrapper;