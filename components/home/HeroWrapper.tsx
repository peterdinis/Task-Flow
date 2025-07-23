import { FC } from 'react';
import Navigation from '../shared/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Stats from './Stats';
import Features from './Features';
import TestimonialsSection from './TestimonialsSection';
import CTA from './CTA';
import Footer from '../shared/Footer';

const HeroWrapper: FC = () => {
    return (
        <>
            <Navigation />
            <section className='py-12 sm:py-20 lg:py-24'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto max-w-4xl text-center'>
                        <Badge className='mb-4 sm:mb-6'>
                            New: AI-Powered Task Suggestions
                        </Badge>
                        <h1 className='text-foreground animate-fade-in mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl lg:text-6xl'>
                            Project Management
                            <span className='from-primary to-secondary block bg-gradient-to-r bg-clip-text text-transparent sm:ml-3 sm:inline'>
                                Made Simple
                            </span>
                        </h1>
                        <p className='text-muted-foreground mx-auto mb-6 max-w-2xl text-lg leading-relaxed sm:mb-8 sm:text-xl'>
                            Streamline your workflow, collaborate with your
                            team, and deliver projects on time with
                            TaskFlow&rsquo;s intuitive project management
                            platform.
                        </p>
                        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                            <Link href='/dashboard'>
                                <Button size='lg' className='w-full sm:w-auto'>
                                    Start Free Trial
                                    <ArrowRight className='ml-2 h-4 w-4' />
                                </Button>
                            </Link>
                            <Button
                                variant='outline'
                                size='lg'
                                className='w-full sm:w-auto'
                            >
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
    );
};

export default HeroWrapper;
