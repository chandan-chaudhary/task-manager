"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { User, LoginCredentials, RegisterData } from "@/types";
import { authService } from "@/services/api";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Try to get current user - cookie will be sent automatically
      const response = await authService.getCurrentUser();
      if (response.data) {
        setUser(response.data);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await authService.login(credentials);
        console.log(response);

        if (response.error) {
          toast.error("Login failed", {
            description: response.error,
          });
          return false;
        }

        if (response.data) {
          setUser(response.data.user);
          setToken(response.data.token); // Store token for Socket.io
          toast.success("Welcome back!", {
            description: `Logged in as ${response.data.user.name}`,
          });
          return true;
        }

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);

      if (response.error) {
        toast.error("Registration failed", {
          description: response.error,
        });
        return false;
      }

      if (response.data) {
        setUser(response.data.user);
        setToken(response.data.token); // Store token for Socket.io
        toast.success("Account created!", {
          description: "Welcome to TaskFlow",
        });
        return true;
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setToken(null); // Clear token
    toast.success("Logged out", {
      description: "See you next time!",
    });
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      if (!user) return false;

      const response = await authService.updateProfile(user.id, data);

      if (response.error) {
        toast.error("Update failed", {
          description: response.error,
        });
        return false;
      }

      if (response.data) {
        setUser(response.data);
        toast.success("Profile updated", {
          description: "Your changes have been saved",
        });
        return true;
      }

      return false;
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
