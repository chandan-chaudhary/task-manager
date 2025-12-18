import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import { AuthRequest } from "../middleware/auth";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        status: "success",
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);

      // Set JWT in HttpOnly cookie
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        status: "success",
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await authService.getMe(req.user!.id);

      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Clear the token cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      });

      res.status(200).json({
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
