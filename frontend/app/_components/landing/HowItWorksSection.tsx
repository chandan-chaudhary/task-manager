import { Users, Workflow, BarChart3, LucideIcon } from "lucide-react";

interface Step {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: "01",
    icon: Users,
    title: "Create Your Account",
    description:
      "Sign up and invite your team members to collaborate on projects together.",
  },
  {
    step: "02",
    icon: Workflow,
    title: "Organize Your Tasks",
    description:
      "Create tasks, set priorities, assign to team members, and set deadlines.",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Track & Complete",
    description:
      "Monitor progress in real-time, receive updates, and celebrate achievements.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            How TaskFlow Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and transform your workflow in three simple
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="space-y-4">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-8 h-8 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -z-10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border-r-2 border-t-2 border-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
