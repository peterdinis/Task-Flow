import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection: FC = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Product Manager',
            company: 'TechCorp',
            content:
                'TaskFlow has revolutionized how our team manages projects. The intuitive interface and powerful features have increased our productivity by 40%.',
            rating: 5,
        },
        {
            name: 'Michael Chen',
            role: 'CEO',
            company: 'StartupXYZ',
            content:
                "The best project management tool we've used. The team collaboration features are outstanding and the analytics help us make better decisions.",
            rating: 5,
        },
        {
            name: 'Emily Rodriguez',
            role: 'Team Lead',
            company: 'Design Studio',
            content:
                'Simple yet powerful. TaskFlow strikes the perfect balance between functionality and ease of use. Highly recommended!',
            rating: 5,
        },
    ];

    return (
        <section
            id='testimonials'
            className='bg-muted/50 py-16 sm:py-20 lg:py-24'
        >
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-12 text-center sm:mb-16'>
                    <h2 className='text-foreground mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl'>
                        Loved by teams worldwide
                    </h2>
                    <p className='text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl'>
                        See what our customers have to say about TaskFlow
                    </p>
                </div>
                <div className='grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className='transition-shadow hover:shadow-lg'
                        >
                            <CardContent className='p-6'>
                                <div className='mb-4 flex'>
                                    {[...Array(testimonial.rating)].map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                className='h-4 w-4 fill-yellow-400 text-yellow-400'
                                            />
                                        )
                                    )}
                                </div>
                                <Quote className='text-muted-foreground mb-4 h-6 w-6' />
                                <p className='text-muted-foreground mb-4 leading-relaxed'>
                                    &ldquo;{testimonial.content}&rdquo;
                                </p>
                                <div>
                                    <div className='text-foreground font-semibold'>
                                        {testimonial.name}
                                    </div>
                                    <div className='text-muted-foreground text-sm'>
                                        {testimonial.role} at{' '}
                                        {testimonial.company}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
