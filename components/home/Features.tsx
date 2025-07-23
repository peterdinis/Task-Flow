import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BarChart3, Zap, Shield, Globe, ArrowRight, Star, Quote } from "lucide-react";

const Features: FC = () => {
    const features = [
        {
            icon: <Users className="h-6 w-6" />,
            title: "Team Collaboration",
            description: "Work together seamlessly with real-time updates and team management tools."
        },
        {
            icon: <Calendar className="h-6 w-6" />,
            title: "Smart Scheduling",
            description: "Intelligent calendar integration with deadline tracking and reminders."
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Progress Analytics",
            description: "Detailed insights and reports to track your team's productivity."
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Lightning Fast",
            description: "Optimized performance for quick task management and instant updates."
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Secure & Private",
            description: "Enterprise-grade security to keep your projects and data safe."
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Global Access",
            description: "Access your projects from anywhere with cloud synchronization."
        }
    ];

    return (
        <section id="features" className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Everything you need to manage projects
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed to help teams collaborate effectively and deliver results.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow hover-scale">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features;