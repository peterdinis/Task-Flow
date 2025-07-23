'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            className={cn(
                'fixed right-6 bottom-6 z-50 transition-opacity',
                visible ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            <Button
                onClick={scrollToTop}
                size='icon'
                variant='outline'
                className='rounded-full shadow-lg'
            >
                <ArrowUpIcon className='h-5 w-5' />
            </Button>
        </div>
    );
}
