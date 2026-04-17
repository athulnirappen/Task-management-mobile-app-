import jwt from "jsonwebtoken";

import { env } from "../../config/env";
import { StringValue } from "ms";

export interface JwtPayload {
  sub: string;
  email: string;
}

export class JwtService {
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as StringValue
    });
  }

  signRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as StringValue
    });
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload;
  }

  verify(token: string): JwtPayload {  
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  }
}
