import { NextFunction, Request, Response } from "express";

import { AppError } from "../../core/domain/errors/app.error";
import { HTTP_STATUS } from "../../shared/constants/http-status";
import { logger } from "../../shared/utils/logger";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  logger.error(error);

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error"
  });
};
