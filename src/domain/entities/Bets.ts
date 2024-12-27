export class Bet {
  constructor(
    public userId: string,
    public eventId: string,
    public betValue: number,
    public fee: number,
    public status: string
  ) {}
}
