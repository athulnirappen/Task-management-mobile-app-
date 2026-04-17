import {Router} from "express"
import { TaskRepositoryImpl } from "../infrastructure/repositories/task.repository.impl";
import { CreateTaskUseCase } from "../core/application/use-cases/task/create.task.usecase";
import { FindAllTaskUseCase } from "../core/application/use-cases/task/find-all.task.usecase";
import { FindByIdTaskUseCase } from "../core/application/use-cases/task/find-by-id.task.usecase";
import { UpdateTaskUseCase } from "../core/application/use-cases/task/update.task.usecase";
import { DeleteTaskUseCase } from "../core/application/use-cases/task/delete.task.usecase";
import { TaskController } from "../interfaces/controllers/task.controller";
import { createTaskRouter } from "../interfaces/routes/task.routes";

const taskRepository = new TaskRepositoryImpl();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const findAllTaskUseCase = new FindAllTaskUseCase(taskRepository);
const findByIdTaskUseCase = new FindByIdTaskUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const taskController = new TaskController(createTaskUseCase, findAllTaskUseCase, findByIdTaskUseCase, updateTaskUseCase, deleteTaskUseCase);

export const taskRoutes: Router = createTaskRouter(taskController);