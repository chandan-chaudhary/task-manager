import { useState } from "react";
import {
  Bell,
  LogOut,
  Settings as SettingsIcon,
  LayoutDashboard,
  CheckSquare,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useNotifications,
  useMarkAllNotificationsRead,
} from "@/hooks/useNotifications";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { data: notifications } = useNotifications();
  const markAllRead = useMarkAllNotificationsRead();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    { to: "/tasks", icon: <CheckSquare size={18} />, label: "Tasks" },
    { to: "/team", icon: <Users size={18} />, label: "Team" },
    { to: "/settings", icon: <SettingsIcon size={18} />, label: "Settings" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* User Info */}
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Navigation Items */}
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.to}
                  onClick={() => router.push(item.to)}
                  className={cn(
                    pathname === item.to && "bg-accent text-primary font-medium"
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-80 p-0 bg-popover border-border"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary hover:text-primary"
                    onClick={() => markAllRead.mutate()}
                  >
                    Mark all read
                  </Button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications && notifications.length > 0 ? (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 transition-colors hover:bg-accent cursor-pointer",
                          !notification.read && "bg-primary/5"
                        )}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {/* Desktop User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
