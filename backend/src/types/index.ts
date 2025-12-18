export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: Date;
  assignedToId?: number;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: number;
  userId: number;
  taskId: number;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
