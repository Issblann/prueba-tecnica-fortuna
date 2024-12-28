import { Router } from 'express';
import { BetRepositoryMongo } from '../../infrastructure/repositories/BetRepositoryMongo';
import { CreateBet } from '../../use-cases/CreateBet';
import { BetController } from '../controllers/BetController';
import { GetBetsByUser } from '../../use-cases/GetBetsByUser';
import { UpdateBetStatus } from '../../use-cases/UpdateBetStatus';

const router = Router();

const betRepository = new BetRepositoryMongo();
const createBet = new CreateBet(betRepository);
const getBetsByUser = new GetBetsByUser(betRepository);
const updateBetStatus = new UpdateBetStatus(betRepository);
const betController = new BetController(
  createBet,
  getBetsByUser,
  updateBetStatus
);

/**
 * @swagger
 * tags:
 *   - name: Apuestas
 *     description: Operaciones relacionadas con las apuestas
 */

/**
 * @swagger
 * /api/v1/bets/{betId}/status:
 *   put:
 *     tags: [Apuestas]
 *     summary: Actualizar el estado de una apuesta
 *     description: Actualiza el estado de una apuesta específica utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: betId
 *         required: true
 *         description: El ID de la apuesta cuyo estado se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: El nuevo estado de la apuesta (por ejemplo, 'pendiente', 'ganada', 'perdida')
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Estado de la apuesta actualizado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Apuesta no encontrada
 */
router.put('/bets/:betId/status', async (req, res) => {
  await betController.updateBetStatus(req, res);
});

/**
 * @swagger
 * /api/v1/bets:
 *   post:
 *     tags: [Apuestas]
 *     summary: Crear una nueva apuesta
 *     description: Crea una nueva apuesta para un usuario en un evento específico.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               betValue:
 *                 type: number
 *                 format: float
 *                 description: El monto apostado
 *               fee:
 *                type: number
 *                format: float
 *                description: La cuota de la apuesta
 *               status:
 *                type: string
 *                description: El estado de la apuesta
 *               userId:
 *                 type: string
 *                 description: El ID del usuario que realiza la apuesta
 *               eventId:
 *                 type: string
 *                 description: El ID del evento en el que se realiza la apuesta
 *             required:
 *               - betValue
 *               - userId
 *               - eventId
 *               - fee
 *               - status
 *     responses:
 *       201:
 *         description: Apuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 betId:
 *                   type: string
 *                   description: El ID de la apuesta recién creada
 *                 amount:
 *                   type: number
 *                   format: float
 *                   description: El monto apostado
 *                 userId:
 *                   type: string
 *                   description: El ID del usuario que realizó la apuesta
 *                 eventId:
 *                   type: string
 *                   description: El ID del evento en el que se realizó la apuesta
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/bets', async (req, res) => {
  await betController.createBet(req, res);
});

/**
 * @swagger
 * /api/v1/bets/{userId}:
 *   get:
 *     tags: [Apuestas]
 *     summary: Obtener todas las apuestas de un usuario y filtrar por estado
 *     description: Recupera todas las apuestas realizadas por un usuario específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: El ID del usuario cuyas apuestas se desean obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de apuestas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   betId:
 *                     type: string
 *                     description: El ID de la apuesta
 *                   betValue:
 *                     type: number
 *                     format: float
 *                     description: El monto apostado
 *                   status:
 *                     type: string
 *                     description: El estado de la apuesta (por ejemplo, 'pendiente', 'ganada', 'perdida')
 *                   eventId:
 *                     type: string
 *                     description: El ID del evento asociado a la apuesta
 *       404:
 *         description: No se encontraron apuestas para este usuario
 */
router.get('/bets/:userId', async (req, res) => {
  await betController.getBetsByUser(req, res);
});

export { router as betRoutes };
