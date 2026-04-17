import { TaskRepository } from "../../../domain/repositories/task.repository";
import { FindAllDTO, TaskResponseDTO } from "../../dto/task.dto";

export class FindAllTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async executeFindAll(input: FindAllDTO): Promise<TaskResponseDTO[]> {
    const tasks = await this.taskRepository.findAll(input);
    return tasks;
  }
}
