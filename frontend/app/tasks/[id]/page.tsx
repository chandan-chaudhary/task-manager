"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format, isPast, isToday } from "date-fns";
import { AppLayout } from "@/app/_components/layout";
import { useTask, useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { TaskFormDialog } from "@/app/tasks/_components";
import { PriorityBadge, StatusBadge } from "@/components/ui/badges";
import { Skeleton } from "@/components/ui/skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProtectedRoute } from "@/app/_components/auth/ProtectedRoute";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TaskStatus } from "@/types";

const statuses: TaskStatus[] = ["To Do", "In Progress", "Review", "Completed"];

export default function TaskDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: task, isLoading } = useTask(id || "");
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AppLayout title="Task Details">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-48 w-full" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  if (!task) {
    return (
      <ProtectedRoute>
        <AppLayout title="Task Not Found">
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-xl font-semibold mb-2">Task not found</h2>
            <p className="text-muted-foreground mb-4">
              The task you are looking for doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/tasks">Back to Tasks</Link>
            </Button>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  const dueDate = new Date(task.dueDate);
  const isOverdue =
    isPast(dueDate) && !isToday(dueDate) && task.status !== "Completed";
  const isDueToday = isToday(dueDate);

  const handleStatusChange = async (status: TaskStatus) => {
    await updateTask.mutateAsync({ id: task.id, data: { status } });
  };

  const handleDelete = async () => {
    await deleteTask.mutateAsync(task.id);
    router.push("/tasks");
  };

  return (
    <ProtectedRoute>
      <AppLayout title="Task Details">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/tasks" className="text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tasks
            </Link>
          </Button>

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
                {isOverdue && (
                  <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                    Overdue
                  </span>
                )}
              </div>
              <h1
                className={cn(
                  "text-2xl font-bold",
                  task.status === "Completed" &&
                    "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditOpen(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteOpen(true)}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          {/* Description Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {task.description}
              </p>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Status & Due Date */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                {/* Quick Status Change */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Status
                  </label>
                  <Select
                    value={task.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isOverdue
                        ? "bg-destructive/10"
                        : isDueToday
                        ? "bg-priority-high/10"
                        : "bg-muted"
                    )}
                  >
                    <Calendar
                      className={cn(
                        "h-5 w-5",
                        isOverdue
                          ? "text-destructive"
                          : isDueToday
                          ? "text-priority-high"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p
                      className={cn(
                        "font-medium",
                        isOverdue && "text-destructive"
                      )}
                    >
                      {format(dueDate, "PPP p")}
                    </p>
                  </div>
                </div>

                {/* Created */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {format(new Date(task.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* People */}
            <Card className="bg-card border-border">
              <CardContent className="p-6 space-y-4">
                {/* Creator */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={task.creator?.avatarUrl} />
                    <AvatarFallback className="bg-secondary">
                      {task.creator?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-medium">{task.creator?.name}</p>
                  </div>
                </div>

                {/* Assignee */}
                <div className="flex items-center gap-3">
                  {task.assignedTo ? (
                    <>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={task.assignedTo.avatarUrl} />
                        <AvatarFallback className="bg-secondary">
                          {task.assignedTo.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Assigned to
                        </p>
                        <p className="font-medium">{task.assignedTo.name}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Assigned to
                        </p>
                        <p className="font-medium text-muted-foreground">
                          Unassigned
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Complete Button */}
                {task.status !== "Completed" && (
                  <Button
                    className="w-full mt-4"
                    onClick={() => handleStatusChange("Completed")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Edit Dialog */}
          <TaskFormDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            task={task}
          />

          {/* Delete Dialog */}
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{task.title}&quot;? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
