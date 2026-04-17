import { AuthenticatedUser } from "../../shared/types/common.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
