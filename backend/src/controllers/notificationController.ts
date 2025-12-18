import { Response, NextFunction } from "express";
import notificationService from "../services/notificationService";
import { AuthRequest } from "../middleware/auth";

export class NotificationController {
  async getAllNotifications(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notifications = await notificationService.getAllNotifications(
        req.user!.id,
        req.query
      );

      res.status(200).json({
        status: "success",
        results: notifications.length,
        data: { notifications },
      });
    } catch (error) {
      next(error);
    }
  }

  async getNotificationById(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      const notification = await notificationService.getNotificationById(
        id,
        req.user!.id
      );

      res.status(200).json({
        status: "success",
        data: { notification },
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const notification = await notificationService.markAsRead(
        id,
        req.user!.id
      );

      res.status(200).json({
        status: "success",
        data: { notification },
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await notificationService.markAllAsRead(req.user!.id);

      res.status(200).json({
        status: "success",
        message: "All notifications marked as read",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      await notificationService.deleteNotification(id, req.user!.id);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const count = await notificationService.getUnreadCount(req.user!.id);

      res.status(200).json({
        status: "success",
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
