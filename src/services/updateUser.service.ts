import { Injectable } from '@nestjs/common';

import { UseCase } from '../core/base/useCase';
import { UpdateUserMapper } from '../core/domain/mappers/users/updateUser.mapper';
import { UpdatedUserMapper } from '../core/domain/mappers/users/updatedUser.mapper';
import { UserRepository } from '../core/repositories/user.repository';
import { UpdatedUserDTO } from '../shared/dtos/users/updatedUser.dto';
import { UpdateUserDTO } from '../shared/dtos/users/updateUser.dto';

@Injectable()
export class UpdateUserService implements UseCase<UpdatedUserDTO> {
  private updateUserMapper: UpdateUserMapper;
  private updatedUserMapper: UpdatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.updateUserMapper = new UpdateUserMapper();
    this.updatedUserMapper = new UpdatedUserMapper();
  }

  async execute(id: number, payload: UpdateUserDTO): Promise<UpdatedUserDTO> {
    const entity = this.updateUserMapper.mapTo(payload);

    const updatedUser = await this.repository.update(id, entity);
    return this.updatedUserMapper.mapTo(updatedUser);
  }
}
