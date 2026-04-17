import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "../../core/domain/errors/app.error";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const validateCreateUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = createUserSchema.safeParse(req.body);

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




