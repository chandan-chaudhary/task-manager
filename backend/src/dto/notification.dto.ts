import { z } from "zod";

// Get Notification by ID DTO
export const getNotificationByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

// Mark as Read DTO
export const markAsReadSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

// Delete Notification DTO
export const deleteNotificationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number").transform(Number),
  }),
});

// Query params for filtering notifications
export const getNotificationsQuerySchema = z.object({
  query: z
    .object({
      isRead: z
        .enum(["true", "false"])
        .transform((val) => val === "true")
        .optional(),
    })
    .optional(),
});

export type GetNotificationsQuery = z.infer<
  typeof getNotificationsQuerySchema
>["query"];
