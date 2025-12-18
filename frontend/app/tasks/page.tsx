"use client";

import { useState } from "react";
import { AppLayout } from "@/app/_components/layout";
import {
  TaskCard,
  TaskFormDialog,
  TaskFiltersBar,
} from "@/app/tasks/_components";
import { TaskListSkeleton } from "@/components/ui/skeletons";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/app/_components/auth/ProtectedRoute";
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
import { Plus, Inbox } from "lucide-react";
import type { Task, TaskFilters, TaskSort } from "@/types";

export default function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
  });
  const [sort, setSort] = useState<TaskSort>({
    field: "dueDate",
    direction: "asc",
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const { data: tasks, isLoading } = useTasks(filters, sort);
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
      <AppLayout title="Tasks" subtitle="Manage and track your team's work">
        <div className="space-y-6 animate-fade-in">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <TaskFiltersBar
              filters={filters}
              sort={sort}
              onFiltersChange={setFilters}
              onSortChange={setSort}
            />
            <Button onClick={() => setFormOpen(true)} className="ml-4">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Task List */}
          {isLoading ? (
            <TaskListSkeleton count={6} />
          ) : tasks && tasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={setDeleteTaskId}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                {filters.status !== "all" || filters.priority !== "all"
                  ? "Try adjusting your filters to see more tasks."
                  : "Get started by creating your first task."}
              </p>
              <Button onClick={() => setFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </div>
          )}

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
