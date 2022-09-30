import { Injectable } from '@nestjs/common';

import { UseCase } from '../core/base/useCase';
import { RetrievedUserMapper } from '../core/domain/mappers/users/retrievedUser.mapper';
import { UserRepository } from '../core/repositories/user.repository';
import { RetrievedUserDTO } from '../shared/dtos/users/retrievedUser.dto';

@Injectable()
export class GetUserService implements UseCase<RetrievedUserDTO> {
  private retrievedUserMapper: RetrievedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.retrievedUserMapper = new RetrievedUserMapper();
  }

  public async execute(userId: number): Promise<RetrievedUserDTO> {
    const retrievedUser = await this.repository.getById(userId);

    return this.retrievedUserMapper.mapTo(retrievedUser);
  }
}
