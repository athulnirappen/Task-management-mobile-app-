import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { AppError } from "../../core/domain/errors/app.error";

const createTaskSchema = z.object({
  title: z.string().min(2),
});

export const validateCreateTask = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = createTaskSchema.safeParse(req.body);

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

const findAllTaskSchema = z.object({});

export const validateFindAllTask = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = findAllTaskSchema.safeParse(req.body);

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

const findByIdTaskSchema = z.object({
  id: z.string(),
});

export const validateFindByIdTask = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = findByIdTaskSchema.safeParse(req.params);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    next(new AppError(message, 400));
    return;
  }

  req.params = result.data as any;
  next();
};

const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(2),
});

export const validateUpdateTask = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = updateTaskSchema.safeParse({ ...req.body, id: req.params.id });

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

const deleteTaskSchema = z.object({
  id: z.string(),
});

export const validateDeleteTask = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = deleteTaskSchema.safeParse(req.params);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    next(new AppError(message, 400));
    return;
  }

  req.params = result.data as any;
  next();
};