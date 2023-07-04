import { Injectable } from '@nestjs/common';
import { AppDatasource } from 'src/configs/databases/mysql/init';

@Injectable()
export class UserService {
  getAllUser() {
    return AppDatasource.manager.find('User');
  }
}
