"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppLayout } from "@/app/_components/layout";
import { useAuth } from "@/context/AuthContext";
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
import { Loader2, User, Shield } from "lucide-react";
import { useState } from "react";
import { authService } from "@/services/api";
import { toast } from "sonner";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const profileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (data: UpdateProfileFormData) => {
    setIsSubmittingProfile(true);
    await updateProfile(data);
    setIsSubmittingProfile(false);
  };

  const onPasswordSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmittingPassword(true);
    try {
      const response = await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.error) {
        toast.error("Failed to change password", {
          description: response.error,
        });
      } else {
        toast.success("Password changed successfully");
        passwordForm.reset();
      }
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsSubmittingPassword(false);
    }
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
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
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
                      {...profileForm.register("name")}
                      className={
                        profileForm.formState.errors.name
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {profileForm.formState.errors.name && (
                      <p className="text-xs text-destructive">
                        {profileForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" disabled={isSubmittingProfile}>
                  {isSubmittingProfile && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Change Password</CardTitle>
              </div>
              <CardDescription>
                Update your password regularly for better security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...passwordForm.register("currentPassword")}
                    className={
                      passwordForm.formState.errors.currentPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-xs text-destructive">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...passwordForm.register("newPassword")}
                    className={
                      passwordForm.formState.errors.newPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-xs text-destructive">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    At least 6 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                    className={
                      passwordForm.formState.errors.confirmPassword
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmittingPassword}>
                  {isSubmittingPassword && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
