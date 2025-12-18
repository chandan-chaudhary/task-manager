import { Router } from "express";
import taskController from "../controllers/taskController";
import { authMiddleware } from "../middleware/auth";
import { validate } from "../middleware/validation";
import {
  createTaskSchema,
  updateTaskSchema,
  getTaskByIdSchema,
  deleteTaskSchema,
  getTasksQuerySchema,
} from "../dto/task.dto";

const router = Router();

// All task routes require authentication
router.use(authMiddleware);

router.get("/stats", taskController.getStats);
router.get("/", validate(getTasksQuerySchema), taskController.getAllTasks);
router.get("/:id", validate(getTaskByIdSchema), taskController.getTaskById);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", validate(deleteTaskSchema), taskController.deleteTask);

export default router;
