import { User } from '../domain/entities/Users';
import { UserRepository } from '../domain/interfaces/Users.repository';

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User): Promise<User> {
    return await this.userRepository.create(data);
  }
}
