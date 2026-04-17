export interface CreateTaskDTO {
  title: string;
  userId: string;
}

export interface UpdateTaskDTO {
  id: string;
  title: string;
  userId: string;
}

export interface TaskResponseDTO {
  id?: string;
  title: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeleteTaskDTO {
  id: string;
  userId: string;
}

export interface FindByIdDTO {
  id: string;
}

export interface FindAllDTO {
  userId: string;
}
