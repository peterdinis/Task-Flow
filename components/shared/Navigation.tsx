import { FC } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const Navigation: FC = () => {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                            TaskFlow
                        </span>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                        <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</Link>
                        <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
                        <Link href="/dashboard">
                            <Button>Get Started</Button>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navigation;