"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

function SocketWrapper({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return <SocketProvider token={token || undefined}>{children}</SocketProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketWrapper>
            <TooltipProvider>
              {children}
              <Sonner />
            </TooltipProvider>
          </SocketWrapper>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
