import { User } from '../../modules/user-module/User';
import { IBaseDTO } from './IBaseDTO';

export class UserDto implements IBaseDTO {
  user: User | Partial<User>;

  constructor(user: User | Partial<User>) {
    this.user = user;
  }
  isValid(): boolean {
    //TODO: valid user properties
    return true;
  }
  toEntity(): any {
    //TODO : convert to entity
    return this.user;
  }
}
