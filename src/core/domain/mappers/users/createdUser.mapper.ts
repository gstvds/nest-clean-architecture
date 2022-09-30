import { Mapper } from '../../../../core/base/mapper';
import { CreatedUserDTO } from '../../../../shared/dtos/users/createdUser.dto';
import { UserEntity } from '../../entities/users/user.entity';

export class CreatedUserMapper extends Mapper<CreatedUserDTO, UserEntity> {
  public mapFrom(payload: CreatedUserDTO): UserEntity {
    const user = new UserEntity();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }

  public mapTo(payload: UserEntity): CreatedUserDTO {
    const user = new CreatedUserDTO();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }
}
