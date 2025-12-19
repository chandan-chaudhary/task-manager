/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  Task,
  User,
  Notification,
  CreateTaskDto,
  UpdateTaskDto,
  LoginCredentials,
  RegisterData,
  ApiResponse,
  TaskFilters,
  TaskSort,
  DashboardStats,
} from "@/types";
import {
  TaskStatusEnum,
  PriorityEnum,
  getTaskStatusKey,
  getPriorityKey,
} from "@/types";

/**
 * API service layer for backend communication.
 * Currently uses mock data - replace implementations with actual API calls.
 *
 * @example
 * // When connecting to backend, replace:
 * // return mockTasks;
 * // with:
 * // const response = await fetch(`${API_BASE_URL}/tasks`);
 * // return response.json();
 */

// Configure your backend URL here when connecting
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

/** Create headers for API requests */
const createHeaders = (): HeadersInit => {
  return {
    "Content-Type": "application/json",
  };
};

// ============================================
// AUTH SERVICE
// ============================================

export const authService = {
  /**
   * Authenticate user with email and password.
   * Backend: POST /api/auth/login
   */
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies in request
        body: JSON.stringify(credentials),
      });
      console.log(response);

      const result = await response.json();

      if (!response.ok) {
        return { error: result.message || "Login failed" };
      }

      const backendUser = result.data.user;
      return {
        data: {
          user: {
            ...backendUser,
            id: String(backendUser.id),
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
          },
          token: result.data.token, // Get token from response
        },
      };
    } catch (_error) {
      return { error: "Network error. Please try again." };
    }
  },

  /**
   * Register a new user account.
   * Backend: POST /api/auth/register
   */
  async register(
    data: RegisterData
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies in request
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: result.message || "Registration failed" };
      }

      const backendUser = result.data.user;
      return {
        data: {
          user: {
            ...backendUser,
            id: String(backendUser.id),
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
          },
          token: result.data.token, // Get token from response
        },
      };
    } catch (_error) {
      return { error: "Network error. Please try again." };
    }
  },

  /**
   * Get current authenticated user.
   * Backend: GET /api/auth/me
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: createHeaders(),
        credentials: "include", // Include cookies in request
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to fetch user data" };
      }

      const result = await response.json();
      const backendUser = result.data.user;
      const user: User = {
        ...backendUser,
        id: String(backendUser.id),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
      };
      return { data: user };
    } catch (_error) {
      return { error: "Failed to fetch user data" };
    }
  },

  /**
   * Logout current user.
   * Backend: POST /api/auth/logout
   */
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: createHeaders(),
        credentials: "include", // Include cookies in request
      });

      if (!response.ok) {
        return { error: "Logout failed" };
      }

      return { message: "Logged out successfully" };
    } catch (_error) {
      return { error: "Logout failed" };
    }
  },

  /**
   * Update user profile.
   * Backend: PATCH /api/users/:id
   */
  async updateProfile(
    userId: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: createHeaders(),
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to update profile" };
      }

      const result = await response.json();
      const backendUser = result.data.user;
      const user: User = {
        ...backendUser,
        id: String(backendUser.id),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
      };
      return { data: user };
    } catch (_error) {
      return { error: "Failed to update profile" };
    }
  },

  /**
   * Change user password.
   * Backend: PUT /api/auth/change-password
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: createHeaders(),
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to change password" };
      }

      return { message: "Password changed successfully" };
    } catch (_error) {
      return { error: "Failed to change password" };
    }
  },
};

// ============================================
// TASK SERVICE
// ============================================

export const taskService = {
  /**
   * Get all tasks with optional filters and sorting.
   * Backend: GET /api/tasks
   */
  async getTasks(
    filters?: TaskFilters,
    sort?: TaskSort
  ): Promise<ApiResponse<Task[]>> {
    try {
      const params = new URLSearchParams();

      // Add filters as query params (convert to backend format using enum keys)
      if (filters) {
        if (filters.status && filters.status !== "all") {
          params.append("status", getTaskStatusKey(filters.status));
        }
        if (filters.priority && filters.priority !== "all") {
          params.append("priority", getPriorityKey(filters.priority));
        }
        if (filters.assignedToMe) {
          params.append("assignedToMe", "true");
        }
        if (filters.createdByMe) {
          params.append("createdByMe", "true");
        }
        if (filters.overdue) {
          params.append("overdue", "true");
        }
      }

      // Add sorting
      if (sort) {
        params.append("sortBy", sort.field);
        params.append("sortOrder", sort.direction);
      }

      const url = `${API_BASE_URL}/tasks${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const response = await fetch(url, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to fetch tasks" };
      }

      const result = await response.json();
      const tasks = result.data.tasks.map((task: any) => ({
        ...task,
        id: String(task.id),
        status:
          TaskStatusEnum[task.status as keyof typeof TaskStatusEnum] ||
          task.status,
        priority:
          PriorityEnum[task.priority as keyof typeof PriorityEnum] ||
          task.priority,
        creatorId: task.creatorId ? String(task.creatorId) : undefined,
        assignedToId: task.assignedToId ? String(task.assignedToId) : null,
        creator: task.creator
          ? { ...task.creator, id: String(task.creator.id) }
          : undefined,
        assignedTo: task.assignedTo
          ? { ...task.assignedTo, id: String(task.assignedTo.id) }
          : null,
      }));
      return { data: tasks };
    } catch (_error) {
      return { error: "Failed to fetch tasks" };
    }
  },

  /**
   * Get a single task by ID.
   * Backend: GET /api/tasks/:id
   */
  async getTask(id: string): Promise<ApiResponse<Task>> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Task not found" };
      }

      const result = await response.json();
      const backendTask = result.data.task;
      const task: Task = {
        ...backendTask,
        id: String(backendTask.id),
        status:
          TaskStatusEnum[backendTask.status as keyof typeof TaskStatusEnum] ||
          backendTask.status,
        priority:
          PriorityEnum[backendTask.priority as keyof typeof PriorityEnum] ||
          backendTask.priority,
        creatorId: backendTask.creatorId ? String(backendTask.creatorId) : "",
        assignedToId: backendTask.assignedToId
          ? String(backendTask.assignedToId)
          : null,
      };
      return { data: task };
    } catch (_error) {
      return { error: "Failed to fetch task" };
    }
  },

  /**
   * Create a new task.
   * Backend: POST /api/tasks
   */
  async createTask(data: CreateTaskDto): Promise<ApiResponse<Task>> {
    try {
      // Convert frontend format to backend format
      const backendData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: getTaskStatusKey(data.status),
        priority: getPriorityKey(data.priority),
        assignedToId: data.assignedToId
          ? parseInt(data.assignedToId)
          : undefined,
      };
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: createHeaders(),
        credentials: "include",
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to create task" };
      }

      const result = await response.json();
      const backendTask = result.data.task;
      const task: Task = {
        ...backendTask,
        id: String(backendTask.id),
        status:
          TaskStatusEnum[backendTask.status as keyof typeof TaskStatusEnum] ||
          backendTask.status,
        priority:
          PriorityEnum[backendTask.priority as keyof typeof PriorityEnum] ||
          backendTask.priority,
        creatorId: String(backendTask.creatorId),
        assignedToId: backendTask.assignedToId
          ? String(backendTask.assignedToId)
          : null,
      };
      return { data: task };
    } catch (_error) {
      return { error: "Failed to create task" };
    }
  },

  /**
   * Update an existing task.
   * Backend: PATCH /api/tasks/:id
   */
  async updateTask(
    id: string,
    data: UpdateTaskDto
  ): Promise<ApiResponse<Task>> {
    try {
      // Convert frontend format to backend format
      const backendData: any = {};
      if (data.title !== undefined) backendData.title = data.title;
      if (data.description !== undefined)
        backendData.description = data.description;
      if (data.dueDate !== undefined) backendData.dueDate = data.dueDate;
      if (data.status !== undefined)
        backendData.status = getTaskStatusKey(data.status);
      if (data.priority !== undefined)
        backendData.priority = getPriorityKey(data.priority);
      if (data.assignedToId !== undefined) {
        backendData.assignedToId = data.assignedToId
          ? parseInt(data.assignedToId)
          : null;
      }

      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: createHeaders(),
        credentials: "include",
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to update task" };
      }

      const result = await response.json();
      const backendTask = result.data.task;
      const task: Task = {
        ...backendTask,
        id: String(backendTask.id),
        status:
          TaskStatusEnum[backendTask.status as keyof typeof TaskStatusEnum] ||
          backendTask.status,
        priority:
          PriorityEnum[backendTask.priority as keyof typeof PriorityEnum] ||
          backendTask.priority,
        creatorId: String(backendTask.creatorId),
        assignedToId: backendTask.assignedToId
          ? String(backendTask.assignedToId)
          : null,
      };
      return { data: task };
    } catch (_error) {
      return { error: "Failed to update task" };
    }
  },

  /**
   * Delete a task.
   * Backend: DELETE /api/tasks/:id
   */
  async deleteTask(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        return { error: result.message || "Failed to delete task" };
      }

      return { message: "Task deleted successfully" };
    } catch (_error) {
      return { error: "Failed to delete task" };
    }
  },
};

// ============================================
// USER SERVICE
// ============================================

export const userService = {
  /**
   * Get all users (for task assignment dropdown).
   * Backend: GET /api/users
   */
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to fetch users" };
      }

      const result = await response.json();
      const users = result.data.users.map((user: any) => ({
        ...user,
        id: String(user.id),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
      }));
      return { data: users };
    } catch (_error) {
      return { error: "Failed to fetch users" };
    }
  },

  /**
   * Get user by ID.
   * Backend: GET /api/users/:id
   */
  async getUser(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "User not found" };
      }

      const result = await response.json();
      const backendUser = result.data.user;
      const user: User = {
        ...backendUser,
        id: String(backendUser.id),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
      };
      return { data: user };
    } catch (_error) {
      return { error: "Failed to fetch user" };
    }
  },

  /**
   * Update user.
   * Backend: PATCH /api/users/:id
   */
  async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: createHeaders(),
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to update user" };
      }

      const result = await response.json();
      const backendUser = result.data.user;
      const user: User = {
        ...backendUser,
        id: String(backendUser.id),
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
      };
      return { data: user };
    } catch (_error) {
      return { error: "Failed to update user" };
    }
  },

  /**
   * Delete user.
   * Backend: DELETE /api/users/:id
   */
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        return { error: result.message || "Failed to delete user" };
      }

      return { message: "User deleted successfully" };
    } catch (_error) {
      return { error: "Failed to delete user" };
    }
  },
};

// ============================================
// NOTIFICATION SERVICE
// ============================================

export const notificationService = {
  /**
   * Get all notifications for current user.
   * Backend: GET /api/notifications
   */
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to fetch notifications" };
      }

      const result = await response.json();
      const notifications = result.data.notifications.map((n: any) => ({
        ...n,
        id: String(n.id),
        userId: n.userId ? String(n.userId) : undefined,
        taskId: n.taskId ? String(n.taskId) : undefined,
        read: n.isRead,
      }));
      return { data: notifications };
    } catch (_error) {
      return { error: "Failed to fetch notifications" };
    }
  },

  /**
   * Get unread notification count.
   * Backend: GET /api/notifications/unread-count
   */
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/unread-count`,
        {
          headers: createHeaders(),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to fetch unread count" };
      }

      const result = await response.json();
      return { data: result.data };
    } catch (_error) {
      return { error: "Failed to fetch unread count" };
    }
  },

  /**
   * Get notification by ID.
   * Backend: GET /api/notifications/:id
   */
  async getNotification(id: string): Promise<ApiResponse<Notification>> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Notification not found" };
      }

      const result = await response.json();
      const n = result.data.notification;
      const notification: Notification = {
        ...n,
        id: String(n.id),
        userId: n.userId ? String(n.userId) : undefined,
        taskId: n.taskId ? String(n.taskId) : undefined,
        read: n.isRead,
      } as Notification;
      return { data: notification };
    } catch (_error) {
      return { error: "Failed to fetch notification" };
    }
  },

  /**
   * Mark notification as read.
   * Backend: PATCH /api/notifications/:id/read
   */
  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: "PATCH",
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to mark as read" };
      }

      const result = await response.json();
      const n = result.data.notification;
      const notification: Notification = {
        ...n,
        id: String(n.id),
        userId: n.userId ? String(n.userId) : undefined,
        taskId: n.taskId ? String(n.taskId) : undefined,
        read: n.isRead,
      } as Notification;
      return { data: notification };
    } catch (_error) {
      return { error: "Failed to mark notification as read" };
    }
  },

  /**
   * Mark all notifications as read.
   * Backend: PATCH /api/notifications/mark-all-read
   */
  async markAllAsRead(): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/mark-all-read`,
        {
          method: "PATCH",
          headers: createHeaders(),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        return { error: result.message || "Failed to mark all as read" };
      }

      return { message: "All notifications marked as read" };
    } catch (_error) {
      return { error: "Failed to mark all notifications as read" };
    }
  },

  /**
   * Delete notification.
   * Backend: DELETE /api/notifications/:id
   */
  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: "DELETE",
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        return { error: result.message || "Failed to delete notification" };
      }

      return { message: "Notification deleted successfully" };
    } catch (_error) {
      return { error: "Failed to delete notification" };
    }
  },
};

// ============================================
// DASHBOARD SERVICE
// ============================================

export const dashboardService = {
  /**
   * Get dashboard statistics.
   * Backend: GET /api/tasks/stats
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/stats`, {
        headers: createHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Failed to fetch stats" };
      }

      const result = await response.json();
      return { data: result.data.stats };
    } catch (_error) {
      return { error: "Failed to fetch dashboard stats" };
    }
  },
};
