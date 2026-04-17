import { UserEntity } from "../../core/domain/entities/user.entity";
import {
  CreateUserRepositoryInput,
  UserRepository
} from "../../core/domain/repositories/user.repository";
import { prisma } from "../database/prisma/prisma.client";

export class UserRepositoryImpl implements UserRepository {
  async create(input: CreateUserRepositoryInput): Promise<UserEntity> {
    const user = await prisma.user.create({ data: input });

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt
    });
  }
}
