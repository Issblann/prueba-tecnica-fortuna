import { Request, Response } from 'express';
import { GetAllUsers } from '../../use-cases/GetAllUsers';
import { CreateUser } from '../../use-cases/CreateUser';
import { UpdateUser } from '../../use-cases/UpdateUser';

export class UserController {
  constructor(
    private getAllUsers: GetAllUsers,
    private create: CreateUser,
    private update: UpdateUser
  ) {}

  async getAll(req: Request, res: Response) {
    const users = await this.getAllUsers.execute();
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    const user = await this.create.execute(req.body);
    res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userData = req.body;

    const user = {
      id,
      ...userData,
    };
    await this.update.execute(user);
    res.status(200).json({ message: 'Usuario actualizado' });
  }
}
