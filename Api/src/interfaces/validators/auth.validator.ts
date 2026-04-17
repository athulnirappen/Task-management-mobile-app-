import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "../../core/domain/errors/app.error";

const registerUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const validateRegisterUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = registerUserSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    next(new AppError(message, 400));
    return;
  }

  req.body = result.data;
  next();
};

const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const validateLoginUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = loginUserSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    next(new AppError(message, 400));
    return;
  }

  req.body = result.data;
  next();
};

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const validateRefreshToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = refreshTokenSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    next(new AppError(message, 400));
    return;
  }

  req.body = result.data;
  next();
};