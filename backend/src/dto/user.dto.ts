import { z } from "zod";

// Update User DTO
export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters")
      .optional(),
    email: z.string().email("Invalid email format").optional(),
  }),
});

// Get User by ID DTO
export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

// Delete User DTO
export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>["body"];
