import { UserResponseDTO } from "../../dto/user.dto";
import { AppError } from "../../../domain/errors/app.error";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      id: user.id as string,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt as Date
    };
  }
}
