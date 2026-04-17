import { prisma } from "../database/prisma/prisma.client";
import { TaskRepository } from "../../core/domain/repositories/task.repository";
import { TaskEntity } from "../../core/domain/entities/task.entity";
import {
  CreateTaskDTO,
  DeleteTaskDTO,
  FindAllDTO,
  FindByIdDTO,
  UpdateTaskDTO,
} from "../../core/application/dto/task.dto";


export class TaskRepositoryImpl implements TaskRepository {
  async create(input: CreateTaskDTO): Promise<TaskEntity> {
    const task = await prisma.task.create({
      data: {
        title: input.title,
        userId: input.userId,
      },
    });
    return new TaskEntity({
      id: task.id,
      title: task.title,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  async findAll(input: FindAllDTO): Promise<TaskEntity[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId: input.userId,
      },
    });
    return tasks.map(
      (task) =>
        new TaskEntity({
          id: task.id,
          title: task.title,
          userId: task.userId,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        }),
    );
  }

  async findById(input: FindByIdDTO): Promise<TaskEntity | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: input.id,
      },
    });
    if (!task) {
      return null;
    }
    return new TaskEntity({
      id: task.id,
      title: task.title,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  async update(input: UpdateTaskDTO): Promise<TaskEntity> {
    const task = await prisma.task.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
      },
    });
    return new TaskEntity({
      id: task.id,
      title: task.title,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }

  async delete(input: DeleteTaskDTO): Promise<TaskEntity> {
    const task = await prisma.task.delete({
      where: {
        id: input.id,
      },
    });
    return new TaskEntity({
      id: task.id,
      title: task.title,
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  }
}
