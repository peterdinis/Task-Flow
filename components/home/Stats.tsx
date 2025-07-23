import { FC } from "react";

const Stats: FC = () => {
    const stats = [
        { number: "50K+", label: "Active Users" },
        { number: "100K+", label: "Projects Created" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" }
    ];

    return (
        <section className="py-12 sm:py-16 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                            <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Stats;