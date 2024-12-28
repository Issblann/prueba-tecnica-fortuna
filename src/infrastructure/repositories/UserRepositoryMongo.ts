import { User } from '../../domain/entities/Users';
import { UserRepository } from '../../domain/interfaces/Users.repository';
import { UserModel } from '../models/User.model';

export class UserRepositoryMongo implements UserRepository {
  async findAll(): Promise<User[]> {
    return await UserModel.find();
  }

  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }

  async update(user: User): Promise<void> {
    const updated = await UserModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    if (!updated) throw new Error('User not found');
  }

  // async getById(userId: string): Promise<User | null> {
  //   const user = await UserModel.findById(userId);
  //   if (!user) return null;
  //   return new User(user.name, user.email, user.balance);
  // }
}
