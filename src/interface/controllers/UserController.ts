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
    try {
      const users = await this.getAllUsers.execute();
      return res.status(200).json(users);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al obtener los usuarios.',
        message: error.message || 'Error inesperado.',
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.create.execute(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al crear el usuario.',
        message: error.message || 'Error inesperado.',
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;

      const user = {
        id,
        ...userData,
      };

      await this.update.execute(user);
      return res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al actualizar el usuario.',
        message: error.message || 'Error inesperado.',
      });
    }
  }
}
