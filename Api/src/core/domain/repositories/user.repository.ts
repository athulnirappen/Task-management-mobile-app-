import { UserEntity } from "../entities/user.entity";

export interface CreateUserRepositoryInput {
  name: string;
  email: string;
  passwordHash: string;
}

export interface UserRepository {
  create(input: CreateUserRepositoryInput): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
