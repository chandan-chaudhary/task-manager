import { Router } from "express";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validation";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../dto/auth.dto";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getMe);
router.put(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  authController.changePassword
);

export default router;
