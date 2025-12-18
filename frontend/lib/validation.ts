import { z } from "zod";

/**
 * Zod validation schemas for form validation and API data integrity.
 * These schemas ensure data consistency between frontend and backend.
 */

/** Password requirements */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

/** Login form validation schema */
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

/** Registration form validation schema */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

/** Priority enum for validation */
export const priorityEnum = z.enum(["Low", "Medium", "High", "Urgent"]);

/** Status enum for validation */
export const statusEnum = z.enum([
  "To Do",
  "In Progress",
  "Review",
  "Completed",
]);

/** Task creation validation schema */
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be less than 2000 characters"),
  dueDate: z.union([
    z.string().refine((date) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, "Please enter a valid date"),
    z.date(),
  ]),
  priority: priorityEnum,
  status: statusEnum,
  assignedToId: z.string().nullable().optional(),
});

/** Task update validation schema (all fields optional) */
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description must be less than 2000 characters")
    .optional(),
  dueDate: z
    .union([
      z.string().refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
      }, "Please enter a valid date"),
      z.date(),
    ])
    .optional(),
  priority: priorityEnum.optional(),
  status: statusEnum.optional(),
  assignedToId: z.string().nullable().optional(),
});

/** Profile update validation schema */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  avatarUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
