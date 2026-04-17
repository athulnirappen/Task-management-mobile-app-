import bcrypt from "bcryptjs";
import { AppError } from "../../../domain/errors/app.error";
import { AuthRepository } from "../../../domain/repositories/auth.repository";
import { LoginUserDTO, LoginUserResponseDTO } from "../../dto/auth.dto";
import { JwtService } from "../../../../infrastructure/services/jwt.service";

export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async executeLogin(input: LoginUserDTO): Promise<LoginUserResponseDTO> {
    const user = await this.authRepository.findByEmail(input.email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    const accessToken = this.jwtService.sign({
      sub: user.id as string,
      email: user.email,
    });

    const refreshToken = this.jwtService.signRefreshToken({
      sub: user.id as string,
      email: user.email,
    });

    return {
      user: {
        id: user.id as string,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt as Date,
      },
      accesstoken: accessToken,
      refreshtoken: refreshToken,
    };
  }
}
