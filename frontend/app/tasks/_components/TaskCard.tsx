"use client";

import Link from "next/link";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import {
  Calendar,
  User,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import type { Task } from "@/types";
import { PriorityBadge, StatusBadge } from "@/components/ui/badges";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

function formatDueDate(date: string): { text: string; className: string } {
  const dueDate = new Date(date);
  const isOverdue = isPast(dueDate) && !isToday(dueDate);

  if (isToday(dueDate)) {
    return { text: "Due today", className: "text-priority-high" };
  }
  if (isTomorrow(dueDate)) {
    return { text: "Due tomorrow", className: "text-priority-medium" };
  }
  if (isOverdue) {
    return {
      text: `Overdue: ${format(dueDate, "MMM d")}`,
      className: "text-destructive",
    };
  }
  return {
    text: format(dueDate, "MMM d, yyyy"),
    className: "text-muted-foreground",
  };
}


export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const dueInfo = formatDueDate(task.dueDate);
  const isCompleted = task.status === "Completed";

  return (
    <div
      className={cn(
        "group rounded-lg border border-border bg-card p-4 transition-all duration-200",
        "hover:border-primary/30 hover:shadow-md",
        isCompleted && "opacity-70"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <Link
          href={`/tasks/${task.id}`}
          className={cn(
            "font-medium text-card-foreground hover:text-primary transition-colors line-clamp-2",
            isCompleted && "line-through"
          )}
        >
          {task.title}
        </Link>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-popover border-border"
            >
              <DropdownMenuItem asChild>
                <Link
                  href={`/tasks/${task.id}`}
                  className="flex items-center gap-2"
                >
                  <Eye size={14} />
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit?.(task)}
                className="flex items-center gap-2"
              >
                <Pencil size={14} />
                Edit task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(task.id)}
                className="flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 size={14} />
                Delete task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {task.description}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs mb-3">
        <div className={cn("flex items-center gap-1.5", dueInfo.className)}>
          <Calendar size={14} />
          <span>{dueInfo.text}</span>
        </div>
        <StatusBadge status={task.status} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        {task.assignedTo ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={task.assignedTo.avatarUrl}
                alt={task.assignedTo.name}
              />
              <AvatarFallback className="text-xs bg-secondary">
                {task.assignedTo.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {task.assignedTo.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User size={14} />
            <span>Unassigned</span>
          </div>
        )}
        <span className="text-xs text-muted-foreground">
          {format(new Date(task.createdAt), "MMM d")}
        </span>
      </div>
    </div>
  );
}
