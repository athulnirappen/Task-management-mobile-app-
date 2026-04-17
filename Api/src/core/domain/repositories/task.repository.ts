import {
  CreateTaskDTO,
  DeleteTaskDTO,
  FindAllDTO,
  FindByIdDTO,
  UpdateTaskDTO,
} from "../../application/dto/task.dto";
import { TaskEntity } from "../entities/task.entity";

export interface TaskRepository {
  create(input: CreateTaskDTO): Promise<TaskEntity>;
  update(input: UpdateTaskDTO): Promise<TaskEntity>;
  delete(input: DeleteTaskDTO): Promise<TaskEntity>;
  findById(input: FindByIdDTO): Promise<TaskEntity | null>;
  findAll(input: FindAllDTO): Promise<TaskEntity[]>;
}
