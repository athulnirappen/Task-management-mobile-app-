import { CreateTaskUseCase } from "../../core/application/use-cases/task/create.task.usecase";
import { DeleteTaskUseCase } from "../../core/application/use-cases/task/delete.task.usecase";
import { FindAllTaskUseCase } from "../../core/application/use-cases/task/find-all.task.usecase";
import { FindByIdTaskUseCase } from "../../core/application/use-cases/task/find-by-id.task.usecase";
import { UpdateTaskUseCase } from "../../core/application/use-cases/task/update.task.usecase";
import { Request, Response, NextFunction } from "express";

export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findAllTaskUseCase: FindAllTaskUseCase,
    private readonly findByIdTaskUseCase: FindByIdTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.createTaskUseCase.executeCreate({
        ...req.body,
        userId: req.user!.id,
      });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.findAllTaskUseCase.executeFindAll({
        userId: req.user!.id,
      });
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.findByIdTaskUseCase.executeFindById({
        id: req.params.id as string,
      });
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.updateTaskUseCase.executeUpdate({
        ...req.body,
        userId: req.user!.id,
      });
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.deleteTaskUseCase.executeDelete({
        id: req.params.id as string,
        userId: req.user!.id,
      });
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };
}
