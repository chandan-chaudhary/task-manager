import { Router } from "express";
import notificationController from "../controllers/notificationController";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validation";
import {
  getNotificationByIdSchema,
  markAsReadSchema,
  deleteNotificationSchema,
  getNotificationsQuerySchema,
} from "../dto/notification.dto";

const router = Router();

// All notification routes require authentication
router.use(authMiddleware);

router.get(
  "/",
  validate(getNotificationsQuerySchema),
  notificationController.getAllNotifications
);
router.get("/unread-count", notificationController.getUnreadCount);
router.get(
  "/:id",
  validate(getNotificationByIdSchema),
  notificationController.getNotificationById
);
router.patch(
  "/:id/read",
  validate(markAsReadSchema),
  notificationController.markAsRead
);
router.patch("/mark-all-read", notificationController.markAllAsRead);
router.delete(
  "/:id",
  validate(deleteNotificationSchema),
  notificationController.deleteNotification
);

export default router;
