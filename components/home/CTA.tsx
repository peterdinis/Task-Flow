import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTA: FC = () => {
    return (
        <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Join thousands of teams already using TaskFlow to deliver better projects faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
}

export default CTA