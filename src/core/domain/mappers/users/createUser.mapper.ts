import { Mapper } from '../../../../core/base/mapper';
import { CreateUserDTO } from '../../../../shared/dtos/users/createUser.dto';
import { UserEntity } from '../../entities/users/user.entity';

export class CreateUserMapper extends Mapper<CreateUserDTO, UserEntity> {
  public mapFrom(payload: CreateUserDTO): UserEntity {
    const user = new UserEntity();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }

  public mapTo(payload: UserEntity): CreateUserDTO {
    const user = new CreateUserDTO();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }
}
