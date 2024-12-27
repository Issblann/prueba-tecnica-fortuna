import { User } from '../entities/Users';

export interface UserRepository {
  create: (data: User) => Promise<User>;
  update: (id: string, data: Partial<User>) => Promise<User>;
}
