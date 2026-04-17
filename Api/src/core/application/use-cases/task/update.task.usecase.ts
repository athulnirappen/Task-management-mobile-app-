import { TaskRepository } from "../../../domain/repositories/task.repository";
import { UpdateTaskDTO, TaskResponseDTO } from "../../dto/task.dto";
import { AppError } from "../../../domain/errors/app.error";

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async executeUpdate(input: UpdateTaskDTO): Promise<TaskResponseDTO> {
    const existing = await this.taskRepository.findById({ id: input.id });
    if (!existing) throw new AppError("Task not found", 404);
    if (existing.userId !== input.userId) throw new AppError("Forbidden", 403);

    const task = await this.taskRepository.update(input);
    return {
      id: task.id,
      title: task.title,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
