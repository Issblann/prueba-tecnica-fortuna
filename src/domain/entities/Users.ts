export class User {
  public readonly id?: string;
  constructor(
    public name: string,
    public email: string,
    public balance: number
  ) {}
}
