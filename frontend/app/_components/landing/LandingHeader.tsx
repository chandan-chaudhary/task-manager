"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfileDropdown } from "../UserProfileDropdown";

export function LandingHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">TaskFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <UserProfileDropdown showDashboardLink />
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
