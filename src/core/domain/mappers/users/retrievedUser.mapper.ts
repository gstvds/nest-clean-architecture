import { Mapper } from '../../../base/mapper';
import { RetrievedUserDTO } from '../../../../shared/dtos/users/retrievedUser.dto';
import { UserEntity } from '../../entities/users/user.entity';

export class RetrievedUserMapper extends Mapper<RetrievedUserDTO, UserEntity> {
  public mapFrom(payload: RetrievedUserDTO): UserEntity {
    const user = new UserEntity();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }

  public mapTo(payload: UserEntity): RetrievedUserDTO {
    const user = new RetrievedUserDTO();

    user.id = payload.id;
    user.email = payload.email;
    user.name = payload.name;

    return user;
  }
}
