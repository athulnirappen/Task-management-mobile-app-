export type TaskProps = {
  id?: string;
  title: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class TaskEntity {
  public readonly id?: string;
  public readonly title: string;
  public readonly userId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
