import { Controller, Get } from '@nestjs/common';
import { UserService } from './user-service';
import { ConfigService } from '@nestjs/config';

@Controller('user-controller')
export class UserControllerController {
  constructor(
    private readonly service: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get('/:id')
  findById(id: number) {
    return this.service.findById(id);
  }
}
