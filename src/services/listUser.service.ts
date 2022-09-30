import { Injectable } from '@nestjs/common';

import { UseCase } from '../core/base/useCase';
import { RetrievedUserMapper } from '../core/domain/mappers/users/retrievedUser.mapper';
import { UserRepository } from '../core/repositories/user.repository';
import { RetrievedUserDTO } from '../shared/dtos/users/retrievedUser.dto';

@Injectable()
export class ListUserService implements UseCase<RetrievedUserDTO[]> {
  private retrievedUserMapper: RetrievedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.retrievedUserMapper = new RetrievedUserMapper();
  }

  public async execute(): Promise<RetrievedUserDTO[]> {
    const retrievedUsers = await this.repository.getAll();
    return retrievedUsers.map((user) => this.retrievedUserMapper.mapTo(user));
  }
}
