import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../../core/application/use-cases/user/create-user.usecase";
import { GetUserUseCase } from "../../core/application/use-cases/user/get-user.usecase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const user = await this.getUserUseCase.execute(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
