import { Footer } from "@/app/_components/Footer";
import {
  LandingHeader,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection,
} from "@/app/_components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
