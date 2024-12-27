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

router.get('/users', (req, res) => userController.getAll(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
export { router as userRoutes };
