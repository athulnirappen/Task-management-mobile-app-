import { TaskRepository } from "../../../domain/repositories/task.repository";
import { CreateTaskDTO, TaskResponseDTO } from "../../dto/task.dto";

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async executeCreate(input: CreateTaskDTO): Promise<TaskResponseDTO> {
    const task = await this.taskRepository.create(input);
    return {
      id: task.id,
      title: task.title,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
