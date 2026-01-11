import {
  CheckCircle2,
  Users,
  Bell,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";

export function FloatingCardsPreview() {
  return (
    <div className="relative hidden lg:block h-[600px]">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-3xl" />

      {/* Floating Cards Container */}
      <div className="relative h-full flex items-center justify-center">
        {/* Main Task Card - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-card border border-border rounded-xl shadow-2xl p-5 hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Launch Website</h4>
                <p className="text-xs text-muted-foreground">Due today</p>
              </div>
            </div>
            <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
              Done
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Users className="h-3 w-3 text-muted-foreground" />
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 border border-background flex items-center justify-center text-xs">
                  J
                </div>
                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-background flex items-center justify-center text-xs">
                  S
                </div>
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-background flex items-center justify-center text-xs">
                  M
                </div>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="h-full w-full bg-green-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Stats Card - Top Right */}
        <div className="absolute top-16 right-8 w-48 bg-card border border-border rounded-xl shadow-xl p-4 hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">Productivity</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-bold text-green-500">24</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">In Progress</span>
              <span className="font-bold text-primary">8</span>
            </div>
            <div className="flex gap-1 mt-2">
              {[80, 60, 90, 70, 100, 85, 95].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-sm"
                  style={{ height: `${height / 2}px` }}
                >
                  <div
                    className="w-full bg-primary rounded-sm"
                    style={{
                      height: `${height / 3}px`,
                      marginTop: "auto",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Card - Top Left */}
        <div className="absolute top-20 left-8 w-56 bg-card border border-border rounded-xl shadow-xl p-4 hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground mb-1">
                New comment
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Sarah mentioned you in &quot;Design System&quot;
              </p>
              <span className="text-xs text-primary mt-1 inline-block">
                2m ago
              </span>
            </div>
          </div>
        </div>

        {/* Team Card - Bottom Left */}
        <div className="absolute bottom-16 left-12 w-52 bg-card border border-border rounded-xl shadow-xl p-4 hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">Team Online</span>
          </div>
          <div className="space-y-2">
            {[
              { name: "John Doe", status: "online" },
              { name: "Sarah Kim", status: "online" },
              { name: "Mike Ross", status: "away" },
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-background ${
                      member.status === "online"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                </div>
                <span className="text-xs text-foreground">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Card - Bottom Right */}
        <div className="absolute bottom-20 right-12 w-44 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-xl p-4 hover:shadow-primary/30 transition-all duration-500 hover:-translate-y-1">
          <Zap className="h-5 w-5 text-primary mb-2" />
          <p className="text-xs font-semibold mb-1">Quick Actions</p>
          <p className="text-xs text-muted-foreground mb-3">
            Create task in 1 click
          </p>
          <div className="flex items-center gap-1 text-xs text-primary">
            <span>Try now</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
