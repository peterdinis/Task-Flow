import { FC } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import ProfileDropdown from '../auth/ProfileDropdown';

const Navigation: FC = () => {
    return (
        <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <div className='from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br'>
                            <CheckCircle className='h-4 w-4 text-white' />
                        </div>
                        <span className='from-secondary to-primary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent'>
                            TaskFlow
                        </span>
                    </div>
                    <nav className='hidden space-x-8 md:flex'>
                        <Link
                            href='#features'
                            className='text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Features
                        </Link>
                        <Link
                            href='#testimonials'
                            className='text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Testimonials
                        </Link>
                        <Link
                            href='#pricing'
                            className='text-muted-foreground hover:text-foreground transition-colors'
                        >
                            Pricing
                        </Link>
                    </nav>
                    <div className='flex items-center space-x-4'>
                        <Button
                            variant='ghost'
                            className='hidden sm:inline-flex'
                        >
                            <Link href='/sign-up'>Create account</Link>
                        </Button>
                        <Link href='/sign-in'>
                            <Button>Get Started</Button>
                        </Link>
                        <ModeToggle />
                        <ProfileDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
