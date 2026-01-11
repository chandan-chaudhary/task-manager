import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { FloatingCardsPreview } from "./FloatingCardsPreview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Manage Tasks,{" "}
                <span className="text-primary">Boost Productivity</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
                TaskFlow helps teams collaborate seamlessly with real-time
                updates, smart notifications, and powerful task management
                features.
              </p>
            </div>
            <div className="flex flex-col xs:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full xs:w-auto">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full xs:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Free to use
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Real-time collaboration
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Unlimited tasks
                </span>
              </div>
            </div>
          </div>
          <FloatingCardsPreview />
        </div>
      </div>
    </section>
  );
}
