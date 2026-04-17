import { RegisterUserUseCase } from "../../core/application/use-cases/auth/register.usecase";
import { LoginUseCase } from "../../core/application/use-cases/auth/login.usecase";
import { Request, Response, NextFunction } from "express";
import { RefreshUseCase } from "../../core/application/use-cases/auth/refresh.usecase";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshUseCase,
  ) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.registerUserUseCase.executeRegister(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.loginUserUseCase.executeLogin(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.refreshTokenUseCase.executeRefresh(
        req.body.refreshToken,
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
