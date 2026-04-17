import { AppError } from "../../../domain/errors/app.error";
import { TaskRepository } from "../../../domain/repositories/task.repository";
import { FindByIdDTO, TaskResponseDTO } from "../../dto/task.dto";



export class FindByIdTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository){}

    async executeFindById(input: FindByIdDTO): Promise<TaskResponseDTO> {
        const task = await this.taskRepository.findById(input);
        if(!task){
            throw new AppError("Task not found", 404);
        }
        return {
            id: task.id,
            title: task.title,
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        };
    }
}