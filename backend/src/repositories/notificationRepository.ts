import prisma from "../config/database";
import { Prisma } from "@prisma/client";

export interface NotificationFilters {
  userId: number;
  isRead?: boolean;
}

export class NotificationRepository {
  async findAll(filters: NotificationFilters) {
    const where: Prisma.NotificationWhereInput = {
      userId: filters.userId,
    };

    if (filters.isRead !== undefined) {
      where.isRead = filters.isRead;
    }

    return prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.notification.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.NotificationCreateInput) {
    return prisma.notification.create({
      data,
    });
  }

  async markAsRead(id: number) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: number) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.notification.delete({
      where: { id },
    });
  }

  async countUnread(userId: number) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }
}

export default new NotificationRepository();
