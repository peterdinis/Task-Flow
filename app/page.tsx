import HeroWrapper from '@/components/home/HeroWrapper';
import { NextPage } from 'next';

const LandingPage: NextPage = () => {
    return (
        <div className='bg-background min-h-screen'>
            <HeroWrapper />
        </div>
    );
};

export default LandingPage;
