/**
 * Core type definitions for the Task Manager application.
 * These types mirror the backend models for type safety across the stack.
 */

/** Priority levels for tasks */
export type Priority = "Low" | "Medium" | "High" | "Urgent";

/** Status stages for task workflow */
export type TaskStatus = "To Do" | "In Progress" | "Review" | "Completed";

/** Task Status Enum for backend mapping */
export enum TaskStatusEnum {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  REVIEW = "Review",
  COMPLETED = "Completed",
}

/** Priority Enum for backend mapping */
export enum PriorityEnum {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent",
}

/** Get enum key from value */
export function getTaskStatusKey(value: TaskStatus): string {
  return (
    Object.keys(TaskStatusEnum).find(
      (key) => TaskStatusEnum[key as keyof typeof TaskStatusEnum] === value
    ) || "TODO"
  );
}

/** Get enum key from value */
export function getPriorityKey(value: Priority): string {
  return (
    Object.keys(PriorityEnum).find(
      (key) => PriorityEnum[key as keyof typeof PriorityEnum] === value
    ) || "MEDIUM"
  );
}

/**
 * User model representing authenticated users in the system.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Task model representing a work item in the system.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  creatorId: string;
  assignedToId: string | null;
  creator?: User;
  assignedTo?: User | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO for creating a new task.
 */
export interface CreateTaskDto {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  assignedToId?: string | null;
}

/**
 * DTO for updating an existing task.
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: Priority;
  status?: TaskStatus;
  assignedToId?: string | null;
}

/**
 * In-app notification model for real-time updates.
 */
export interface Notification {
  id: string;
  type: "task_assigned" | "task_updated" | "task_completed" | "mention";
  message: string;
  taskId?: string;
  read: boolean;
  createdAt: string;
}

/**
 * Authentication credentials for login.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data for new users.
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

/**
 * API response wrapper for consistent error handling.
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Filter options for task queries.
 */
export interface TaskFilters {
  status?: TaskStatus | "all";
  priority?: Priority | "all";
  assignedToMe?: boolean;
  createdByMe?: boolean;
  overdue?: boolean;
  search?: string;
}

/**
 * Sort options for task lists.
 */
export interface TaskSort {
  field: "dueDate" | "priority" | "status" | "createdAt" | "title";
  direction: "asc" | "desc";
}

/**
 * Dashboard statistics.
 */
export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  tasksAssignedToMe: number;
  tasksCreatedByMe: number;
  tasksByStatus: Record<TaskStatus, number>;
  tasksByPriority: Record<Priority, number>;
}

/**
 * Socket event types for real-time communication.
 */
export type SocketEvent =
  | "task:created"
  | "task:updated"
  | "task:deleted"
  | "task:assigned"
  | "notification:new"
  | "user:online"
  | "user:offline";
