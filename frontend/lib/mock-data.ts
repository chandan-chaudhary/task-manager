import type { Task, User, Notification, DashboardStats } from "@/types";

/**
 * Mock data for development and testing.
 * Replace with actual API calls when connecting to backend.
 */

export const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    email: "bob@example.com",
    name: "Bob Wilson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
];

export const mockCurrentUser: User = mockUsers[0];

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new dashboard layout",
    description:
      "Create wireframes and mockups for the new analytics dashboard. Include responsive designs for mobile and tablet views.",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "High",
    status: "In Progress",
    creatorId: "1",
    assignedToId: "1",
    creator: mockUsers[0],
    assignedTo: mockUsers[0],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Implement authentication flow",
    description:
      "Set up JWT-based authentication with secure cookie storage. Include login, register, and password reset functionality.",
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "Urgent",
    status: "Review",
    creatorId: "2",
    assignedToId: "1",
    creator: mockUsers[1],
    assignedTo: mockUsers[0],
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "3",
    title: "Write API documentation",
    description:
      "Document all REST API endpoints using OpenAPI/Swagger specification. Include request/response examples.",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "Medium",
    status: "To Do",
    creatorId: "1",
    assignedToId: "2",
    creator: mockUsers[0],
    assignedTo: mockUsers[1],
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "4",
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions for automated testing and deployment to staging/production environments.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "Low",
    status: "To Do",
    creatorId: "3",
    assignedToId: "3",
    creator: mockUsers[2],
    assignedTo: mockUsers[2],
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "5",
    title: "Fix memory leak in WebSocket handler",
    description:
      "Investigate and fix memory leak issue reported in production. Add proper cleanup for socket connections.",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "Urgent",
    status: "In Progress",
    creatorId: "1",
    assignedToId: "2",
    creator: mockUsers[0],
    assignedTo: mockUsers[1],
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "6",
    title: "Refactor task filtering logic",
    description:
      "Optimize the task filtering and sorting logic for better performance with large datasets.",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "Medium",
    status: "Completed",
    creatorId: "2",
    assignedToId: "1",
    creator: mockUsers[1],
    assignedTo: mockUsers[0],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task_assigned",
    message: 'Jane Smith assigned you to "Implement authentication flow"',
    taskId: "2",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "task_updated",
    message: 'Task "Design new dashboard layout" was moved to In Progress',
    taskId: "1",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "task_completed",
    message: 'Task "Refactor task filtering logic" was completed',
    taskId: "6",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockDashboardStats: DashboardStats = {
  totalTasks: mockTasks.length,
  completedTasks: mockTasks.filter((t) => t.status === "Completed").length,
  overdueTasks: mockTasks.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== "Completed"
  ).length,
  tasksAssignedToMe: mockTasks.filter(
    (t) => t.assignedToId === mockCurrentUser.id
  ).length,
  tasksCreatedByMe: mockTasks.filter((t) => t.creatorId === mockCurrentUser.id)
    .length,
  tasksByStatus: {
    "To Do": mockTasks.filter((t) => t.status === "To Do").length,
    "In Progress": mockTasks.filter((t) => t.status === "In Progress").length,
    Review: mockTasks.filter((t) => t.status === "Review").length,
    Completed: mockTasks.filter((t) => t.status === "Completed").length,
  },
  tasksByPriority: {
    Low: mockTasks.filter((t) => t.priority === "Low").length,
    Medium: mockTasks.filter((t) => t.priority === "Medium").length,
    High: mockTasks.filter((t) => t.priority === "High").length,
    Urgent: mockTasks.filter((t) => t.priority === "Urgent").length,
  },
};
