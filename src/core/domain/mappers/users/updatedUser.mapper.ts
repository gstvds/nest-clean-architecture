import { Mapper } from '../../../../core/base/mapper';
import { UpdatedUserDTO } from '../../../../shared/dtos/users/updatedUser.dto';
import { UserEntity } from '../../entities/users/user.entity';

export class UpdatedUserMapper extends Mapper<UpdatedUserDTO, UserEntity> {
  public mapFrom(payload: UpdatedUserDTO): UserEntity {
    const user = new UserEntity();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }

  public mapTo(payload: UserEntity): UpdatedUserDTO {
    const user = new UpdatedUserDTO();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }
}
