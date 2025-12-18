import prisma from "../config/database";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByIdWithTasks(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        createdTasks: {
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
          },
        },
        assignedTasks: {
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
          },
        },
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserRepository();
