export class Bet {
  constructor(
    public id: string,
    public userId: string,
    public eventId: string,
    public betValue: number,
    public fee: number,
    public status: string
  ) {}
}
