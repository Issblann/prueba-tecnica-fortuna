import { Router } from 'express';
import { SportingEventsRepositoryMongo } from '../../infrastructure/repositories/EventRepositoryMongo';
import { CreateEvent } from '../../use-cases/CreateEvent';
import { EventController } from '../controllers/EventController';
import { GetSportEventsWithTotalBets } from '../../use-cases/GetEventsWithTotalBets';

const router = Router();
const eventRepository = new SportingEventsRepositoryMongo();
const createEvent = new CreateEvent(eventRepository);
const getEventsWithTotalBets = new GetSportEventsWithTotalBets(eventRepository);
const eventController = new EventController(
  createEvent,
  getEventsWithTotalBets
);
/**
 * @swagger
 * tags:
 *   - name: Eventos Deportivos
 *     description: Operaciones relacionadas con los eventos deportivos
 */

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     tags: [Eventos Deportivos]
 *     summary: Crear un nuevo evento
 *     description: Crea un nuevo evento con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del evento
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha y hora del evento
 *               sportType:
 *                 type: string
 *                 description: El lugar donde se llevará a cabo el evento
 *             required:
 *               - name
 *               - date
 *               - sportType
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID del evento recién creado
 *                 name:
 *                   type: string
 *                   description: El nombre del evento
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: La fecha y hora del evento
 *                 sportType:
 *                   type: string
 *                   description: El lugar del evento
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/events', async (req, res) => {
  await eventController.createEvent(req, res);
});

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     tags: [Eventos Deportivos]
 *     summary: Obtener todos los eventos con apuestas y total apostado
 *     description: Recupera una lista de todos los eventos junto con las apuestas asociadas a cada uno.
 *     responses:
 *       200:
 *         description: Lista de eventos con apuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: El ID del evento
 *                   name:
 *                     type: string
 *                     description: El nombre del evento
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: La fecha y hora del evento
 *                   sportType:
 *                     type: string
 *                     description: El lugar del evento
 *                   bets:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: El ID de la apuesta
 *                         userId:
 *                           type: string
 *                           description: El ID del usuario que realizó la apuesta
 *                         eventId:
 *                           type: number
 *                           format: float
 *                           description: El monto apostado
 *                         betValue:
 *                           type: number
 *                           format: float
 *                           description: El monto apostado
 *                         fee:
 *                           type: number
 *                           format: float
 *                           description: La cuota de la apuesta
 *       404:
 *         description: No se encontraron eventos
 */
router.get('/events', async (req, res) => {
  eventController.getAllEventsWithBets(req, res);
});
export { router as eventRoutes };
