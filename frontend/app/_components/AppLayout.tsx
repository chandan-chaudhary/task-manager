"use client";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="md:pl-64 transition-all duration-300">
        <Header title={title} subtitle={subtitle} />
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
