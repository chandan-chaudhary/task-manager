"use client";

import { useState } from "react";
import { AppLayout } from "@/app/_components/layout";
import { useDashboardStats } from "@/hooks/useDashboard";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";
import { DashboardSkeleton, TaskListSkeleton } from "@/components/ui/skeletons";
import { TaskCard, TaskFormDialog } from "@/app/tasks/_components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { ProtectedRoute } from "@/app/_components/auth/ProtectedRoute";
import type { Task } from "@/types";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
  {
    title: "Total Tasks",
    key: "totalTasks" as const,
    icon: ListTodo,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Completed",
    key: "completedTasks" as const,
    icon: CheckCircle2,
    color: "text-status-completed",
    bgColor: "bg-status-completed/10",
  },
  {
    title: "Overdue",
    key: "overdueTasks" as const,
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Assigned to Me",
    key: "tasksAssignedToMe" as const,
    icon: Clock,
    color: "text-status-inprogress",
    bgColor: "bg-status-inprogress/10",
  },
];

export default function DashboardPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: myTasks, isLoading: tasksLoading } = useTasks({
    assignedToMe: true,
  });
  const { data: createdTasks } = useTasks({ createdByMe: true });
  const { data: overdueTasks } = useTasks({ overdue: true });
  const deleteTask = useDeleteTask();

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (deleteTaskId) {
      await deleteTask.mutateAsync(deleteTaskId);
      setDeleteTaskId(null);
    }
  };

  const handleCloseForm = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingTask(null);
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout
        title="Dashboard"
        subtitle="Overview of your tasks and activity"
      >
        <div className="space-y-8 animate-fade-in">
          {/* Stats Grid */}
          {statsLoading ? (
            <DashboardSkeleton />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                const value = stats?.[stat.key] ?? 0;

                return (
                  <Card
                    key={stat.key}
                    className="bg-card border-border hover:border-primary/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold mt-1">{value}</p>
                        </div>
                        <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                          <Icon className={cn("h-6 w-6", stat.color)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Status Distribution */}
          {stats && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Task Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(stats.tasksByStatus).map(
                    ([status, count]) => {
                      const total = stats.totalTasks || 1;
                      const percentage = Math.round((count / total) * 100);
                      const statusColors: Record<string, string> = {
                        "To Do": "bg-status-todo",
                        "In Progress": "bg-status-inprogress",
                        Review: "bg-status-review",
                        Completed: "bg-status-completed",
                      };

                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {status}
                            </span>
                            <span className="font-medium">{count}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                statusColors[status]
                              )}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Two Column Layout */}
          <div className="grid  gap-6">
            {/* My Tasks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Tasks</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tasks?filter=assigned" className="text-primary">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {tasksLoading ? (
                <TaskListSkeleton count={3} />
              ) : myTasks && myTasks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {myTasks.slice(0, 3).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={setDeleteTaskId}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">
                      No tasks assigned to you
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tasks Created by Me */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tasks Created by Me
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tasks?filter=created" className="text-primary">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {tasksLoading ? (
                <TaskListSkeleton count={3} />
              ) : createdTasks && createdTasks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {createdTasks.slice(0, 3).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={setDeleteTaskId}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <ListTodo className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">
                      You haven&apos;t created any tasks yet
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Overdue Tasks Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Overdue Tasks
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tasks?filter=overdue" className="text-primary">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {tasksLoading ? (
                <TaskListSkeleton count={3} />
              ) : overdueTasks && overdueTasks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {overdueTasks.slice(0, 6).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={setDeleteTaskId}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-status-completed/50 mb-3" />
                    <p className="text-muted-foreground">No overdue tasks!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Task Form Dialog */}
          <TaskFormDialog
            open={formOpen}
            onOpenChange={handleCloseForm}
            task={editingTask}
          />

          {/* Delete Confirmation */}
          <AlertDialog
            open={!!deleteTaskId}
            onOpenChange={() => setDeleteTaskId(null)}
          >
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this task? This action cannot
                  be undone.
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
