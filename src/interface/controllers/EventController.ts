import { Request, Response } from 'express';
import { CreateEvent } from '../../use-cases/CreateEvent';
import { GetSportEventsWithTotalBets } from '../../use-cases/GetEventsWithTotalBets';

export class EventController {
  constructor(
    private create: CreateEvent,
    private getAllWithBets: GetSportEventsWithTotalBets
  ) {}

  async createEvent(req: Request, res: Response) {
    try {
      const event = await this.create.execute(req.body);
      return res.status(201).json(event);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al crear el evento.',
        message: error.message || 'Error inesperado.',
      });
    }
  }

  async getAllEventsWithBets(req: Request, res: Response) {
    try {
      const events = await this.getAllWithBets.execute();
      return res.status(200).json(events);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error:
          'Hubo un problema al obtener los eventos deportivos con las apuestas.',
        message: error.message || 'Error inesperado.',
      });
    }
  }
}
