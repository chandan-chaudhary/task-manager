import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Join teams already using TaskFlow to streamline their workflow and
            achieve more together.
          </p>
          <div className="flex flex-col xs:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full xs:w-auto">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full xs:w-auto">
                Sign In to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
