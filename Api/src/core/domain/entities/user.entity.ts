export type UserProps = {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
};

export class UserEntity {
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly createdAt?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email.toLowerCase();
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
  }
}
