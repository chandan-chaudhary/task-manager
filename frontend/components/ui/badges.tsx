import { Badge } from "./badge";
import type { Priority, TaskStatus } from "@/types";

interface PriorityBadgeProps {
  priority: Priority;
}

interface StatusBadgeProps {
  status: TaskStatus;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  Urgent: {
    label: "Urgent",
    className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  },
  High: {
    label: "High",
    className: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  },
  Medium: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  },
  Low: {
    label: "Low",
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
};

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  "To Do": {
    label: "To Do",
    className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
  },
  "In Progress": {
    label: "In Progress",
    className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  },
  Review: {
    label: "Review",
    className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  },
  Completed: {
    label: "Completed",
    className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  if (!config) {
    return <Badge variant="outline">Unknown</Badge>;
  }
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) {
    return <Badge variant="outline">Unknown</Badge>;
  }
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
