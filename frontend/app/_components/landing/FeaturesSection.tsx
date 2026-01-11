import {
  Bell,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Users,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with instant updates and notifications across your team.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Stay informed with intelligent alerts for task updates, mentions, and deadlines.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track progress and productivity with comprehensive stats and insights.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Collaborate effectively with team members, assign tasks, and track assignments.",
  },
  {
    icon: Clock,
    title: "Deadline Tracking",
    description:
      "Never miss a deadline with smart reminders and priority-based task sorting.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is encrypted and secure with enterprise-grade protection.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you and your team work smarter,
            not harder.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
