import { User } from '../entities/Users';

export interface UserRepository {
  findAll: () => Promise<User[]>;
  create: (data: User) => Promise<User>;
  update: (user: User) => Promise<void>;
}
