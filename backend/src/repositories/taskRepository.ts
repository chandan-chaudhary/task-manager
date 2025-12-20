import prisma from "../config/database";
import { Prisma, TaskStatus, TaskPriority } from "@prisma/client";

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedToId?: number;
  creatorId?: number;
  overdue?: boolean;
  userId?: number;
}

export class TaskRepository {
  async findAll(filters?: TaskFilters) {
    const where: Prisma.TaskWhereInput = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.priority) where.priority = filters.priority;
    if (filters?.assignedToId) where.assignedToId = filters.assignedToId;
    if (filters?.creatorId) where.creatorId = filters.creatorId;

    // Overdue filter: due date passed, not completed, and (assigned to or created by user)
    if (filters?.overdue && filters?.userId) {
      where.dueDate = { lt: new Date() };
      where.status = { not: "COMPLETED" };
      where.OR = [
        { assignedToId: filters.userId },
        { creatorId: filters.userId },
      ];
    }
    // Default filter: show only tasks created by or assigned to the user
    else if (filters?.userId && !filters?.assignedToId && !filters?.creatorId) {
      where.OR = [
        { assignedToId: filters.userId },
        { creatorId: filters.userId },
      ];
    }

    return prisma.task.findMany({
      where,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: number) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.TaskCreateInput) {
    return prisma.task.create({
      data,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, data: Prisma.TaskUpdateInput) {
    return prisma.task.update({
      where: { id },
      data,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}

export default new TaskRepository();
