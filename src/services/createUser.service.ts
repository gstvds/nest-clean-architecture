import { Injectable } from '@nestjs/common';

import { UseCase } from '../core/base/useCase';
import { CreatedUserMapper } from '../core/domain/mappers/users/createdUser.mapper';
import { CreateUserMapper } from '../core/domain/mappers/users/createUser.mapper';
import { UserRepository } from '../core/repositories/user.repository';
import { CreatedUserDTO } from '../shared/dtos/users/createdUser.dto';
import { CreateUserDTO } from '../shared/dtos/users/createUser.dto';

@Injectable()
export class CreateUserService implements UseCase<CreatedUserDTO> {
  private createUserMapper: CreateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createUserMapper = new CreateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user: CreateUserDTO): Promise<CreatedUserDTO> {
    const entity = this.createUserMapper.mapFrom(user);
    const createdUser = await this.repository.create(entity);

    return this.createdUserMapper.mapTo(createdUser);
  }
}
