import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

import {
  validateLoginUser,
  validateRefreshToken,
  validateRegisterUser,
} from "../validators/auth.validator";

export function createAuthRouter(controller: AuthController): Router {
  const authRoutes = Router();
  authRoutes.post("/register", validateRegisterUser, controller.register);
  authRoutes.post("/login", validateLoginUser, controller.login);
  authRoutes.post("/refresh", validateRefreshToken, controller.refreshToken);
  return authRoutes;
}
