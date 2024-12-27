import mongoose from 'mongoose';

export class Bet {
  constructor(
    public userId: mongoose.Schema.Types.ObjectId,
    public eventId: mongoose.Schema.Types.ObjectId,
    public betValue: number,
    public fee: number,
    public status: string
  ) {}
}
