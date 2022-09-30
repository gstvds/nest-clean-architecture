import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../core/domain/entities/users/user.entity';
import { UserRepository } from '../../core/repositories/user.repository';
import { JSONServerRepository } from './json-server';

@Injectable()
export class UserRemoteRepository
  extends JSONServerRepository<UserEntity>
  implements UserRepository
{
  constructor() {
    super('users');
  }
}
