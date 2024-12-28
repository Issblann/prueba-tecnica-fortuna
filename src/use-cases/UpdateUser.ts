import { User } from '../domain/entities/Users';
import { UserRepository } from '../domain/interfaces/Users.repository';

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User): Promise<void> {
    return await this.userRepository.update(data);
  }
}
