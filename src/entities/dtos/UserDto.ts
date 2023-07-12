import { User } from '../User';

export class UserDto {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
  isValid(): boolean {
    return true;
  }
}
