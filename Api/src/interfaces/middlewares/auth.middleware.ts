import { NextFunction, Request, Response } from "express";

import { JwtService } from "../../infrastructure/services/jwt.service";
import { AppError } from "../../core/domain/errors/app.error";

const jwtService = new JwtService();

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401);
    }

    const token = header.replace("Bearer ", "");
    const payload = jwtService.verify(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};
