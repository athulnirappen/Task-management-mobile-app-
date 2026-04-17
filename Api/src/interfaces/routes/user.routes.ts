import { Router } from "express";

import { UserController } from "../controllers/user.controller";
import { validateCreateUser } from "../validators/user.validator";

export function createUserRouter(controller: UserController): Router {
  const userRoutes = Router();

  userRoutes.post("/", validateCreateUser, controller.create);
  userRoutes.get("/:id", controller.getById);

  return userRoutes;
}
