import { Router } from 'express';
import { UserRepositoryMongo } from '../../infrastructure/repositories/UserRepositoryMongo';
import { GetAllUsers } from '../../use-cases/GetAllUsers';
import { UserController } from '../controllers/UserController';
import { CreateUser } from '../../use-cases/CreateUser';
import { UpdateUser } from '../../use-cases/UpdateUser';

const router = Router();

const userRepository = new UserRepositoryMongo();
const getAllUsers = new GetAllUsers(userRepository);
const createUser = new CreateUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const userController = new UserController(getAllUsers, createUser, updateUser);

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Operaciones relacionadas con los usuarios
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del nuevo usuario
 *               email:
 *                 type: string
 *                 description: El correo electrónico del nuevo usuario
 *               balance:
 *                 type: number
 *                 format: float
 *                 description: El balance inicial del usuario
 *             required:
 *               - name
 *               - email
 *               - balance
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID del usuario recién creado
 *                 name:
 *                   type: string
 *                   description: El nombre del usuario
 *                 email:
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                 balance:
 *                   type: number
 *                   format: float
 *                   description: El balance actual del usuario
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/users', async (req, res) => {
  await userController.createUser(req, res);
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualizar un usuario existente
 *     description: Actualiza la información de un usuario específico utilizando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del usuario que se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nuevo nombre del usuario
 *               email:
 *                 type: string
 *                 description: El nuevo correo electrónico del usuario
 *               balance:
 *                 type: number
 *                 format: float
 *                 description: El nuevo balance del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID del usuario actualizado
 *                 name:
 *                   type: string
 *                   description: El nombre del usuario actualizado
 *                 email:
 *                   type: string
 *                   description: El correo electrónico del usuario actualizado
 *                 balance:
 *                   type: number
 *                   format: float
 *                   description: El balance actualizado del usuario
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id', async (req, res) => {
  await userController.updateUser(req, res);
});

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID del usuario
 *                   name:
 *                     type: string
 *                     description: El nombre del usuario
 *                   email:
 *                     type: string
 *                     description: El correo electrónico del usuario
 *                   balance:
 *                     type: number
 *                     format: float
 *                     description: El balance actual del usuario
 */
router.get('/users', async (req, res) => {
  await userController.getAll(req, res);
});
export { router as userRoutes };
