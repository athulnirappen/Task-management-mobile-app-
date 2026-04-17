import bcrypt from "bcryptjs";
import {  RegisterUserDTO } from "../../dto/auth.dto";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { AuthRepository } from "../../../domain/repositories/auth.repository";
import { UserResponseDTO } from "../../dto/user.dto";
import { AppError } from "../../../domain/errors/app.error";

export class RegisterUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async executeRegister(input: RegisterUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.authRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await this.authRepository.register({
      name: input.name,
      email: input.email,
      password: passwordHash,
    });

    return{
      id: user.id as string,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt as Date
    }
  }
}
