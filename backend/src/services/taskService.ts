import taskRepository, { TaskFilters } from "../repositories/taskRepository";
import notificationRepository from "../repositories/notificationRepository";
import userRepository from "../repositories/userRepository";
import { AppError } from "../middleware/errorHandler";
import { CreateTaskDto, UpdateTaskDto, GetTasksQuery } from "../dto/task.dto";
import { TaskStatus, TaskPriority } from "@prisma/client";
import { socketEvents } from "../config/socket";

export class TaskService {
  async getAllTasks(filters?: GetTasksQuery, userId?: number) {
    const taskFilters: TaskFilters = {};

    if (filters?.status) taskFilters.status = filters.status as TaskStatus;
    if (filters?.priority)
      taskFilters.priority = filters.priority as TaskPriority;
    if (filters?.assignedToId) taskFilters.assignedToId = filters.assignedToId;

    // Filter by logged-in user
    if (filters?.createdByMe && userId) taskFilters.creatorId = userId;
    if (filters?.assignedToMe && userId) taskFilters.assignedToId = userId;

    // Overdue filter requires userId
    if (filters?.overdue && userId) {
      taskFilters.overdue = true;
      taskFilters.userId = userId;
    }

    // Default behavior: show only tasks created by or assigned to the user
    // If no specific filters are set, show all user-related tasks
    if (
      userId &&
      !filters?.createdByMe &&
      !filters?.assignedToMe &&
      !filters?.assignedToId
    ) {
      taskFilters.userId = userId;
    }

    return taskRepository.findAll(taskFilters);
  }

  async getTaskById(id: number) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  async createTask(data: CreateTaskDto, creatorId: number) {
    // Validate assignedTo user exists if provided
    if (data.assignedToId) {
      const assignedUser = await userRepository.findById(data.assignedToId);
      if (!assignedUser) {
        throw new AppError("Assigned user not found", 404);
      }
    }

    const task = await taskRepository.create({
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      priority: data.priority,
      status: data.status,
      creator: {
        connect: { id: creatorId },
      },
      ...(data.assignedToId && {
        assignedTo: {
          connect: { id: data.assignedToId },
        },
      }),
    });

    // Create notification if task is assigned to someone other than creator
    if (data.assignedToId && data.assignedToId !== creatorId) {
      const notification = await notificationRepository.create({
        user: { connect: { id: data.assignedToId } },
        taskId: task.id,
        message: `You have been assigned a new task: ${task.title}`,
      });

      // Emit real-time notification
      socketEvents.notificationCreated(data.assignedToId, notification);
      socketEvents.taskAssigned(data.assignedToId, task);
    }

    // Emit task creation event to all clients
    socketEvents.taskCreated(task);

    return task;
  }

  async updateTask(id: number, data: UpdateTaskDto, userId: number) {
    // Check if task exists
    const existingTask = await taskRepository.findById(id);
    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    // Check permissions
    const isCreator = existingTask.creatorId === userId;
    const isAssignee = existingTask.assignedToId === userId;

    // If user is only assignee (not creator), they can only update status
    if (isAssignee && !isCreator) {
      console.log(isAssignee, isCreator, data);

      // Only allow status updates
      if (Object.keys(data).some((key) => key !== "status")) {
        throw new AppError(
          "You can only update the status of tasks assigned to you",
          403
        );
      }

      if (data.status) {
        const task = await taskRepository.update(id, { status: data.status });

        // Notify creator about status update
        if (existingTask.creatorId !== userId) {
          const statusName = data.status.replace("_", " ").toLowerCase();
          const notification = await notificationRepository.create({
            user: { connect: { id: existingTask.creatorId } },
            taskId: task.id,
            message: `Status of "${task.title}" was updated to ${statusName}`,
          });

          // Emit real-time notification
          socketEvents.notificationCreated(
            existingTask.creatorId,
            notification
          );
        }

        // Emit real-time update
        socketEvents.taskUpdated(id, task);

        return task;
      }

      throw new AppError("No valid updates provided", 400);
    }

    // If user is not creator and not assignee, deny access
    if (!isCreator && !isAssignee) {
      throw new AppError("You don't have permission to update this task", 403);
    }

    // Creator can update everything
    // Validate assignedTo user exists if provided
    if (data.assignedToId) {
      const assignedUser = await userRepository.findById(data.assignedToId);
      if (!assignedUser) {
        throw new AppError("Assigned user not found", 404);
      }
    }

    const updateData: any = {};
    if (data.title) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.status) updateData.status = data.status;
    if (data.priority) updateData.priority = data.priority;
    if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
    if (data.assignedToId !== undefined) {
      updateData.assignedTo = data.assignedToId
        ? { connect: { id: data.assignedToId } }
        : { disconnect: true };
    }

    const task = await taskRepository.update(id, updateData);

    // Create notification if assignee changed
    if (
      data.assignedToId !== undefined &&
      data.assignedToId !== existingTask.assignedToId &&
      data.assignedToId !== null
    ) {
      const notification = await notificationRepository.create({
        user: { connect: { id: data.assignedToId } },
        taskId: task.id,
        message: `You have been assigned to task: ${task.title}`,
      });

      // Emit real-time notification
      socketEvents.notificationCreated(data.assignedToId, notification);
      socketEvents.taskAssigned(data.assignedToId, task);
    }

    // Create notification if status changed and there's an assignee
    if (
      data.status &&
      data.status !== existingTask.status &&
      existingTask.assignedToId &&
      existingTask.assignedToId !== userId
    ) {
      const statusName = data.status.replace("_", " ");
      const notification = await notificationRepository.create({
        user: { connect: { id: existingTask.assignedToId } },
        taskId: task.id,
        message: `Status of "${task.title}" was updated to ${statusName}`,
      });

      // Emit real-time notification
      socketEvents.notificationCreated(existingTask.assignedToId, notification);
    }

    // Emit task update event to all clients
    socketEvents.taskUpdated(id, task);

    return task;
  }

  async deleteTask(id: number) {
    const existingTask = await taskRepository.findById(id);
    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    await taskRepository.delete(id);

    // Emit task deletion event to all clients
    socketEvents.taskDeleted(id);
  }

  async getStats(userId: number) {
    // Get only tasks that are assigned to or created by the logged-in user
    const allTasks = await taskRepository.findAll({});
    const userTasks = allTasks.filter(
      (t) => t.assignedToId === userId || t.creatorId === userId
    );
    const now = new Date();

    const stats = {
      totalTasks: userTasks.length,
      completedTasks: userTasks.filter((t) => t.status === "COMPLETED").length,
      overdueTasks: userTasks.filter(
        (t) => new Date(t.dueDate) < now && t.status !== "COMPLETED"
      ).length,
      tasksAssignedToMe: userTasks.filter((t) => t.assignedToId === userId)
        .length,
      tasksCreatedByMe: userTasks.filter((t) => t.creatorId === userId).length,
      tasksByStatus: {
        "To Do": userTasks.filter((t) => t.status === "TODO").length,
        "In Progress": userTasks.filter((t) => t.status === "IN_PROGRESS")
          .length,
        Review: userTasks.filter((t) => t.status === "REVIEW").length,
        Completed: userTasks.filter((t) => t.status === "COMPLETED").length,
      },
      tasksByPriority: {
        Low: userTasks.filter((t) => t.priority === "LOW").length,
        Medium: userTasks.filter((t) => t.priority === "MEDIUM").length,
        High: userTasks.filter((t) => t.priority === "HIGH").length,
        Urgent: userTasks.filter((t) => t.priority === "URGENT").length,
      },
    };

    return stats;
  }
}

export default new TaskService();
