import { User } from '../domain/entities/Users';
import { UserRepository } from '../domain/interfaces/Users.repository';

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, balance: number): Promise<User> {
    const user = new User(name, email, balance);
    return await this.userRepository.create(user);
  }
}
