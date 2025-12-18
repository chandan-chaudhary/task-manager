"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppLayout } from "@/app/_components/layout";
import { useAuth } from "@/context/AuthContext";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ProtectedRoute } from "@/app/_components/auth/ProtectedRoute";
import { Loader2, User, Bell, Shield, Palette } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      avatarUrl: user?.avatarUrl || "",
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    setIsSubmitting(true);
    await updateProfile(data);
    setIsSubmitting(false);
  };

  return (
    <ProtectedRoute>
      <AppLayout title="Settings" subtitle="Manage your account preferences">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          {/* Profile Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Avatar Preview */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-border">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback className="text-2xl bg-secondary">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input
                      id="avatarUrl"
                      placeholder="https://example.com/avatar.jpg"
                      {...register("avatarUrl")}
                      className={errors.avatarUrl ? "border-destructive" : ""}
                    />
                    {errors.avatarUrl && (
                      <p className="text-xs text-destructive">
                        {errors.avatarUrl.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use a generated avatar
                    </p>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Assignments</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when a task is assigned to you
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when tasks you are involved in are
                    updated
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Due Date Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded before tasks are due
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Appearance (placeholder) */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the interface
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security (placeholder) */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Change Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Update your password regularly for better security
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
