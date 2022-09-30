import { Mapper } from '../../../../core/base/mapper';
import { UpdateUserDTO } from '../../../../shared/dtos/users/updateUser.dto';
import { UserEntity } from '../../entities/users/user.entity';

export class UpdateUserMapper extends Mapper<UpdateUserDTO, UserEntity> {
  public mapFrom(payload: UpdateUserDTO): UserEntity {
    const user = new UserEntity();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }

  public mapTo(payload: UserEntity): UpdateUserDTO {
    const user = new UpdateUserDTO();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }
}
