import { Request, Response } from 'express';
import { CreateEvent } from '../../use-cases/CreateEvent';

export class EventController {
  constructor(private create: CreateEvent) {}

  async createEvent(req: Request, res: Response) {
    const event = await this.create.execute(req.body);
    res.json(event);
  }
}
