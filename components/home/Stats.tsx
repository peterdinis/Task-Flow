import { FC } from 'react';

const Stats: FC = () => {
    const stats = [
        { number: '50K+', label: 'Active Users' },
        { number: '100K+', label: 'Projects Created' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' },
    ];

    return (
        <section className='bg-muted/50 py-12 sm:py-16'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4'>
                    {stats.map((stat, index) => (
                        <div key={index} className='text-center'>
                            <div className='text-foreground mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl'>
                                {stat.number}
                            </div>
                            <div className='text-muted-foreground text-sm sm:text-base'>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
