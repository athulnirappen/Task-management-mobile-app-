import {
  LoginUserDTO,
  LoginUserResponseDTO,
  RegisterUserDTO,
} from "../../application/dto/auth.dto";
import { AuthEntity } from "../entities/auth.entity";
import { UserEntity } from "../entities/user.entity";

export interface AuthRepository {
  register(input: RegisterUserDTO): Promise<UserEntity>;
  login(input: LoginUserDTO): Promise<AuthEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  
}
