import {
  LoginUserDTO,
  RegisterUserDTO,
} from "../../core/application/dto/auth.dto";
import { AuthEntity } from "../../core/domain/entities/auth.entity";
import { UserEntity } from "../../core/domain/entities/user.entity";
import { AuthRepository } from "../../core/domain/repositories/auth.repository";
import { prisma } from "../database/prisma/prisma.client";

export class AuthRepositoryImpl implements AuthRepository {
  async register(input: RegisterUserDTO): Promise<UserEntity> {
 
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash: input.password,
      },
    });

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    });
  }

  async login(input: LoginUserDTO): Promise<AuthEntity | null> {
    
    return null;
  }
  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {

  
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    });
  }
}
