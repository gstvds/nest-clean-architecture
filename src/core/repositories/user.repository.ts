import { Repository } from '../base/repository';
import { UserEntity } from '../domain/entities/users/user.entity';

export abstract class UserRepository extends Repository<UserEntity> {}
