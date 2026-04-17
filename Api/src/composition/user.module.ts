import { Router } from "express";

import { CreateUserUseCase } from "../core/application/use-cases/user/create-user.usecase";
import { GetUserUseCase } from "../core/application/use-cases/user/get-user.usecase";
import { UserRepositoryImpl } from "../infrastructure/repositories/user.repository.impl";
import { UserController } from "../interfaces/controllers/user.controller";
import { createUserRouter } from "../interfaces/routes/user.routes";

const userRepository = new UserRepositoryImpl();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, getUserUseCase);

export const userRoutes: Router = createUserRouter(userController);
