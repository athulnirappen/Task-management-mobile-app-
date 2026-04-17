export type AuthProps = {
  id?: string;
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  // env/JWT durations are strings (e.g. "7d", "15m"), so keep it as string.
  expiresIn?: string;
  createdAt?: Date;
};

export class AuthEntity {
  public readonly id?: string;
  public readonly userId: string;
  public readonly email: string;
  public readonly accessToken: string;
  public readonly refreshToken: string;
  public readonly expiresIn?: string;
  public readonly createdAt?: Date;

  constructor(props: AuthProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.email = props.email;
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
    this.expiresIn = props.expiresIn;
    this.createdAt = props.createdAt;
  }
}