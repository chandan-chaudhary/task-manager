import type {
  TaskFilters,
  TaskSort,
  Priority,
  TaskStatus,
} from "@/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFiltersBarProps {
  filters: TaskFilters;
  sort: TaskSort;
  onFiltersChange: (filters: TaskFilters) => void;
  onSortChange: (sort: TaskSort) => void;
}

const priorities: Array<Priority | "all"> = [
  "all",
  "Low",
  "Medium",
  "High",
  "Urgent",
];
const statuses: Array<TaskStatus | "all"> = [
  "all",
  "To Do",
  "In Progress",
  "Review",
  "Completed",
];
const sortFields: Array<{ value: TaskSort["field"]; label: string }> = [
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
  { value: "status", label: "Status" },
  { value: "createdAt", label: "Created" },
  { value: "title", label: "Title" },
];

export function TaskFiltersBar({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
}: TaskFiltersBarProps) {
  const hasActiveFilters =
    (filters.status && filters.status !== "all") ||
    (filters.priority && filters.priority !== "all") ||
    filters.assignedToMe ||
    filters.createdByMe ||
    filters.overdue;

  const clearFilters = () => {
    onFiltersChange({
      status: "all",
      priority: "all",
      assignedToMe: false,
      createdByMe: false,
      overdue: false,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <Select
        value={filters.status || "all"}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value as TaskStatus | "all" })
        }
      >
        <SelectTrigger className="w-[140px] bg-secondary/50">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status === "all" ? "All Status" : status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select
        value={filters.priority || "all"}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, priority: value as Priority | "all" })
        }
      >
        <SelectTrigger className="w-[140px] bg-secondary/50">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {priorities.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority === "all" ? "All Priority" : priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Quick Filters */}
      <div className="flex gap-2">
        <Button
          variant={filters.assignedToMe ? "default" : "outline"}
          size="sm"
          onClick={() =>
            onFiltersChange({ ...filters, assignedToMe: !filters.assignedToMe })
          }
          className={cn(!filters.assignedToMe && "bg-secondary/50")}
        >
          Assigned to me
        </Button>
        <Button
          variant={filters.createdByMe ? "default" : "outline"}
          size="sm"
          onClick={() =>
            onFiltersChange({ ...filters, createdByMe: !filters.createdByMe })
          }
          className={cn(!filters.createdByMe && "bg-secondary/50")}
        >
          Created by me
        </Button>
        <Button
          variant={filters.overdue ? "destructive" : "outline"}
          size="sm"
          onClick={() =>
            onFiltersChange({ ...filters, overdue: !filters.overdue })
          }
          className={cn(!filters.overdue && "bg-secondary/50")}
        >
          Overdue
        </Button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-4 w-4" />
          Clear filters
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sort */}
      <div className="flex items-center gap-2">
        <Select
          value={sort.field}
          onValueChange={(value) =>
            onSortChange({ ...sort, field: value as TaskSort["field"] })
          }
        >
          <SelectTrigger className="w-[130px] bg-secondary/50">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {sortFields.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onSortChange({
              ...sort,
              direction: sort.direction === "asc" ? "desc" : "asc",
            })
          }
          className="bg-secondary/50"
        >
          <ArrowUpDown
            className={cn(
              "h-4 w-4 transition-transform",
              sort.direction === "desc" && "rotate-180"
            )}
          />
        </Button>
      </div>
    </div>
  );
}
