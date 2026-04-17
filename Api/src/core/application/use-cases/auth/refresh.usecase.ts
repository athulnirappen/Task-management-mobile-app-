import { JwtService } from "../../../../infrastructure/services/jwt.service";
import { AuthEntity } from "../../../domain/entities/auth.entity";
import { AppError } from "../../../domain/errors/app.error";
import { AuthRepository } from "../../../domain/repositories/auth.repository";
import { env } from "../../../../config/env";

export class RefreshUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async executeRefresh(token: string): Promise<AuthEntity> {
    let payload: { sub: string; email: string };
    try {
      payload = this.jwtService.verifyRefreshToken(token);
    } catch {
      // Covers invalid signature, malformed token, and expired token.
      throw new AppError("Invalid refresh token", 401);
    }

    const user = await this.authRepository.findById(payload.sub);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const accessToken = this.jwtService.sign({
      sub: user.id as string,
      email: user.email,
    });

    const refreshToken = this.jwtService.signRefreshToken({
      sub: user.id as string,
      email: user.email,
    });

    return new AuthEntity({
      userId: user.id as string,
      email: user.email,
      accessToken,
      refreshToken,
    });
  }
}
