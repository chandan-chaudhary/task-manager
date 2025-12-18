import notificationRepository from "../repositories/notificationRepository";
import { AppError } from "../middleware/errorHandler";
import { GetNotificationsQuery } from "../dto/notification.dto";

export class NotificationService {
  async getAllNotifications(userId: number, filters?: GetNotificationsQuery) {
    return notificationRepository.findAll({
      userId,
      isRead: filters?.isRead,
    });
  }

  async getNotificationById(id: number, userId: number) {
    const notification = await notificationRepository.findById(id);
    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    // Check if notification belongs to user
    if (notification.userId !== userId) {
      throw new AppError(
        "You are not authorized to view this notification",
        403
      );
    }

    return notification;
  }

  async markAsRead(id: number, userId: number) {
    const notification = await notificationRepository.findById(id);
    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    // Check if notification belongs to user
    if (notification.userId !== userId) {
      throw new AppError(
        "You are not authorized to update this notification",
        403
      );
    }

    return notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: number) {
    await notificationRepository.markAllAsRead(userId);
  }

  async deleteNotification(id: number, userId: number) {
    const notification = await notificationRepository.findById(id);
    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    // Check if notification belongs to user
    if (notification.userId !== userId) {
      throw new AppError(
        "You are not authorized to delete this notification",
        403
      );
    }

    await notificationRepository.delete(id);
  }

  async getUnreadCount(userId: number) {
    return notificationRepository.countUnread(userId);
  }
}

export default new NotificationService();
