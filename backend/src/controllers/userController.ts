import { Response, NextFunction } from "express";
import userService from "../services/userService";
import { AuthRequest } from "../middleware/auth";

export class UserController {
  async getAllUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json({
        status: "success",
        results: users.length,
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getUserById(id);

      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.updateUser(id, req.body, req.user!.id);

      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await userService.deleteUser(id, req.user!.id);

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
