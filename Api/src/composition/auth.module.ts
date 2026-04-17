import { Router } from "express";

import { RegisterUserUseCase } from "../core/application/use-cases/auth/register.usecase";
import { LoginUseCase } from "../core/application/use-cases/auth/login.usecase";
import { RefreshUseCase } from "../core/application/use-cases/auth/refresh.usecase";
import { AuthController } from "../interfaces/controllers/auth.controller";
import { createAuthRouter } from "../interfaces/routes/auth.routes";
import { AuthRepositoryImpl } from "../infrastructure/repositories/auth.repository.impl";
import { JwtService } from "../infrastructure/services/jwt.service";

const authRepository = new AuthRepositoryImpl();
const jwtService = new JwtService();
const registerUserUseCase = new RegisterUserUseCase(authRepository);
const loginUserUseCase = new LoginUseCase(authRepository, jwtService);
const refreshTokenUseCase = new RefreshUseCase(authRepository, jwtService);
const authController = new AuthController(registerUserUseCase, loginUserUseCase, refreshTokenUseCase);

export const authRoutes: Router = createAuthRouter(authController);
