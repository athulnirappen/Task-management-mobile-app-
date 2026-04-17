import {Router} from "express"
import { TaskController } from "../controllers/task.controller";
import { validateCreateTask, validateDeleteTask, validateFindByIdTask, validateUpdateTask } from "../validators/task.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

export function createTaskRouter(controller: TaskController): Router {
    const taskRoutes = Router();
    taskRoutes.post("/", authMiddleware, validateCreateTask, controller.create);
    taskRoutes.get("/", authMiddleware, controller.findAll);
    taskRoutes.get("/:id", authMiddleware, validateFindByIdTask, controller.findById);
    taskRoutes.put("/:id", authMiddleware, validateUpdateTask, controller.update);
    taskRoutes.delete("/:id", authMiddleware, validateDeleteTask, controller.delete);
    return taskRoutes;
}