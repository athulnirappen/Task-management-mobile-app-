import bcrypt from "bcryptjs";

import { CreateUserDTO, UserResponseDTO } from "../../dto/user.dto";
import { AppError } from "../../../domain/errors/app.error";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new AppError("Email is already in use", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash
    });

    return {
      id: user.id as string,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt as Date
    };
  }
}
