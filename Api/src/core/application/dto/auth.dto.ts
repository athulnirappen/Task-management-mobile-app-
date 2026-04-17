import { UserResponseDTO } from "./user.dto";

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginUserResponseDTO {
  user:UserResponseDTO;
  accesstoken: string;
  refreshtoken: string;
}
