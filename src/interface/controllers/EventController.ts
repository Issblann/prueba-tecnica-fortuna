import { Request, Response } from 'express';
import { CreateEvent } from '../../use-cases/CreateEvent';
import { GetSportEventsWithTotalBets } from '../../use-cases/GetEventsWithTotalBets';

export class EventController {
  constructor(
    private create: CreateEvent,
    private getAllWithBets: GetSportEventsWithTotalBets
  ) {}

  async createEvent(req: Request, res: Response) {
    const event = await this.create.execute(req.body);
    res.json(event);
  }

  async getAllEventsWithBets(req: Request, res: Response) {
    const events = await this.getAllWithBets.execute();
    res.json(events);
  }
}
