import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler";

interface JWTPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Read token from HttpOnly cookie
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError("No token provided", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret"
    ) as JWTPayload;

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
