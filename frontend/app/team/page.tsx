"use client";

import { AppLayout } from "@/app/_components/layout";
import { useUsers } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/app/_components/auth/ProtectedRoute";
import { Mail, Users } from "lucide-react";

export default function TeamPage() {
  const { data: users, isLoading } = useUsers();

  return (
    <ProtectedRoute>
      <AppLayout title="Team" subtitle="View and manage team members">
        <div className="space-y-6 animate-fade-in">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-14 w-14 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : users && users.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="bg-card border-border hover:border-primary/30 transition-all group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14 border-2 border-border group-hover:border-primary/30 transition-colors">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-lg bg-secondary">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{user.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <Badge variant="secondary" className="mt-3">
                          Team Member
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No team members</h3>
              <p className="text-muted-foreground max-w-sm">
                Team members will appear here once they are added to your
                workspace.
              </p>
            </div>
          )}
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
