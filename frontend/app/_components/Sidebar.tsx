"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

function NavItem({ to, icon, label, isCollapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        "hover:bg-sidebar-accent group",
        isActive
          ? "bg-sidebar-accent text-sidebar-primary"
          : "text-sidebar-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 transition-colors",
          isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary"
        )}
      >
        {icon}
      </span>
      {!isCollapsed && <span className="font-medium text-sm">{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    { to: "/tasks", icon: <CheckSquare size={20} />, label: "Tasks" },
    { to: "/team", icon: <Users size={20} />, label: "Team" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border",
        "flex flex-col transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">
              Task Manager
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "mx-auto"
          )}
        >
          <ChevronLeft
            size={18}
            className={cn("transition-transform", isCollapsed && "rotate-180")}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-sidebar-border">
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            isCollapsed && "justify-center"
          )}
        >
          <Avatar className="h-9 w-9 border-2 border-sidebar-border">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "w-full mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            isCollapsed ? "px-2" : "justify-start"
          )}
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
