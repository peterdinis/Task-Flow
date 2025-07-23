import { FC } from "react";
import { CheckCircle } from "lucide-react";

const Footer: FC = () => {
    return (
        <footer className="border-t bg-muted/50 py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TaskFlow
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Making project management simple and effective for teams of all sizes.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2025 TaskFlow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;