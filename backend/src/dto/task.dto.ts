import { z } from "zod";

// Task Priority and Status Enums
export const TaskPriority = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const TaskStatus = z.enum([
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
]);

// Create Task DTO
export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters"),
    description: z.string().min(1, "Description is required"),
    dueDate: z.string().datetime("Invalid date format").or(z.date()),
    priority: TaskPriority.default("MEDIUM"),
    status: TaskStatus.default("TODO"),
    assignedToId: z.number().int().positive().optional().nullable(),
  }),
});

// Update Task DTO
export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
  body: z.object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(100, "Title must be less than 100 characters")
      .optional(),
    description: z.string().min(1, "Description cannot be empty").optional(),
    dueDate: z.string().datetime("Invalid date format").or(z.date()).optional(),
    priority: TaskPriority.optional(),
    status: TaskStatus.optional(),
    assignedToId: z.number().int().positive().optional().nullable(),
  }),
});

// Get Task by ID DTO
export const getTaskByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

// Delete Task DTO
export const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

// Query params for filtering tasks
export const getTasksQuerySchema = z.object({
  query: z
    .object({
      status: TaskStatus.optional(),
      priority: TaskPriority.optional(),
      assignedToId: z.string().regex(/^\d+$/).transform(Number).optional(),
      createdByMe: z
        .string()
        .transform((val) => val === "true")
        .optional(),
      assignedToMe: z
        .string()
        .transform((val) => val === "true")
        .optional(),
      overdue: z
        .string()
        .transform((val) => val === "true")
        .optional(),
    })
    .optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>["body"];
export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>["query"];
