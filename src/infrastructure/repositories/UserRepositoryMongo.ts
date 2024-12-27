import { User } from '../../domain/entities/Users';
import { UserRepository } from '../../domain/interfaces/Users.repository';
import { UserModel } from '../models/User.model';

export class UserRepositoryMongo implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return new User(createdUser.name, createdUser.email, createdUser.balance);
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    });
    return new User(updatedUser.name, updatedUser.email, updatedUser.balance);
  }

  async getById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    if (!user) return null;
    return new User(user.name, user.email, user.balance);
  }
}
