import { z } from "zod";

// Register DTO
export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),
  }),
});

// Login DTO
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});

export type RegisterDto = z.infer<typeof registerSchema>["body"];
export type LoginDto = z.infer<typeof loginSchema>["body"];
