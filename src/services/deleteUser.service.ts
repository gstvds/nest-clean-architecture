import { Injectable } from '@nestjs/common';

import { UseCase } from '../core/base/useCase';
import { UserRepository } from '../core/repositories/user.repository';
import { DeleteUserDTO } from '../shared/dtos/users/deleteUser.dto';

@Injectable()
export class DeleteUserService implements UseCase<DeleteUserDTO> {
  constructor(private readonly repository: UserRepository) {}

  public async execute({ id }: DeleteUserDTO): Promise<void> {
    await this.repository.delete(id);
  }
}
