import { UserRepository } from '../domain/interfaces/Users.repository';

export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
