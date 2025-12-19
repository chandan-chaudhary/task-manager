import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Priority, Task, TaskStatus } from "@/types";
import {
  createTaskSchema,
  updateTaskSchema,
  type CreateTaskFormData,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUsers } from "@/hooks/useUsers";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

const priorities = ["Low", "Medium", "High", "Urgent"] as const;
const statuses = ["To Do", "In Progress", "Review", "Completed"] as const;

// Helper to format date for datetime-local input
function formatDateTimeLocal(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
}: TaskFormDialogProps) {
  const isEditing = !!task;
  const { data: users } = useUsers();
  const { user: currentUser } = useAuth();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  // Check if current user is only assignee (not creator)
  const isOnlyAssignee =
    task &&
    currentUser &&
    task.assignedToId === currentUser.id &&
    task.creatorId !== currentUser.id;

  // If only assignee, can only update status
  const canOnlyUpdateStatus = isEditing && isOnlyAssignee;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(isEditing ? updateTaskSchema : createTaskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          dueDate: formatDateTimeLocal(task.dueDate),
          priority: task.priority,
          status: task.status,
          assignedToId: task.assignedToId || undefined,
        }
      : {
          title: "",
          description: "",
          dueDate: formatDateTimeLocal(new Date()),
          priority: "Medium",
          status: "To Do",
          assignedToId: undefined,
        },
  });

  const watchPriority = watch("priority");
  const watchStatus = watch("status");
  const watchAssignee = watch("assignedToId");

  // Reset form when dialog opens or task changes
  useEffect(() => {
    if (open) {
      if (task) {
        console.log(task);

        // Editing existing task
        reset({
          title: task.title,
          description: task.description,
          dueDate: formatDateTimeLocal(task.dueDate),
          priority: task.priority,
          status: task.status,
          assignedToId: task.assignedToId || undefined,
        });
      } else {
        // Creating new task
        reset({
          title: "",
          description: "",
          dueDate: formatDateTimeLocal(new Date()),
          priority: "Medium",
          status: "To Do",
          assignedToId: undefined,
        });
      }
    }
  }, [open, task, reset]);

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      // Convert Date to ISO string format for backend
      const dueDateISO =
        typeof data.dueDate === "string"
          ? new Date(data.dueDate).toISOString()
          : data.dueDate.toISOString();

      if (isEditing && task) {
        // If user is only assignee (not creator), only send status update
        const updateData = canOnlyUpdateStatus
          ? {
              status: data.status,
            }
          : {
              title: data.title,
              description: data.description,
              dueDate: dueDateISO,
              priority: data.priority,
              status: data.status,
              assignedToId: data.assignedToId ?? null,
            };

        await updateTask.mutateAsync({
          id: task.id,
          data: updateData,
        });
      } else {
        await createTask.mutateAsync({
          title: data.title,
          description: data.description,
          dueDate: dueDateISO,
          priority: data.priority,
          status: data.status,
          assignedToId: data.assignedToId ?? null,
        });
      }
      reset();
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogDescription>
            {canOnlyUpdateStatus
              ? "You can only update the status of this task."
              : isEditing
              ? "Update the task details below."
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          {!canOnlyUpdateStatus && (
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                {...register("title")}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {!canOnlyUpdateStatus && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the task..."
                rows={3}
                {...register("description")}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          )}

          {/* Due Date */}
          {!canOnlyUpdateStatus && (
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="datetime-local"
                {...register("dueDate")}
                className={errors.dueDate ? "border-destructive" : ""}
              />
              {errors.dueDate && (
                <p className="text-xs text-destructive">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          )}

          {/* Priority & Status */}
          <div
            className={`grid ${
              canOnlyUpdateStatus ? "grid-cols-1" : "grid-cols-2"
            } gap-4`}
          >
            {!canOnlyUpdateStatus && (
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={watchPriority}
                  onValueChange={(value: Priority) =>
                    setValue("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={watchStatus}
                onValueChange={(value: TaskStatus) => setValue("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
          </div>

          {/* Assignee */}
          {!canOnlyUpdateStatus && (
            <div className="space-y-2">
              <Label>Assign To</Label>
              <Select
                value={watchAssignee || "unassigned"}
                onValueChange={(value: string) =>
                  setValue(
                    "assignedToId",
                    value === "unassigned" ? undefined : value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {canOnlyUpdateStatus
                ? "Update Status"
                : isEditing
                ? "Update Task"
                : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
