import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validation";
import {
  updateUserSchema,
  getUserByIdSchema,
  deleteUserSchema,
} from "../dto/user.dto";

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

router.get("/", userController.getAllUsers);
router.get("/:id", validate(getUserByIdSchema), userController.getUserById);
router.patch("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", validate(deleteUserSchema), userController.deleteUser);

export default router;
