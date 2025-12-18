import { Response, NextFunction } from "express";
import taskService from "../services/taskService";
import { AuthRequest } from "../middleware/auth";

export class TaskController {
  async getAllTasks(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getAllTasks(req.query, req.user?.id);

      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: { tasks },
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const task = await taskService.getTaskById(id);

      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const task = await taskService.createTask(req.body, req.user!.id);

      res.status(201).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const task = await taskService.updateTask(id, req.body, req.user!.id);

      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await taskService.deleteTask(id);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await taskService.getStats(req.user!.id);

      res.status(200).json({
        status: "success",
        data: { stats },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
